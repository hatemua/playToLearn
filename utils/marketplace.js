const Web3 = require('web3');
const { ethers, Wallet } = require("ethers");
const BigNumber = require('bignumber.js');
const abi = require('../abi/pretty/contracts/MarketPlace.sol/MarketPlace.json');
//const abiERC20 = require('../abi/ERC20.json');
module.exports = class marketplace {

	constructor(contractAddr, Provider, privKey) {
		this.contactAddr = contractAddr;
		this.Provider = Provider;
		this.privKey = privKey
	}


	async createMarketItem(nftContract, tokenId, price) {
		try {
			const provider = new ethers.providers.JsonRpcProvider(this.Provider);
			//ethers.utils.parseEther(this.montant.toString())

			//ethers.BigNumber.from(amountInMax.toString())

			//const hexPrice = ethers.BigNumber.from(bigAmounnt.toString());






			const signer = new ethers.Wallet(this.privKey);
			console.log(signer.address);
			const to = signer.address
			const account = signer.connect(provider);
			const gasPrice = await provider.getFeeData();
			var gaz = ethers.utils.formatUnits(gasPrice.gasPrice, "ether")

			console.log("---------");
			console.log(gaz);
			// const uniswap = new ethers.Contract('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
			// ['function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)external payable returns (uint[] memory amounts)']
			// ,account);	
			const bigAmounnt = ethers.utils.parseEther(price);
			const A = ethers.BigNumber.from(bigAmounnt.toString())
			console.log(A);
			console.log(A);

			const stackingProj = new ethers.Contract(this.contactAddr,
				abi
				, account);
			console.log("****ok*****");
			// console.log(val.c[0]);
			const tx = await stackingProj.createMarketItem(
				nftContract,
				tokenId,
				ethers.BigNumber.from(bigAmounnt.toString()),
				{ gasPrice: gasPrice.gasPrice.toHexString(), gasLimit: ethers.BigNumber.from(150000).toHexString() }
			);
			// const tx = await uniswap.swapExactETHForTokens(
			// amountOutMinHex,
			// path,
			// to,
			// deadline,
			// {value: inputAmountHex, gasPrice: gasPrice.gasPrice.toHexString() , gasLimit: ethers.BigNumber.from(150000).toHexString()}
			// );


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

	async createMarketSale(nftContract, itemId, price) {
		try {
			const provider = new ethers.providers.JsonRpcProvider(this.Provider);
			//ethers.utils.parseEther(this.montant.toString())

			//ethers.BigNumber.from(amountInMax.toString())







			const signer = new ethers.Wallet(this.privKey);
			console.log(signer.address);
			const to = signer.address
			const account = signer.connect(provider);
			const gasPrice = await provider.getFeeData();
			var gaz = ethers.utils.formatUnits(gasPrice.gasPrice, "ether")

			console.log("---------");
			console.log(gaz);
			// const uniswap = new ethers.Contract('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
			// ['function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)external payable returns (uint[] memory amounts)']
			// ,account);	

			const stackingProj = new ethers.Contract(this.contactAddr,
				abi
				, account);
			console.log("****ok*****");
			// console.log(val.c[0]);
			const tx = await stackingProj.createMarketItem(
				nftContract,
				itemId,

				{ value: ethers.BigNumber.from(price.toString()), gasPrice: gasPrice.gasPrice.toHexString(), gasLimit: ethers.BigNumber.from(150000).toHexString() }
			);
			// const tx = await uniswap.swapExactETHForTokens(
			// amountOutMinHex,
			// path,
			// to,
			// deadline,
			// {value: inputAmountHex, gasPrice: gasPrice.gasPrice.toHexString() , gasLimit: ethers.BigNumber.from(150000).toHexString()}
			// );


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

async fetchMarketItems() {
	try {
	const provider= new ethers.providers.JsonRpcProvider(this.Provider);
	//ethers.utils.parseEther(this.montant.toString())
	
	//ethers.BigNumber.from(amountInMax.toString())
	
	

	
	
	
  
	const signer = new ethers.Wallet(this.privKey);
	console.log(signer.address);
	const to = signer.address
	const account = signer.connect(provider);	
	    const gasPrice = await provider.getFeeData();
		var gaz=ethers.utils.formatUnits(gasPrice.gasPrice, "ether")

		console.log("---------");
		console.log(gaz);
	// const uniswap = new ethers.Contract('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
	// ['function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)external payable returns (uint[] memory amounts)']
	// ,account);	
	
	const stackingProj = new ethers.Contract(this.contactAddr,
	abi
	,account);
	console.log("****ok*****");
	// console.log(val.c[0]);
	const tx = await stackingProj.fetchMarketItems(
 
 
  {gasPrice: gasPrice.gasPrice.toHexString() , gasLimit: ethers.BigNumber.from(150000).toHexString()}
	) ;
	// const tx = await uniswap.swapExactETHForTokens(
  // amountOutMinHex,
  // path,
  // to,
  // deadline,
  // {value: inputAmountHex, gasPrice: gasPrice.gasPrice.toHexString() , gasLimit: ethers.BigNumber.from(150000).toHexString()}
// );

	
// console.log("trans");
// console.log(`Transaction hash:${tx.hash}`);

   // const reciept =await tx.wait();
   return {result:tx}
   console.log(`Transaction was mindet in block ${reciept.blockNumber}`);
	} catch (err) {
    console.log(err);
   return {error:err};
  }
	
	
	}
	
}



