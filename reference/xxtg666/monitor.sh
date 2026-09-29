#!/bin/sh

exec >> /tmp/sms.log 2>&1

export WEBHOOK="http://example.com:8000/api/sms"
export WEBHOOK_TOKEN="change-this-webhook-token"
export BASE="http://127.0.0.1"
export FH_USER="admin"
export FH_PASS="你的密码"

FIFO_PATH="/tmp/sms_event.fifo"
rm -f "$FIFO_PATH"
mkfifo "$FIFO_PATH"

ubus listen > "$FIFO_PATH" &
UBUS_PID=$!

cleanup() {
    echo "[$(date +%H:%M:%S)] Service stopping. Surgically killing our Ubus PID: $UBUS_PID"
    kill -9 "$UBUS_PID" 2>/dev/null
    rm -f "$FIFO_PATH"
    exit 0
}

trap cleanup INT TERM

echo "========== $(date) =========="
echo "[SMS-Monitor] Native service started. Tracking unique Ubus PID: $UBUS_PID"

while read -r line; do
    case "$line" in
        *cpe_new_sms_notify*)
            echo "[$(date +%H:%M:%S)] Match Hit! Executing sms.sh..."
            /data/sms/sms.sh
            echo "[$(date +%H:%M:%S)] Execution finished."
            ;;
    esac
done < "$FIFO_PATH"