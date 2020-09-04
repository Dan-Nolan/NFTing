const { assert } = require("chai");

describe("NFT Story", function() {
  let nft;
  let story;
  beforeEach(async () => {
    const MyNFT = await ethers.getContractFactory("MyNFT");
    nft = await MyNFT.deploy();
    await nft.deployed();

    const Story = await ethers.getContractFactory("Story");
    story = await Story.deploy();
    await story.deployed();
  });

  describe('after transferring to the nft to the story', () => {
    beforeEach(async () => {
      const signer = ethers.provider.getSigner(0);
      const addr = await signer.getAddress();
      await nft.awardItem(addr, "http://test.co");
      const tokenId = 1;
      // it looks like calling safeTransferFrom is a bit tricky since this is an overloaded function
      // you need to pick the definition of the function you want to call and then call it like this:
      await nft['safeTransferFrom(address,address,uint256)'](addr, story.address, tokenId);
    });

    it("should have a chapter", async () => {
      const chapter = await story.chapters(0);
      assert.equal(chapter.nftContract, nft.address);
      assert.equal(chapter.tokenId, 1);
    });
  })
});
