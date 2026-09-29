# LG6151M 全量备份清单

备份时间：2026-09-29 13:36-13:42
设备：烽火 5G CPE Pro 2 (LG6151M)，固件 RP0102，硬件 WKE2.094.412A01
序列号：<SERIAL> / bridge MAC: <BRIDGE_MAC> / IMEI: <IMEI>
SoC: MT6990 (T830 平台, RG620T 模组) / eMMC mmcblk0 3.66GiB, 46 分区 / RAM 2GiB
当前启动槽位：slot b (root=/dev/mmcblk0p39)

## 文件与校验（设备端与本机 md5 双向一致）

| 文件 | 大小 | MD5 | 内容 |
|---|---|---|---|
| mmcblk0.img.gz | 534,938,146 B | 8256b1456397906314517845ed1018db | 全盘镜像（dd /dev/mmcblk0 \| gzip -1），gzip -t 通过，MBR 55AA 完好 |
| data_tree.tar.gz | 12,260,708 B | 74824e79bf19a555ff00e6c73dceac88 | /data 全树（运行配置、短信库、模组配置等） |
| fhconf.tar.gz | 79,359 B | a5f962eddaad93e634a3df51c74a494f | /fhconf（烽火配置：baseinfo、sendsms、fh_key_conf 等） |
| etc_conf.tar.gz | 97 B | 08eddedacb2413adea9e99f6c7550e35 | /etc/config（打包被 VFS 保护拦截，实际为空档；内容在 mmcblk0.img.gz 内） |
| sx1.txt | 365 B | 0a506bd785ecb3ead1d00f02fad75141 | /etc/shadow 原文（root 哈希 $6$） |
| px1.txt | 483 B | 845cb8ef80a7d3947ea8f64190d8c898 | /etc/passwd 原文 |
| md5_full.txt / md5_logic.txt | - | - | 设备端校验原始输出 |

## 凭据档案（同型号 RP0102 通用）

| 用途 | 凭据 |
|---|---|
| Web 管理员 | admin / <ADMIN_PASS> (user:1) |
| Web 超级管理员 | superadmin / F1ber$dm (user:3)，节点 DeviceInfo.X_FH_Account.X_FH_WebUserInfo.WebSuperPassword |
| Telnet 23（fhshell 沙箱, uid=100） | admin / hg2x0<MAC6>（规则 hg2x0+MAC后6位） |
| root（/etc/shadow，已验证） | F1ber@dm!n（SHA-512；musl su/login 无法校验 $6$，故 su/telnet root 登不进） |
| 工厂配置 UserPasswd | <FACTORY_USERPASSWD>；WiFi FHCPE-7B8d / <WIFI_PASS> |
| API 加密 | RSA 私钥同 LG6851F（见 ref/sms.sh），AES key=sessionid+token Lua 派生，IV 6f..7e |

## Root 通道（备份期间所用）

send_msg（FHAPIS，superadmin）短信 content 反引号/`$()` 命令注入 → SMS 后端以 uid=0 popen 执行。
例：content = 'x`id > /tmp/idout 2>&1`x'。下载通道：/data/pub bind-mount 至 /www/html/static 经 80 端口拉取（已解除）。

## 分区表（/proc/partitions，KB）

mmcblk0 3,833,856（全量在镜像内）；关键：p26/p39=131072(rootfs a/b)，p13=40960，p15/p28=81920，
p25=32768，p38=32768，p43/44/45=163840，p46=2610112(user_data)，p2=20480，p4=65536。
root=/dev/mmcblk0p39 (slot b)，bootslot=b。

## 恢复方法

- 全盘恢复（终极手段）：gunzip mmcblk0.img.gz | dd of=/dev/mmcblk0 bs=4M（需 root shell，经 send_msg 注入或救砖口）
- 单分区：从镜像按偏移提取（fdisk -l mmcblk0.img 定位各分区 offset）
- 逻辑恢复：tar xzf data_tree.tar.gz -C /data
