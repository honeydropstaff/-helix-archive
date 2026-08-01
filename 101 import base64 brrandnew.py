import base64 

        cipher = AES.new(key, AES.MODE_GCM, nonce=nonce)
        cipher.update(aad)
        plaintext = cipher.decrypt_and_verify(ciphertext, tag)

        print("[+] SUCCESS")
        print(plaintext.decode("utf-8"))
    except Exception as exc:
        print("[-] Decryption failed:", exc)
        traceback.print_exc()


def main():
    password = get_password()
    for block in blocks:
        decode_block(block, password)


if __name__ == "__main__":
    main()%                                                                     
jess.@jesss-MacBook-Pro Decode %  cd '/Users/jess./Decode' && python3 'import base64 brrandnew'
jess.@jesss-MacBook-Pro Decode %  cd '/Users/jess./Decode' && python3 -m py_compile 'import base64 brrandnew'
jess.@jesss-MacBook-Pro Decode %  cd '/Users/jess./Decode' && printf 'test
' | python3 'import base64 brrandnew'
jess.@jesss-MacBook-Pro Decode %  cd '/Users/jess./Decode' && printf '--- file content ---
' && sed -n '1,160p' 'import base64 brrandnew' && printf '
--- grep ---
' && grep -n "Wrong password\|Decryption failed\|traceback" 'import base64 brrandnew'
--- file content ---
import base64
import getpass
import traceback
from Crypto.Protocol.KDF import scrypt
from Crypto.Cipher import AES

# ===========================
# اطلب كلمة المرور من المستخدم
# ===========================

def get_password():
    return getpass.getpass("Password: ")

# ===========================
# ضع بيانات الكتل هنا
# ===========================
blocks = [
    {
        "name": "BLOCK 1",
        "salt": "PUT_SALT_HERE",
        "nonce": "PUT_NONCE_HERE",
        "aad": "PUT_AAD_HERE",
        "ciphertext": "PUT_CIPHERTEXT_HERE",
    },
    {
        "name": "BLOCK 2",
        "salt": "PUT_SALT_HERE",
        "nonce": "PUT_NONCE_HERE",
        "aad": "PUT_AAD_HERE",
        "ciphertext": "PUT_CIPHERTEXT_HERE",
    },
    {
        "name": "BLOCK 3",
        "salt": "PUT_SALT_HERE",
        "nonce": "PUT_NONCE_HERE",
        "aad": "PUT_AAD_HERE",
        "ciphertext": "PUT_CIPHERTEXT_HERE",
    },
]


def is_placeholder(value):
    return not value or value.startswith("PUT_")


def decode_block(block, password):
    print("=" * 60)
    print(block.get("name", "<unnamed block>"))

    required_keys = ["salt", "nonce", "aad", "ciphertext"]
    for key in required_keys:
        if is_placeholder(block.get(key, "")):
            print(f"[-] Block '{block.get('name', '<unnamed>')}' contains placeholder value for '{key}'.")
            print("    Fill in all base64-encoded values before running the script.")
            return

    try:
        salt = base64.b64decode(block["salt"])
        nonce = base64.b64decode(block["nonce"])
        aad = base64.b64decode(block["aad"])
        data = base64.b64decode(block["ciphertext"])
    except Exception as exc:
        print("[-] Failed to decode base64 data:", exc)
        traceback.print_exc()
        return

    if len(data) < 16:
        print("[-] Ciphertext is too short to contain an authentication tag.")
        return

    ciphertext = data[:-16]
    tag = data[-16:]

    try:
        key = scrypt(
            password=password.encode(),
            salt=salt,
            key_len=32,
            N=262144,
            r=8,
            p=1,
        )

        cipher = AES.new(key, AES.MODE_GCM, nonce=nonce)
        cipher.update(aad)
        plaintext = cipher.decrypt_and_verify(ciphertext, tag)

        print("[+] SUCCESS")
        print(plaintext.decode("utf-8"))
    except Exception as exc:
        print("[-] Decryption failed:", exc)
        traceback.print_exc()


def main():
    password = get_password()
    for block in blocks:
        decode_block(block, password)


if __name__ == "__main__":
    main()
--- grep ---
3:import traceback
64:        traceback.print_exc()
91:        print("[-] Decryption failed:", exc)
92:        traceback.print_exc()
jess.@jesss-MacBook-Pro Decode % 
jess.@jesss-MacBook-Pro Decode %  cd '/Users/jess./Decode' && python3 - <<'PY'
import sys
print('python', sys.version)
try:
    import Crypto
    print('Crypto OK', Crypto.__file__)
except Exception as e:
    print('Crypto import failed:', type(e).__name__, e)
try:
    import getpass
    print('getpass OK')
except Exception as e:
    print('getpass import failed:', type(e).__name__, e)
PY
jess.@jesss-MacBook-Pro Decode %  cd '/Users/jess./Decode' && echo 'terminal-ok' && python3 -c 'print("python-ok")'
terminal-ok
jess.@jesss-MacBook-Pro Decode %  cd '/Users/jess./Decode' && command -v python3 && python3 --version && python3 -c 'print("hello")'
/Library/Frameworks/Python.framework/Versions/3.11/bin/python3
jess.@jesss-MacBook-Pro Decode %  cd '/Users/jess./Decode' && python3 - <<'PY'
import getpass
print('start')
try:
    pwd = getpass.getpass('Password: ')
    print('got:', pwd)
except Exception as e:
    print('error', type(e).__name__, e)
PY
jess.@jesss-MacBook-Pro Decode %  cd '/Users/jess./Decode' && python3 -c 'print("hello")'
jess.@jesss-MacBook-Pro Decode % >....                                                               
        key = scrypt(
            password=password.encode("utf-8"),
            salt=salt,
            key_len=SCRYPT_PARAMS["key_len"],
            N=SCRYPT_PARAMS["N"],
            r=SCRYPT_PARAMS["r"],
            p=SCRYPT_PARAMS["p"],
        )

        cipher = AES.new(key, AES.MODE_GCM, nonce=nonce)
        cipher.update(aad)
        plaintext = cipher.decrypt_and_verify(ciphertext, tag)

        print("[+] SUCCESS")
        print(plaintext.decode("utf-8", errors="replace"))
    except Exception:
        print("Wrong password or authentication failed")
        traceback.print_exc()


def main():
    password = prompt_password()
    for block in BLOCKS:
        decrypt_block(block, password)


if __name__ == "__main__":
    main()
'''
Path('import base64 brrandnew').write_text(content, encoding='utf-8')
PY
jess.@jesss-MacBook-Pro Decode % 