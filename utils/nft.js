const Web3 = require('web3');
const { ethers, Wallet } = require("ethers");
const BigNumber = require('bignumber.js');
const nft = require('../abi/pretty/contracts/GameNFT.sol/GameNFT.json');

module.exports = class nftoken {
    constructor(contractAddr, Provider, privKey) {
        this.contactAddr = contractAddr;
        this.Provider = Provider;
        this.privKey = privKey
    }

    async createToken(tokenURI) {
        try {
            const provider = new ethers.providers.JsonRpcProvider(this.Provider);

            const signer = new ethers.Wallet(this.privKey);
            console.log(signer.address);
            const to = signer.address
            const account = signer.connect(provider);
            const gasPrice = await provider.getFeeData();
            var gaz = ethers.utils.formatUnits(gasPrice.gasPrice, "ether");
            const stackingProj = new ethers.Contract(this.contactAddr,
                nft
                , account);

            console.log("****ok*****");
            amount = ethers.utils.formatUnits(amount, "ether");

            // console.log(val.c[0]);
            const tx = await stackingProj.createToken(
                tokenURI,
            );
            console.log("trans");
            console.log(`Transaction hash:${tx.hash}`);

            const reciept = await tx.wait();
            return { transaction: tx.hash, block: reciept.blockNumber, result: tx }
            console.log(`Transaction was mindet in block ${reciept.blockNumber}`);
        } catch (err) {
            console.log(err);
            return { error: err };
        }

    }

    async transferToken(fromAddress, toAddress, tokenId) {

        try {
            const provider = new ethers.providers.JsonRpcProvider(this.Provider);

            const signer = new ethers.Wallet(this.privKey);
            console.log(signer.address);
            const to = signer.address
            const account = signer.connect(provider);
            const gasPrice = await provider.getFeeData();
            var gaz = ethers.utils.formatUnits(gasPrice.gasPrice, "ether");
            const stackingProj = new ethers.Contract(this.contactAddr,
                nft
                , account);

            console.log("****ok*****");
            amount = ethers.utils.formatUnits(amount, "ether");

            // console.log(val.c[0]);
            const tx = await stackingProj.transferFrom(
                fromAddress,
                toAddress,
                tokenURI,
            );
            console.log("trans");
            console.log(`Transaction hash:${tx.hash}`);

            const reciept = await tx.wait();
            return { transaction: tx.hash, block: reciept.blockNumber, result: tx }
            console.log(`Transaction was mindet in block ${reciept.blockNumber}`);
        } catch (err) {
            console.log(err);
            return { error: err };
        }

    }



}