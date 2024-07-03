import { encrypt, decrypt } from 'crypto-js/aes'
import { parse } from 'crypto-js/enc-utf8'
import pkcs7 from 'crypto-js/pad-pkcs7'
import ECB from 'crypto-js/mode-ecb'
import md5 from 'crypto-js/md5'
import UTF8 from 'crypto-js/enc-utf8'
import Hex from 'crypto-js/enc-hex'
import Base64 from 'crypto-js/enc-base64'

import { cacheEncrypt } from '@/config'

export class AesEncryption {
  constructor(opt = {}) {
    const { key, iv } = opt
    if (key) {
      this.key = parse(key)
    }
    if (iv) {
      this.iv = parse(iv)
    }
  }

  get getOptions() {
    return {
      mode: ECB,
      padding: pkcs7,
      iv: this.iv,
    }
  }

  encryptByAES(text) {
    const encrypted = encrypt(text, this.key, this.getOptions)
    return Base64.stringify(Hex.parse(encrypted.ciphertext.toString()))
  }

  decryptByAES(text) {
    const decrypted = decrypt(text, this.key, this.getOptions)
    return decrypted.toString(UTF8)
  }
}

const encryption = new AesEncryption({ key: cacheEncrypt.key, iv: cacheEncrypt.iv })

/* 加密 */
export const aesencrypt = (plaintext) => {
  return encryption.encryptByAES(plaintext)
}

/* 解密 */
export const aesdecrypt = (encrypted) => {
  return encryption.decryptByAES(encrypted)
}

export function encryptByBase64(text) {
  return UTF8.parse(text).toString(Base64)
}

export function decodeByBase64(text) {
  return Base64.parse(text).toString(UTF8)
}

export function encryptByMd5(password) {
  return md5(password).toString()
}
