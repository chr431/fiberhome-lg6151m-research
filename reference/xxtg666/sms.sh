#!/bin/sh
set -eu

BASE="${BASE:-http://127.0.0.1}"
COOKIE="${COOKIE:-/tmp/lg6851f.cookie}"
FH_USER="${FH_USER:-admin}"
FH_PASS="${FH_PASS:-passwd}"
SKIP_LOGIN="${SKIP_LOGIN:-0}"
WEBHOOK="${WEBHOOK:-}"
WEBHOOK_TOKEN="${WEBHOOK_TOKEN:-}"

RSA_PEM=/tmp/lg6851f_rsa.pem
RSA_BIN=/tmp/lg6851f_rsa.bin
TOKEN_BIN=/tmp/lg6851f_token.bin
CIPHER_BIN=/tmp/lg6851f_cipher.bin
DECRYPT_BIN=/tmp/lg6851f_decrypt.bin

umask 077
touch "$COOKIE"

cleanup() {
    rm -f "$RSA_BIN" "$TOKEN_BIN" "$CIPHER_BIN" "$DECRYPT_BIN"
}
trap cleanup EXIT

json_get() {
    local json="$1"
    local expr="$2"

    if command -v jsonfilter >/dev/null 2>&1; then
        jsonfilter -s "$json" -e "$expr" 2>/dev/null | tr -d '"'
        return
    fi

    case "$expr" in
        '@.enable')
            printf '%s' "$json" |
                sed -n 's/.*"enable"[[:space:]]*:[[:space:]]*\([^,}]*\).*/\1/p'
            ;;
        '@.data')
            printf '%s' "$json" |
                sed -n 's/.*"data"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p'
            ;;
        '@.sessionid')
            printf '%s' "$json" |
                sed -n 's/.*"sessionid"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p'
            ;;
    esac
}

nonce() {
    lua -e 'math.randomseed(os.time()); io.write(math.random())'
}

cat > "$RSA_PEM" <<'EOF'
-----BEGIN RSA PRIVATE KEY-----
MIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQC3Ij9dkS9pmNeO
RIuDOFavCpO92Ieh/jglB8vAqxe3pA2VakZNNHN7caHvNb4DTCAMlRcFrRVf1K2C
GHKdrgiyJGe0kwAnCwUTihCe9jkMzl+ZNKHYtWufUv7ISh+FZXfHi/huyl/MqIPz
agIB3glpAJ4T7T7gWGT1+fklekZ8URfMqbTXUa/3QBCmwfKrdv4YiIOuPqpifxYK
9BWeNYKUOyWbF+dKVi9Wns9mU55Tvw23yF1/jYpXmzv9MTZnybgnIKnXdXmBSyGx
xxj9hVqdvQuMyslForGxxHIIDaGS26vZTdqfJGeFoBCHHMXzGaNC/1uF0x87VA7a
u4jxuBORAgMBAAECgf8CgPVc0h9T0kMgLs+5e4uz2PEsJ0mzbUZXO0QN3kj0ucl1
wX40kAMELQmJu7JdWS0W/vLRoQwpwz6cCLmIbliwFs9UKK5X2k63davEgJlHE4s7
DP0peVF/XCMfmePUbw60K7W5zgqBQcyMB2b/n4mBZgDDRPsXFh5LPp+pY4KTMIK2
TcWCTOi+7SeoNkKaOXwfkprBCYSNdi6OociMVLUaVd16MHofseuaUKPXoTI8vaa7
MbT4RGXEPiuXbwfN6G5j9Gi3zN8c+1Im9rLLcXUNnwxJCmt5cIsSdKY/BwL5Ybfz
wWZSSfqnVIZmYZFfCFLy45EfNWf8tJNODy5QlQkCgYEA38XpPi2TPVkCRfOL4pje
WRW4C6fa0ziBgtJtN4Elx7o401BgUNNuOW4/NhTMSlf1Z9qEGi2M2Eyj1xT8ZMlH
2+fILAwV+G2sQIY4NY9XMHsPGGCsDOIvYvw76yYXnBOcaOX1+jY+g2ING1Zb+P0y
mR8lXb/a3Y+gKhfeEYqbA+UCgYEA0YIKzX/pAYWyxJhgr+8ki5DkYCCZGb3H2v0A
Pqb9CNbgFtkEEdgJTdcpRKuEgkmIp+iR7i9TiwCy3rwHUn5wodn5cSnGq/nIRRa+
YtGJc4qmjEo0TZJNcmx4U4vjKfTDc6wZkaQ9nzGF5Fww3xMh5u+0Rh+IfH74dktM
N3hxLj0CgYAwpU6SNMgocvwahtpnFUJo7V7IMeJRPpxw+xvBEDNNWv9VeMinaX8x
vvTA5f6PPtXbkNZc9oAC2Y5YiHhh1Jvpg1axtKLmEbl7gXIgupuCr43Vh9Z/KoCQ
rTK9aNeDF4RODYfOsBIg76TXx4tQ8oIYZXvzCG0k8z8nR28AMziFvQKBgQC3YkG8
cQruZy38gXiYZxYxCAmuzrnUW1cVq0FMlfSEiTkrJpg2WkiClyQrVIqvVFhGyP77
YveYg2sOJb2vCrfiJB8AW9Xn8MLJHshVTR4oQaPYxpcTk00xLBsC3j5gGjv/AxR6
dC3wK3QMWFn62Q9iykyc2LsqZiVrvisfntBK7QKBgAJu8Z3zUHojUtOTsiziwiAp
OdNfYhHpkp8fUYsskYaxb8DIdthYnZIV1hfh+0Qqly7zv8ykys3q+g0HFiBpd6L9
VhE1BTgnvDf1dsag1nk6+/JFWYaOJVD0IGtDT0pRtiEPM9EYp6H2gMnN8/CRt6nd
UJwqeV9xjw6Sl0ftaKuF
-----END RSA PRIVATE KEY-----
EOF

