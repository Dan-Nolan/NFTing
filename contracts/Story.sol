//SPDX-License-Identifier: Unlicense
pragma solidity ^0.6.8;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract Story is IERC721Receiver {
  struct NFT {
    address nftContract;
    uint tokenId;
  }

  NFT[] public chapters;

  function onERC721Received(
    address operator,
    address from,
    uint256 tokenId,
    bytes calldata data
  ) external override returns (bytes4) {
    NFT memory chapter = NFT(msg.sender, tokenId);
    chapters.push(chapter);
    return this.onERC721Received.selector;
  }
}
