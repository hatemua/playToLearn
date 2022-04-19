const Web3 = require('web3');
const { ethers, Wallet } = require("ethers");
const BigNumber = require('bignumber.js');
const token = require('../abi/pretty/contracts/EYToken.sol/EYToken.json');

module.exports = class eytoken {
    constructor(contractAddr, Provider, privKey) {
        this.contactAddr = contractAddr;
        this.Provider = Provider;
        this.privKey = privKey
    }

    async approvetx(spenderAddress, amount) {
        try {
            const provider = new ethers.providers.JsonRpcProvider(this.Provider);

            const signer = new ethers.Wallet(this.privKey);
            console.log(signer.address);
            const to = signer.address
            const account = signer.connect(provider);
            const gasPrice = await provider.getFeeData();
            var gaz = ethers.utils.formatUnits(gasPrice.gasPrice, "ether");
            const stackingProj = new ethers.Contract(this.contactAddr,
                token
                , account);

            console.log("****ok*****");
            amount = ethers.utils.formatUnits(amount, "ether")
            // console.log(val.c[0]);
            const tx = await stackingProj.approve(
                spenderAddress,
                amount,
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

    async transferFrom(fromAddress, toAddress, amount) {
        try {
            const provider = new ethers.providers.JsonRpcProvider(this.Provider);

            const signer = new ethers.Wallet(this.privKey);
            console.log(signer.address);
            const to = signer.address
            const account = signer.connect(provider);
            const gasPrice = await provider.getFeeData();
            var gaz = ethers.utils.formatUnits(gasPrice.gasPrice, "ether");
            const stackingProj = new ethers.Contract(this.contactAddr,
                token
                , account);

            console.log("****ok*****");
            amount = ethers.utils.formatUnits(amount, "ether");

            // console.log(val.c[0]);
            const tx = await stackingProj.transferFrom(
                fromAddress,
                toAddress,
                amount
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