FEATURE="$(
    curl -fsS -b "$COOKIE" -c "$COOKIE" \
      -H 'X-Requested-With: XMLHttpRequest' \
      "$BASE/fh_api/tmp/FHNCAPIS?ajaxmethod=is_encrypt"
)"

ENABLE="$(json_get "$FEATURE" '@.enable')"
RSA_B64="$(json_get "$FEATURE" '@.data')"

if [ "$ENABLE" = "1" ]; then
    printf '%s' "$RSA_B64" |
        openssl base64 -d -A > "$RSA_BIN"

    if ! openssl rsautl -decrypt -pkcs \
        -inkey "$RSA_PEM" \
        -in "$RSA_BIN" \
        -out "$TOKEN_BIN" 2>/dev/null; then
        openssl pkeyutl -decrypt \
            -inkey "$RSA_PEM" \
            -pkeyopt rsa_padding_mode:pkcs1 \
            -in "$RSA_BIN" \
            -out "$TOKEN_BIN"
    fi

    FH_TOKEN="$(tr -d '\r\n' < "$TOKEN_BIN")"
else
    FH_TOKEN=""
fi

get_sessionid() {
    local response
    response="$(
        curl -fsS -b "$COOKIE" -c "$COOKIE" \
          -H 'X-Requested-With: XMLHttpRequest' \
          "$BASE/fh_api/tmp/FHNCAPIS?ajaxmethod=get_refresh_sessionid"
    )"
    json_get "$response" '@.sessionid'
}

