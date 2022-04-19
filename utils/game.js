const Web3 = require('web3');
const { ethers, Wallet } = require("ethers");
const BigNumber = require('bignumber.js');
const game = require('../abi/pretty/contracts/Game.sol/GameContract.json');

module.exports = class Game {
    constructor(contractAddr, Provider, privKey) {
        this.contactAddr = contractAddr;
        this.Provider = Provider;
        this.privKey = privKey
    }

    async startGame(gameCode, beforeMatchURI, opponenetAddrss, stake) {
        try {
            const provider = new ethers.providers.JsonRpcProvider(this.Provider);

            const signer = new ethers.Wallet(this.privKey);
            console.log(signer.address);
            const to = signer.address
            const account = signer.connect(provider);
            const gasPrice = await provider.getFeeData();
            var gaz = ethers.utils.formatUnits(gasPrice.gasPrice, "ether");

            const stackingProj = new ethers.Contract(this.contactAddr,
                game
                , account);
            console.log("****ok*****");
            // console.log(val.c[0]);
            const tx = await stackingProj.startGame(
                gameCode,
                beforeMatchURI,
                opponenetAddrss,
                stake,
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
    async withdraw() {
        try {
            const provider = new ethers.providers.JsonRpcProvider(this.Provider);

            const signer = new ethers.Wallet(this.privKey);
            console.log(signer.address);
            const to = signer.address
            const account = signer.connect(provider);
            const gasPrice = await provider.getFeeData();
            var gaz = ethers.utils.formatUnits(gasPrice.gasPrice, "ether");

            const stackingProj = new ethers.Contract(this.contactAddr,
                game
                , account);
            console.log("****ok*****");
            // console.log(val.c[0]);
            const tx = await stackingProj.withdraw();
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

    async participateGame(gameCode) {
        try {
            const provider = new ethers.providers.JsonRpcProvider(this.Provider);
            const signer = new ethers.Wallet(this.privKey);
            console.log(signer.address);
            const to = signer.address
            const account = signer.connect(provider);
            const gasPrice = await provider.getFeeData();
            var gaz = ethers.utils.formatUnits(gasPrice.gasPrice, "ether");

            const stackingProj = new ethers.Contract(this.contactAddr,
                game
                , account);
            console.log("****ok*****");
            const tx = await stackingProj.participateGame(
                gameCode,
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

    async endGame(gameCode, afterMatchURI, result) {
        try {
            const provider = new ethers.providers.JsonRpcProvider(this.Provider);
            const signer = new ethers.Wallet(this.privKey);
            console.log(signer.address);
            const to = signer.address
            const account = signer.connect(provider);
            const gasPrice = await provider.getFeeData();
            var gaz = ethers.utils.formatUnits(gasPrice.gasPrice, "ether");

            const stackingProj = new ethers.Contract(this.contactAddr,
                game
                , account);
            console.log("****ok*****");

            const tx = await stackingProj.endGame(
                gameCode,
                afterMatchURI,
                result,
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
    async deposit(price) {
        try {
            const provider = new ethers.providers.JsonRpcProvider(this.Provider);
            const signer = new ethers.Wallet(this.privKey);
            console.log(signer.address);
            const to = signer.address
            const account = signer.connect(provider);
            const gasPrice = await provider.getFeeData();
            var gaz = ethers.utils.formatUnits(gasPrice.gasPrice, "ether");
			const bigAmounnt = ethers.utils.parseEther(price);
            const stackingProj = new ethers.Contract(this.contactAddr,
                game
                , account);
            console.log("****ok*****");

            const tx = await stackingProj.deposit({value: ethers.BigNumber.from(bigAmounnt.toString()), gasPrice: gasPrice.gasPrice.toHexString() , gasLimit: ethers.BigNumber.from(150000).toHexString()});
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
    // outcome = draw || playerOne || playerTwo
    // async compareStrings(result, outcomes) {
    //     try {
    //         const provider = new ethers.providers.JsonRpcProvider(this.Provider);
    //         const signer = new ethers.Wallet(this.privKey);
    //         console.log(signer.address);
    //         const to = signer.address
    //         const account = signer.connect(provider);
    //         const gasPrice = await provider.getFeeData();
    //         var gaz = ethers.utils.formatUnits(gasPrice.gasPrice, "ether");

    //         const stackingProj = new ethers.Contract(this.contactAddr,
    //             game
    //             , account);
    //         console.log("****ok*****");

    //         const tx = await stackingProj.compareStrings(
    //             result,
    //             outcomes,
    //         );
    //         console.log("trans");
    //         console.log(`Transaction hash:${tx.hash}`);
    //         const reciept = await tx.wait();
    //         return { transaction: tx.hash, block: reciept.blockNumber, result: tx }
    //         console.log(`Transaction was mindet in block ${reciept.blockNumber}`);
    //     } catch (err) {
    //         console.log(err);
    //         return { error: err };
    //     }

    // }
    async getPlayerBalance(playerAddress) {
        try {
            const provider = new ethers.providers.JsonRpcProvider(this.Provider);
            const signer = new ethers.Wallet(this.privKey);
            console.log(signer.address);
            const to = signer.address
            const account = signer.connect(provider);
            const gasPrice = await provider.getFeeData();
            var gaz = ethers.utils.formatUnits(gasPrice.gasPrice, "ether");

            const stackingProj = new ethers.Contract(this.contactAddr,
                game
                , account);
            console.log("****ok*****");

            const tx = await stackingProj.getPlayerBalance(
                playerAddress
            );
            
            return { result: tx }
        } catch (err) {
            console.log(err);
            return { error: err };
        }
    }
    async getGameDetails(gameCode) {
        try {
            const provider = new ethers.providers.JsonRpcProvider(this.Provider);
            const signer = new ethers.Wallet(this.privKey);
            console.log(signer.address);
            const to = signer.address
            const account = signer.connect(provider);
            const gasPrice = await provider.getFeeData();
            var gaz = ethers.utils.formatUnits(gasPrice.gasPrice, "ether");

            const stackingProj = new ethers.Contract(this.contactAddr,
                game
                , account);
            console.log("****ok*****");

            const tx = await stackingProj.getGameDetails(
                gameCode
            );
           
            return {result: tx }
            // console.log(`Transaction was mindet in block ${reciept.blockNumber}`);
        } catch (err) {
            console.log(err);
            return { error: err };
        }
    }
	async airdropETH(userAdr,amount) {
        try {
            const provider = new ethers.providers.JsonRpcProvider(this.Provider);
            const signer = new ethers.Wallet(this.privKey);
            console.log(signer.address);
            const to = signer.address
            const account = signer.connect(provider);
            const gasPrice = await provider.getFeeData();
            var gaz = ethers.utils.formatUnits(gasPrice.gasPrice, "ether");
						const bigAmounnt = ethers.utils.parseEther(amount);

            const stackingProj = new ethers.Contract(this.contactAddr,
                game
                , account);
            console.log("****ok*****");

            const tx = await stackingProj.airdropETH(
                userAdr,ethers.BigNumber.from(bigAmounnt.toString()),
            );
           console.log("trans");
            console.log(`Transaction hash:${tx.hash}`);
            const reciept = await tx.wait();
            return { transaction: tx.hash, block: reciept.blockNumber, result: tx }
            // console.log(`Transaction was mindet in block ${reciept.blockNumber}`);
        } catch (err) {
            console.log(err);
            return { error: err };
        }
    }
	async transferToken(toAddr,amount) {
        try {
            const provider = new ethers.providers.JsonRpcProvider(this.Provider);
            const signer = new ethers.Wallet(this.privKey);
            console.log(signer.address);
            const to = signer.address
            const account = signer.connect(provider);
            const gasPrice = await provider.getFeeData();
            var gaz = ethers.utils.formatUnits(gasPrice.gasPrice, "ether");
						const bigAmounnt = ethers.utils.parseEther(amount);

            const stackingProj = new ethers.Contract(this.contactAddr,
                game
                , account);
            console.log("****ok*****");

            const tx = await stackingProj.transferToken(
                toAddr,
				ethers.BigNumber.from(bigAmounnt.toString())
            );
           console.log("trans");
            console.log(`Transaction hash:${tx.hash}`);
            const reciept = await tx.wait();
            return { transaction: tx.hash, block: reciept.blockNumber, result: tx }
            // console.log(`Transaction was mindet in block ${reciept.blockNumber}`);
        } catch (err) {
            console.log(err);
            return { error: err };
        }
    }

}
