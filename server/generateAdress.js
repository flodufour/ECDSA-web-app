const secp = require("ethereum-cryptography/secp256k1");
const { hexToBytes, toHex} = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKeys = [
  "414d11a6296a492f216322b878f835b37a5e38a2d78a931cfa9a68723c24b733",
  "ebdd3dac290bc74df3d31cb9fce0b3697c4ac2b79043d5e424cd752ee4224eff",
  "619f45c6231a7dd24bc15df1dd110d4979aae914b5210e2dc858948b6c0fe011",
];

function getAddress(publicKey) {
  const hash = keccak256(publicKey.slice(1));
  return "0x" + toHex(hash.slice(-20));
}

for (const pk of privateKeys) {
  const publicKey = secp.getPublicKey(hexToBytes(pk));
  console.log(pk, "->", getAddress(publicKey));
}

