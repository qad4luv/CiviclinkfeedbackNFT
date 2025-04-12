import { useState } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x6596b78691E5844337ADbD8C521f0cA8ae7320180xYourContractAddressHere"; // Replace this
const CONTRACT_ABI = [
    "function submitFeedback(string calldata _message) external",
    "function login() public view returns (bool)",
    "function hasMinted(address user) public view returns (bool)"
  ];  

export default function FeedbackForm() {
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feedback) {
      setStatus("⚠️ Please enter your feedback.");
      return;
    }

    try {
      setStatus("⏳ Submitting feedback...");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tx = await contract.submitFeedback(feedback);
      await tx.wait();

      setStatus("✅ Thank you, your report has been submitted and a unique NFT has been generated for it.");
    } catch (err) {
      console.error(err);
      if (err.message.includes("Already submitted")) {
        setStatus("⚠️ You have already submitted feedback.");
      } else {
        setStatus("❌ Error submitting feedback.");
      }
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <form onSubmit={handleSubmit}>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter your feedback"
          style={{ width: "300px", height: "100px", padding: "10px" }}
        />
        <br />
        <button
          type="submit"
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Submit Feedback
        </button>
      </form>
      {status && <p style={{ marginTop: "10px" }}>{status}</p>}
    </div>
  );
}
