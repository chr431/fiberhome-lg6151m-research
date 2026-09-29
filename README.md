# 烽火 FiberHome 5G CPE Pro 2 (LG6151M) 解锁与自定义固件研究

对 FiberHome LG6151M 5G CPE（固件 RP0102，Quectel RG620T / MediaTek T830 (MT6990) 平台，OpenWrt 23.05 基线）的完整逆向与刷机记录：从零开始还原 Web API 加密体系、发现五类凭据、拿到 root、全盘备份，最终以**改槽位法**让设备运行自定义固件，且原厂系统在 B 槽完好保留、随时可两个字节切回。

> **免责声明**：本研究仅在本人自有设备上进行。请勿对不属于自己的设备使用文中任何方法。刷机有变砖风险，操作前请务必先做全盘备份。

## 成果一览

| 项 | 结果 |
|---|---|
| Web API 加密体系 | 完全还原（RSA token + Lua 派生 AES-128-CBC），可编程登录 |
| superadmin 超管密码 | `F1ber$dm`（固件常量，节点 `DeviceInfo.X_FH_Account.X_FH_WebUserInfo.WebSuperPassword` 可读） |
| telnet (23) 凭据 | `admin / hg2x0+MAC后6位`（受限沙箱 shell） |
| root 密码（/etc/shadow） | `F1ber@dm!n`（SHA-512；musl 无法校验 $6$，所以任何登录口都"永远不对"） |
| 命令注入 → root | `send_msg` 短信接口 content 反引号注入，SMS 后端以 uid=0 执行（AT 接口注入已在 RP0102 修复） |
| 沙箱逃逸（读取） | fhshell 白名单漏放 `strings`/`md5sum`/`ls` → 任意文件读取 |
| 全盘备份 | eMMC 3.66GiB GPT 46 分区镜像 + 逻辑配置（md5 双向校验） |
| SSH root 持久化 | 自定义固件槽 A 内置 toor 账户 + dropbear 自启，重启即用 |
| 自定义固件 | 改槽位法已验证：slot A 运行修改版 rootfs，slot B 原厂完好 |

## 攻破路径（时间线）

1. **Web API 加密逆向**：`is_encrypt` 返回 6 位随机垃圾字符（位置随机）+ base64(RSA)；RSA 私钥与 LG6851F 固件同源（网页 JS 里也内嵌同一把）；AES key 由 sessionid+token 经厂商 Lua 算法派生，IV 固定 `6f..7e`。`tools/login_and_read.py` 完整复现。
2. **凭据发现**：登录 admin 后可读超管密码节点；telnet 凭据规则与 LG6121F (codming) 相同；`/etc/shadow` 经沙箱 `strings` 读出后本地秒破。
3. **SMS 注入拿 root**：`send_msg`（superadmin）的 `content` 进 popen，前端只转义 `\` 和 `"`，反引号/`$()` 存活。延时对照实验（1.0s vs 12.9s）+ `id` 落盘实证 uid=0。`tools/inject.py`。
4. **备份**：root 下把 `/data/pub` bind-mount 到 `/www/html/static`，借设备自己的 nginx 80 口拉取（绕过 PC 防火墙入站限制）。全盘 `dd|gzip` 535MB，md5 双向一致。
5. **SSH root 固化（stock 上的会话级）**：烽火 dropbear 五重阻碍逐一拆除——`/etc/dropbear` 777、二进制硬编码拒 root 登录（加 `toor:x:0:0` 绕过）、公钥认证静默失败（改密码认证）、musl 只认 `$1$`（bind-mount 新 shadow）、iptables 子链 REJECT 22（加 LAN 段放行）。`tools/rearm.py` 一条注入 10 秒复活。
6. **镜像分析**：SquashFS4/XZ rootfs（OpenWrt r23497 ≈ 23.05，kernel 5.15.134）；升级链 `/lib/upgrade/` **无签名校验**（gzip 魔数 + MD5 自检而已）；bootctrl 位于 misc 分区偏移 2048（magic `BCAB`）。
7. **改槽位法**：设备上原生 unsquashfs/mksquashfs 重建 rootfs（v1：toor+密钥+自启+禁克隆）→ dd 到 rootfs_a(p26) + 内核同步 → bootctrl 切槽。关键发现：**lk 只按 priority 选槽**（厂商 up=02 标志 lk 根本不消费，仅 zmtk_boot_done 用户态使用）；以及 **zmtk_boot_done 首启会把新槽克隆覆盖旧槽**（厂商"双槽一致"设计）——必须注释掉才能保留原厂回退。

