# FiberHome-LG6851F-SMS-Forward

烽火（FiberHome）LG6851F 5G CPE Pro 短信转发工具：监听收到的新短信，自动转发到自建 Webhook 服务，并可选通过邮件推送。

适用于希望将 CPE 收到的验证码等短信自动同步到手机 / 消息推送服务（如 Bark、Server酱、自建机器人等）的场景。

## 功能特性

- 🔔 **实时转发**：通过 OpenWrt `ubus` 事件流监听 `cpe_new_sms_notify` 通知，收到新短信立即拉取并转发
- 🔐 **自动登录**：自动处理 CPE Web 管理接口的 RSA 加密登录与 AES-128-CBC 通讯加密
- 📦 **轻量依赖**：CPE 端核心脚本仅依赖 `curl`、`openssl`、`lua`、`hexdump`、`jsonfilter`
- 📧 **邮件推送**：附带的 Webhook 接收端（Flask 服务）收到短信后自动通过 SMTP 发送邮件
- ⚙️ **灵活配置**：CPE 端参数通过环境变量注入，Webhook 接收端通过 `config.json` 配置
- 🚀 **开机自启**：附带 OpenWrt init 服务脚本，断电重启后自动恢复监听

## 工作原理

```
LG6851F CPE 收到新短信
        │
        ▼
ubus 事件流 → cpe_new_sms_notify（由 monitor.sh 监听）
        │
        ▼
sms.sh（登录 CPE → 请求 get_sms_data）
        │
        ▼
SMS JSON → POST 到 Webhook 地址
        │
        ▼（可选）
webhook/sms_webhook_mailer.py → SMTP 邮件推送
```

1. `sms_trigger`（OpenWrt init 服务脚本）开机启动 `monitor.sh`
2. `monitor.sh` 通过 `ubus listen` 订阅系统事件，检测到 `cpe_new_sms_notify` 时调用 `sms.sh`
3. `sms.sh` 登录 CPE 管理接口：
   - 请求 `is_encrypt` 接口判断是否启用通讯加密
   - 加密模式下用内置 RSA 私钥解密服务器下发的 token，并依据 sessionid 派生 AES-128-CBC 密钥
   - 携带加密载荷调用 `DO_WEB_LOGIN` 完成登录
4. 登录后请求 `get_sms_data` 获取短信数据，解析后输出，并 POST 到配置的 Webhook 地址
5. （可选）`webhook/sms_webhook_mailer.py` 作为 Webhook 接收端，把收到的短信中最新的一条通过 SMTP 发送邮件

## 目录结构

```
├── sms.sh                       # 核心脚本：登录 CPE 并拉取短信、转发 Webhook
├── monitor.sh                   # 事件监听：ubus 订阅 cpe_new_sms_notify 并触发 sms.sh
├── sms_trigger                  # OpenWrt init 服务脚本：开机启动 monitor.sh
├── webhook/
│   ├── sms_webhook_mailer.py    # Webhook 接收端：收到短信后发送邮件（Flask）
│   └── config.json              # 接收端配置：监听地址 / SMTP / 邮件格式
└── README.md
```

## 环境依赖

### CPE 端（OpenWrt）

脚本需要在**CPE 本机**（OpenWrt 系统）上运行，依赖以下命令：

- `curl`
- `openssl`
- `lua`
- `hexdump`
- `jsonfilter`
- `ubus`

> 烽火 LG6851F CPE 原厂 OpenWrt 系统已内置上述命令

### Webhook 接收端（可选，可运行在任意服务器上）

