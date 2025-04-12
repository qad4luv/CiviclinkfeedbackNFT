import { useState } from "react";
import { ethers } from "ethers";

export default function WalletConnect() {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("🦊 Please install MetaMask!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const _walletAddress = await signer.getAddress();

      setConnected(true);
      setWalletAddress(_walletAddress);
    } catch (err) {
      console.error(err);
      alert("Wallet connection failed.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <button
        onClick={connectWallet}
        style={{
          padding: "10px 20px",
          backgroundColor: "#f6851b",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px"
        }}
      >
        {connected ? "Connected" : "Connect Wallet"}
      </button>
      <div style={{ marginTop: "10px" }}>
        {walletAddress && <p><strong>Wallet:</strong> {walletAddress}</p>}
      </div>
    </div>
  );
}
