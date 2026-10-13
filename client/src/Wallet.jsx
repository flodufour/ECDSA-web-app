import server from "./server";
import { toHex, hexToBytes } from "ethereum-cryptography/utils";
import { useState } from "react";
import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";

function Wallet({ address, setAddress, balance, setBalance }) {
  const [privateKey, setPrivateKey] = useState("");

  async function onChange(evt) {
    const value = evt.target.value;
    setPrivateKey(value);

    if (!/^[0-9a-fA-F]{64}$/.test(value)) {
      setAddress("");
      setBalance(0);
      return;
    }

    const privateKey = hexToBytes(value);
    const publicKey = secp.getPublicKey(privateKey);
    const hash = keccak256(publicKey.slice(1));
    const publicAddress = "0x" + toHex(hash.slice(-20));

    setAddress(publicAddress);
    if (publicAddress) {
      const {
        data: { balance },
      } = await server.get(`balance/${publicAddress}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input placeholder="Type your private key, " value={privateKey} onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
