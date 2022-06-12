const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token", function () {
  /* beforeEach(function (setup) {
    
  });   */

  it("Should return the Supply", async function () {
    const Token = await ethers.getContractFactory("CryptoToken");
    const token = await Token.deploy(100);
    await token.deployed();

    expect(await token.totalSupply()).to.equal(100);
    
    //const[owner] = await ethers.getSigners();

    //expect(await token.balanceOf(owner.address)).to.equal(100);
    
    //const setGreetingTx = await greeter.setGreeting("Hola, mundo!");
    // wait until the transaction is mined
    //await setGreetingTx.wait();

  });

  it("Should verify the balance", async function () {
    const Token = await ethers.getContractFactory("CryptoToken");
    const token = await Token.deploy(100);
    await token.deployed();

    const[owner] = await ethers.getSigners();

    expect(await token.balanceOf(owner.address)).to.equal(100);
  });

  it("Should verify the transfer", async function () {
    const Token = await ethers.getContractFactory("CryptoToken");
    const token = await Token.deploy(100);
    await token.deployed();

    const[owner, wallet] = await ethers.getSigners();
    const transfer = await token.connect(owner)
    .transfer(wallet.address, 50);
    await transfer.wait();

    expect(await token.balanceOf(owner.address)).to.equal(50);
    expect(await token.balanceOf(wallet.address)).to.equal(50);
  });

  it("Should verify the transfer erro", async function () {
    const Token = await ethers.getContractFactory("CryptoToken");
    const token = await Token.deploy(100);
    await token.deployed();

    const[owner, wallet] = await ethers.getSigners();
    
    await expect(token.connect(owner)
    .transfer(wallet.address, 101)).to.be
    .revertedWith("Insufficient Balance to Transfer");
  });
});
