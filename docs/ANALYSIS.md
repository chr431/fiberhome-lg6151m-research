# LG6151M 镜像分析结论（2026-09-29）

## Root 通道（本会话可用）

- SSH：`toor / <TOOR_PASS>` @ 192.168.8.1:22，uid=0（paramiko 或 ssh 均可；`lgssh.py` 助手）
- 实现链（全部 tmpfs，重启失效；`rearm.py` 一条注入可复活）：
  1. `/etc/dropbear` 777 → bind-mount 755 目录（否则 dropbear 拒绝公钥+报错）
  2. dropbear 硬禁 root 登录（二进制含 "root login rejected"）→ bind-mount 加 `toor:x:0:0` 的 /etc/passwd
  3. 公钥认证始终静默失败（原因未明）→ 密码认证：bind-mount /etc/shadow，toor 用 `$1$` MD5 哈希（musl crypt 只支持 $1$；root 原生 $6$ 永远验不过）
  4. host key 生成至 /tmp/db_ed（/etc/dropbear 是 0 字节占位且 ro）
  5. iptables `-I INPUT 1 -p tcp -s 192.168.8.0/24 --dport 22 -j ACCEPT`（子链默认 REJECT 22）

## 存储与分区（GPT，46 分区）

- eMMC 3.66GiB；A/B 完整对称：preloader(boot0/1硬件分区)、mcf1/2、md1img、md1dsp、spmfw、pi_img、dpm、medmcu、sspm、mcupm、lk、tee、boot(32M)、rootfs(128M)、connsys_gnss
- 烽火自有：fh_plugs(160M)、fh_data(160M)、fh_conf(160M)、user_data(~2.5G)
- 当前活动槽 **b**（rootfs_b=mmcblk0p39, boot_b=p38）；非活动 rootfs_a=**mmcblk0p26**（自定义固件目标）
- bootctrl：misc(mmcblk0p1) 偏移 2048；magic "BCAB"@+4；A: pri@+12/try@+13/succ@+14/up@+15；B: pri@+17/try@+18/succ@+19/up@+20
  当前：A=0e/00/01/00，B=0f/00/01/01（B 活动且已升级标志置位）

## 系统底细

- OpenWrt 基线 **r23497-6637af95aa（≈23.05 分支）**，kernel 5.15.134，aarch64 (MT6990=T830)
- rootfs_b：SquashFS 4.0 / XZ / 256K block，实际 48.5MB；构建 2025-12-25
- overlayfs 被禁（/lib/preinit/80_mount_root 中 mount_root 被注释）→ /etc 永久 ro
- Web 栈：nginx（配置开机生成于 /tmp/web_temp/nginx.conf，含 Lua WAF）→ FastCGI 127.0.0.1:8840 → **/fhrom/bin/webs**（API 引擎，send_msg/do_cmd_web/升级均在此）
- fh_api 方法白名单：/fhrom/fhconf/webconf/web_uci_whitelist 等（见 upgrade_scripts.tar.gz）

## 升级机制（/lib/upgrade/，已存档）

- 镜像格式：sysupgrade tar.gz，内含按名匹配的分区镜像：`preloader_*.bin / lk*.img / boot*.img / *.squashfs(rootfs)` 等
- **校验：platform_check_image 只验 gzip 魔数(1f8b)；platform.sh 仅 MD5 自检；无任何签名验证**
- do_upgrade_ab：当前槽 X → 把 tar 中镜像写入对侧槽全部分区 → 改 bootctrl → 重启
- 上传口：POST /fh_api/tmp/FHUPAPIS（action=upgradeimage，300MB，需 fh_upgrade_api_token 头，token 由 webs 生成）

## 自定义固件路线（按风险递增）

1. **改槽位法**（推荐首发）：本地解包 rootfs_b.squashfs → 修改（见下）→ mksquashfs（XZ,256K,-no-xattrs）→ `dd of=/dev/mmcblk0p26` → bootctrl 置 A(priority=0f, B 降 0e) → 重启验证；失败则 bootctrl 切回 B（需另一台机器/串口兜底，或靠 lk 的 try/success 自动回退机制）
2. **sysupgrade 法**：打 tar.gz（可只含 rootfs.squashfs）走标准升级口
3. 修改内容建议：
   - 恢复 80_mount_root 的 mount_root → overlayfs 生效 → /etc 可写 → dropbear/SSH 持久化一步到位
   - /etc/shadow 预置 toor $1$ 行；/etc/rc.local 加 dropbear+iptables 自启
   - OpenWrt 23.05 aarch64_cortex-a53 的 ipk（LuCI、passwall 类）大概率直接可用（内核 5.15 同源）

## 关键文件

- backup/mmcblk0.img.gz（全盘）、backup/rootfs_b.bin（p39 原始）、rootfs_b/（解包树 187MB）
- analysis/upgrade_scripts.tar.gz（/lib/upgrade + webconf，md5 5bcf4a3fc6cadf7e9d03a9258faf1e68）
- lgssh.py / pull_file.py（注意 MSYS_NO_PATHCONV=1）/ rearm.py / login_and_read.py

---

# 改槽位法实验结果（2026-09-29 17:15）——成功

## 状态
- **当前运行：自定义固件槽 A**（root=/dev/mmcblk0p26, bootslot=a）
- SSH root 重启即用：toor / <TOOR_PASS> @ 22（密钥+账户+自启全部内置镜像）——root 通道永久固化
- **槽 B = 原厂 RP0102 完好未动**（boot_b/rootfs_b md5 与实验前一致，zmtk 克隆已禁用）= 黄金回退

## v1 修改内容（相对原厂 rootfs_b）
1. /etc/passwd + toor:x:0:0（绕过 dropbear 硬禁 root 登录）
2. /etc/shadow + toor:$1$ MD5（musl 只认 $1$）
3. /etc/dropbear/ 内置有效 host key（ed25519+rsa, 600, 目录755）
4. /etc/rc.local + dropbear 兜底启动 + iptables 放行 22（仅 LAN 段）
5. /etc/init.d/zmtk_boot_done 注释 ab_image_sync ×4（阻止新槽启动后克隆覆盖原厂 B 槽）

## 切槽方法（已验证）
- misc(mmcblk0p1) 偏移2060 起 10 字节：A(pri,try,succ,up) gap B(pri,try,succ,up)
- 切到 A：`0f 03 00 00 00 0e 00 01 02 00`（A 优先+3次重试，B降级，B.up=02 触发 zmtk 确认流）
- 切回原厂 B：`0e 00 00 00 00 0f 00 01 01 00`（B.up=01 恢复原厂状态字面）
- lk 按 priority 比较选槽（up 标志 lk 不消费，仅 zmtk 用）

## 构建流程（设备上原生完成，可复用）
PC 下载 aarch64_generic 的 squashfs-tools ipk（官方 23.05 源，设备自带源 URL 是 404 摆设）→ 推送解包到 /tmp/st → LD_LIBRARY_PATH 跑 unsquashfs/mksquashfs → /data/build/rootfs 改内容 → mksquashfs -comp xz -b 262144 -no-xattrs -noappend -all-root → loop mount 验证 → dd 到 p26（尾部清零）+ boot_b 同步到 p25 → bootctrl 切换 → reboot

## 下一步（v2 候选）
- 恢复 /lib/preinit/80_mount_root 的 mount_root → overlayfs → /etc 可写
- 从官方 23.05 aarch64_generic/正确 arch 源装 LuCI + 插件
- OpenWrt SDK（target gem6xxx/evb6990_cpe_mt7992_emmc，厂商同款）完整自定义构建