## 分区与切槽速查

GPT 46 分区完整 A/B 对称（`lk/boot/rootfs/md1img/...` 各两份 + `misc/nvram/fh_*`）。当前布局：slot a = p25(boot)/p26(rootfs)，slot b = p38/p39。

bootctrl（misc=`/dev/mmcblk0p1` 偏移 2060 起 10 字节）：`A(pri,try,succ,up) gap B(pri,try,succ,up)`

| 动作 | 字节 |
|---|---|
| 切到自定义槽 A | `0f 03 00 00 00 0e 00 01 02 00` |
| 切回原厂槽 B | `0e 00 00 00 00 0f 00 01 01 00` |

## 仓库内容

```
tools/
  login_and_read.py     fh_api 加密登录库 + API 调用 + SMS 注入
  inject.py             一发注入执行任意 root 命令（盲执行）
  lgssh.py              自定义固件/重置后场景的 SSH root 助手 (paramiko)
  rearm.py              stock 重启后一条注入复活 SSH（临时持久化）
  telnet_read.py        telnet 沙箱读取原语（strings/md5sum）+ 凭据探测
  crack_root.py         /etc/shadow root 哈希定向破解
  file_transfer.py      无 SFTP 场景的 pull/push（注意 MSYS_NO_PATHCONV=1）
  recv_server.py        备份接收 HTTP 服务器（PUT）
  parse_gpt.py          全盘镜像 GPT 解析
  extract_strings.py    混淆 JS 字符串表提取
  build_custom_rootfs.md  自定义 rootfs 构建+刷槽完整流程（已验证）
docs/
  ANALYSIS.md           深度分析：加密体系/分区/bootctrl/升级链/切槽实验记录
  BACKUP_INFO.md        备份清单与恢复方法（个人数据已脱敏）
reference/
  xxtg666/              LG6851F 短信转发工具（加密流程参考来源，MIT）
  xmlnode.js            设备全部 662 个节点别名表（get_xmlnode_js_file 原样导出）
  bundle_strings.txt    前端混淆包解出的字符串表
  webui/                关键页面 JS 原档（sms_send/atCommand/versionUp/localUp）
  upgrade_scripts.tar.gz  /lib/upgrade/ 升级脚本 + webconf 存档
device_local.py.example  本机设备参数模板（真实 device_local.py 已 gitignore）
```

使用：`cp device_local.py.example device_local.py` 填入自己设备的值，然后 `pip install paramiko passlib`。

## 相关仓库

校园网接入方案与现场侦察记录因含网络拓扑细节，放在私有仓库 `scut-lg6151m`（未公开）。
本仓库只保留 CPE 本体的解锁/刷机研究。

## 与前人工作的关系

本方法建立在社区已有成果之上，致谢：

- **codming.com** — [烽火 LG6121F 5G CPE 研究](https://codming.com/posts/fiberhome-lg6121f-5g-cpe-research/)：加密体系/凭据规则/方法论的原型（LG6121F/T750）。LG6151M 上 AT 注入已被修复，本仓库补充了 SMS 注入 + eMMC A/B 槽位刷机路径。
- **xxtg666** — [FiberHome-LG6851F-SMS-Forward](https://github.com/xxtg666/FiberHome-LG6851F-SMS-Forward)：LG6851F 的加密登录参考实现（`reference/xxtg666/` 存档）。
- **恩山无线论坛** — [烽火5G CPE一代开SSH](https://www.right.com.cn/forum/thread-8455021-1-1.html)、[LG6851F mtkflash 刷机帖](https://www.right.com.cn/forum/thread-8473603-1-1.html)。

## 已知未解

- dropbear 公钥认证在烽火固件上静默失败的原因（密码认证不受影响，未深究）
- 主线 OpenWrt 对 T830/MT6990 仍零支持；"刷 OpenWrt" 的现实形态即本仓库路线：厂商内核 + 自定义 rootfs（v2 计划：恢复 overlayfs、装 LuCI、SDK 完整构建）

## 风险与回退

- 任何写分区操作前先做全盘备份（`docs/BACKUP_INFO.md` 流程）
- 原厂槽保留时，切回只需改 misc 10 字节；若双槽都被破坏，需 UART（串口 921600，`console=ttyS0`）+ 全盘镜像恢复
- lk 具备 retry/unbootable 语义（字符串实证），新槽起不来会回落旧槽