derive_key_hex() {
    lua - "$1" "$2" <<'LUA'
local sid = arg[1]
local token = arg[2]
local special = {[5]=true, [7]=true, [10]=true, [11]=true, [13]=true}
local offset = string.byte(sid, 2) % 3 - 1
local result = {}
local token_index = 1

for i = 0, 15 do
    local code

    if special[i] then
        code = string.byte(token, token_index) + offset
        token_index = token_index + 1
    elseif #sid > i * 4 + 2 then
        code = string.byte(sid, #sid - 1 - i * 4) - 1
    else
        code = string.byte(sid, i * 4 - 30) + 1
    end

    result[#result + 1] = string.format("%02x", code % 256)
end

io.write(table.concat(result))
LUA
}

random_prefix() {
    lua <<'LUA'
math.randomseed(os.time())
local chars = "0123456789abcdefghijklmnopqrstuvwxyz"

for i = 1, 6 do
    local n = math.random(1, #chars)
    io.write(chars:sub(n, n))
end
LUA
}

IV_HEX=6f707172737475767778797a7b7c7d7e

encrypt_wire() {
    printf '%s' "$1" |
        openssl enc -aes-128-cbc -nosalt \
          -K "$KEY_HEX" \
          -iv "$IV_HEX" \
          > "$CIPHER_BIN" 2>/dev/null

    CIPHER_HEX="$(
        hexdump -v -e '1/1 "%02x"' "$CIPHER_BIN"
    )"

    printf '%s%s' "$(random_prefix)" "$CIPHER_HEX"
}

hex_to_bin() {
    lua - "$1" <<'LUA'
local hex = arg[1]

if #hex % 2 ~= 0 then
    os.exit(1)
end

for i = 1, #hex, 2 do
    local value = tonumber(hex:sub(i, i + 1), 16)
    if not value then
        os.exit(1)
    end
    io.write(string.char(value))
end
LUA
}

decrypt_wire() {
    local raw
    local hex
    local decoded

    raw="$(printf '%s' "$1" | tr -d '\r\n')"

    case "$raw" in
        \{*|\[*)
            printf '%s' "$raw"
            return 0
            ;;
    esac

    raw="$(printf '%s' "$raw" | sed 's/^"//;s/"$//')"
    hex="${raw#??????}"

    case "$hex" in
        ""|*[!0-9a-fA-F]*)
            printf '%s' "$raw"
            return 0
            ;;
    esac

    if hex_to_bin "$hex" |
        openssl enc -d -aes-128-cbc -nosalt \
          -K "$KEY_HEX" \
          -iv "$IV_HEX" \
          > "$DECRYPT_BIN" 2>/dev/null; then
        cat "$DECRYPT_BIN"
    else
        printf '%s' "$raw"
    fi
}

SESSION="$(get_sessionid)"

if [ "$ENABLE" = "1" ]; then
    KEY_HEX="$(derive_key_hex "$SESSION" "$FH_TOKEN")"
fi

if [ "$SKIP_LOGIN" != "1" ]; then
    : "${FH_PASS:?请设置 FH_PASS}"

    LOGIN_PLAIN="$(
        lua - "$FH_USER" "$FH_PASS" "$SESSION" <<'LUA'
local function quote(value)
    return string.format("%q", value or "")
end

io.write(
    '{"dataObj":{"username":' .. quote(arg[1]) ..
    ',"password":' .. quote(arg[2]) ..
    '},"ajaxmethod":"DO_WEB_LOGIN","sessionid":' ..
    quote(arg[3]) .. '}'
)
LUA
    )"

    if [ "$ENABLE" = "1" ]; then
        LOGIN_BODY="$(encrypt_wire "$LOGIN_PLAIN")"
    else
        LOGIN_BODY="$LOGIN_PLAIN"
    fi

    LOGIN_RAW="$(
        curl -fsS -b "$COOKIE" -c "$COOKIE" \
          -H 'X-Requested-With: XMLHttpRequest' \
          -H 'Content-Type: application/json; charset=utf-8' \
          --data-binary "$LOGIN_BODY" \
          "$BASE/fh_api/sign/DO_WEB_LOGIN?_=$(nonce)"
    )"

    LOGIN_JSON="$(decrypt_wire "$LOGIN_RAW")"
    printf '%s\n' "$LOGIN_JSON" >&2

    if printf '%s' "$LOGIN_JSON" |
        grep -Eq '"result"[[:space:]]*:[[:space:]]*"?9"?'; then
        echo "登录仍返回 result=9，请检查用户名、密码或会话参数" >&2
        exit 1
    fi
fi

SESSION="$(get_sessionid)"

if [ "$ENABLE" = "1" ]; then
    KEY_HEX="$(derive_key_hex "$SESSION" "$FH_TOKEN")"
fi

SMS_PLAIN="$(
    printf \
      '{"dataObj":null,"ajaxmethod":"get_sms_data","sessionid":"%s"}' \
      "$SESSION"
)"

if [ "$ENABLE" = "1" ]; then
    SMS_BODY="$(encrypt_wire "$SMS_PLAIN")"
else
    SMS_BODY="$SMS_PLAIN"
fi

SMS_RAW="$(
    curl -fsS -b "$COOKIE" -c "$COOKIE" \
      -H 'X-Requested-With: XMLHttpRequest' \
      -H 'Content-Type: application/json; charset=utf-8' \
      --data-binary "$SMS_BODY" \
      "$BASE/fh_api/tmp/FHAPIS?_=$(nonce)"
)"

SMS_JSON="$(decrypt_wire "$SMS_RAW")"
printf '%s\n' "$SMS_JSON"

if [ -n "$WEBHOOK" ]; then
    curl -fsS \
      -H 'Content-Type: application/json' \
      -H "X-Webhook-Token: $WEBHOOK_TOKEN" \
      --data-binary "$SMS_JSON" \
      "$WEBHOOK"
fi
