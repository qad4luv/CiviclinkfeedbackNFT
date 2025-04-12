// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract FeedbackNFT {
    struct Feedback {
        string message;
        bool submitted;
    }

    mapping(address => Feedback) public feedbacks;
    mapping(address => bool) public hasNFT;

    event FeedbackSubmitted(address indexed user, string message);
    event NFTMinted(address indexed user);

    // Check login status
    function login() public view returns (bool) {
        return feedbacks[msg.sender].submitted;
    }

    // Submit feedback and mint NFT
    function submitFeedback(string calldata _message) external {
        require(!feedbacks[msg.sender].submitted, "Already submitted");

        feedbacks[msg.sender] = Feedback(_message, true);
        hasNFT[msg.sender] = true;

        emit FeedbackSubmitted(msg.sender, _message);
        emit NFTMinted(msg.sender);
    }

    // Check if a user has an NFT
    function hasMinted(address user) public view returns (bool) {
        return hasNFT[user];
    }
}