- Python 3.10+
- [Flask](https://flask.palletsprojects.com/)（`pip install flask`）

## 前置条件

本工具需要以 SSH 方式登录 CPE 来部署脚本。如果 CPE 尚未解锁 SSH，请先参考恩山无线论坛的刷机教程：

- [烽火PRO LG6851F mtkflash tool 刷机解锁 SSH 和 ADB 接口](https://www.right.com.cn/forum/thread-8473603-1-1.html)

使用教程中的 mtkflash tool 刷机后即可解锁 SSH 与 ADB 接口，之后就能通过 SSH 进入 CPE 系统部署本工具。

## 快速开始

### 1. 部署脚本

将 `sms.sh`、`monitor.sh` 上传到 CPE 的 `/data/sms/` 目录，并赋予执行权限：

```sh
mkdir -p /data/sms
chmod +x /data/sms/sms.sh /data/sms/monitor.sh
```

### 2. 配置并手动测试

编辑 `/data/sms/monitor.sh` 顶部的环境变量（Webhook 地址、令牌、CPE 管理账号密码）：

```sh
export WEBHOOK="http://your-server:8000/api/sms"
export WEBHOOK_TOKEN="change-this-webhook-token"
export FH_USER="admin"
export FH_PASS="你的密码"
```

然后手动运行 `sms.sh` 测试：

```sh
FH_USER='admin' FH_PASS='你的密码' WEBHOOK='http://your-server:8000/api/sms' /data/sms/sms.sh
```

脚本会把 CPE 返回的短信 JSON 打印到 stdout，并同时转发到 `WEBHOOK` 指定的地址。

### 3. 配置开机自启

将 `sms_trigger` 安装为 OpenWrt 服务并启用：

```sh
cp /data/sms/sms_trigger /etc/init.d/sms_trigger
chmod +x /etc/init.d/sms_trigger
/etc/init.d/sms_trigger enable
/etc/init.d/sms_trigger start
```

服务日志写入 `/tmp/sms.log`。

### 4.（可选）部署 Webhook 邮件接收端

在任意服务器上运行接收端，把短信转发为邮件：

```sh
pip install flask
python3 webhook/sms_webhook_mailer.py -c webhook/config.json
```

编辑 `webhook/config.json`：

- `server`：监听地址（`host` / `port` / `path`）与鉴权令牌 `token`，其中 `token` 需与 CPE 端 `WEBHOOK_TOKEN` 保持一致
- `smtp`：SMTP 服务器信息（`host` / `port` / `security` / `username` / `password` / `from` / `to` 等）
- `mail`：邮件主题与正文模板，支持 `{sender}`、`{timestamp}`、`{content}` 占位符

## Webhook 格式

当设置了 `WEBHOOK` 时，`sms.sh` 会向该地址发送一个 `POST` 请求：

- **Content-Type**: `application/json`
- **请求头**: `X-Webhook-Token: <WEBHOOK_TOKEN>`（如已配置）
- **请求体**: CPE 返回的原始短信 JSON，格式如下：

```json
{
  "session_item_1": {
    "session_phone": "10086",
    "message_item_1": {
      "rcvorsend": "recv",
      "key_index": "sms20260809125442_10086_+8613912345678",
      "time": "2026/08/09 12:54:42",
      "isOpened": "1",
      "msg_content": "短信正文内容",
      "childnode": "5"
    },
    "message_item_2": {
      "rcvorsend": "recv",
      "key_index": "sms20260809141644_10086_+8613912345678",
      "time": "2026/08/09 14:16:44",
      "isOpened": "0",
      "msg_content": "最新一条短信内容",
      "childnode": "6"
    }
  },
  "session_item_2": {
    "session_phone": "106900000000",
    "message_item_1": {
      "rcvorsend": "recv",
      "key_index": "sms20260809111341_106900000000_+8613912345678",
      "time": "2026/08/09 11:13:41",
      "isOpened": "0",
      "msg_content": "验证码短信内容",
      "childnode": "4"
    }
  }
}
```

字段说明：
```
session_item_*       短信会话
session_phone        对方号码
message_item_*       会话中的短信
rcvorsend             recv=收到，send=发送
key_index             短信文件索引
time                  短信时间
isOpened              0=未读，1=已读（在 CPE 管理面板端查看后才会改变）
msg_content           短信正文
childnode             XML 节点编号
```

附带的 `webhook/sms_webhook_mailer.py` 接收端支持两种鉴权方式（任选其一）：

- 请求头 `X-Webhook-Token: <token>`
- 请求头 `Authorization: Bearer <token>`

## 注意事项

- ⚠️ 脚本内置了 CPE 通讯加密使用的 RSA 私钥，这是 LG6851F 固件的固定密钥，请勿外传或用于其他用途
- ⚠️ 仓库中的 `monitor.sh` 与 `webhook/config.json` 内含示例值（如 `change-this-webhook-token`、SMTP 密码），部署前请务必修改，切勿将真实凭据提交到公开仓库
- 短信数据仅保存在内存/临时文件（`umask 077`），脚本退出时自动清理加密中间文件
- 登录失败时脚本会输出错误并退出
- 本项目仅用于个人学习与合法的自用场景，请勿用于任何侵犯他人隐私的用途

## License

[MIT](LICENSE)
