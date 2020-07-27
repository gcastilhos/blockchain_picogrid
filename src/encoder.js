import sha256 from 'sha256';

var isValidHash = (hashCode) => {
   if (hashCode !== undefined) {
     return hashCode.startsWith("000")
   }
   return false
}

export default function encode(text, previousHash) {
  var nonce = -1
  var hashCode = undefined
  while (!isValidHash(hashCode)) {
    nonce++
    var textToEncode = previousHash + text + nonce
    hashCode = sha256(textToEncode)
  }
  return {"nonce": nonce, "hash": hashCode}
}
