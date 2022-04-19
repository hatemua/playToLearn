const express = require('express')

const Web3 = require('web3');
const app = express();
let marketplace = require('./utils/marketplace');
const { ethers, Wallet } = require("ethers");
const game = require('./utils/game');
const nftoken = require('./utils/nft')
const eytoken = require('./utils/eytoken')

const marketplaceAddress = "0xdFfb4189290658c19b9294044B680D90cE36Ee99";
const gameAddress = "0xcc555996f358926A6f928b19D56484FE815826EB";
const nftAddress = "0x401C5292327a76492C9303ca3C976661326Bf739";
const tokenAddress = "0xbFcF3CBA4fe946101d1E407d4f55DE143ca38391";
app.use(express.json())

app.get('/CreateWallet', (req, res) => {

	// var web3 = new Web3(new Web3.providers.HttpProvider('https://polygon-rpc.com'));
	// A=web3.eth.accounts.create("87h0u74+-*/");
	// var A=web3.eth.accounts.wallet.load("87h0u74+-*/");

	// res.end( JSON.stringify(A));
	const Provider = req.body.Provider;
	// const providerMumbai = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/");
	const providerMumbai = new ethers.providers.JsonRpcProvider(Provider);

	const pureWallet = ethers.Wallet.createRandom();
	console.log(pureWallet._mnemonic().phrase);
	console.log(pureWallet._signingKey());
	console.log({ pureWallet });

	const wallet = new Wallet(pureWallet, providerMumbai);
	res.end(JSON.stringify(wallet));
})



app.post('/createMarketItem', (req, res) => {

	// var web3 = new Web3(new Web3.providers.HttpProvider('https://polygon-rpc.com'));
	// A=web3.eth.accounts.create("87h0u74+-*/");
	// var A=web3.eth.accounts.wallet.load("87h0u74+-*/");

	// res.end( JSON.stringify(A));
	const Provider = req.body.Provider;
	const contractAddr = marketplaceAddress;
	const privKey = req.body.privKey;
	const nftContract = req.body.nftContract;
	const tokenId = req.body.tokenId;
	const price = req.body.price;

	// const providerMumbai= new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");
	const market = new marketplace(contractAddr, Provider, privKey);
	market.createMarketItem(nftContract, tokenId, price).then((resp) => {
		// convert a currency unit from wei to ether
		res.end(JSON.stringify(resp));
	})


})
app.post('/getTransactionStatus', (req,res) => {
	
	// var web3 = new Web3(new Web3.providers.HttpProvider('https://polygon-rpc.com'));
	// A=web3.eth.accounts.create("87h0u74+-*/");
	// var A=web3.eth.accounts.wallet.load("87h0u74+-*/");

    // res.end( JSON.stringify(A));
	const Provider = req.body.Provider;
	const tx = req.body.tx;
	
	
	// const providerMumbai= new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");
	var web3 = new Web3(new Web3.providers.HttpProvider(Provider));
    
	// const provider= new ethers.providers.JsonRpcProvider(Provider);
	//ethers.utils.parseEther(this.montant.toString())
	
	//ethers.BigNumber.from(amountInMax.toString())
	
	status="";

	    web3.eth.getTransactionReceipt(tx, (err, txReceipt)=>{
     if (txReceipt)
	 {
	   status="success"
	 }
	 else
	 {
		status="pending"
	 }
     res.end( JSON.stringify({status:status}));

    })
	
	
})
app.post('/createMarketSale', (req, res) => {

	// var web3 = new Web3(new Web3.providers.HttpProvider('https://polygon-rpc.com'));
	// A=web3.eth.accounts.create("87h0u74+-*/");
	// var A=web3.eth.accounts.wallet.load("87h0u74+-*/");

	// res.end( JSON.stringify(A));
	const Provider = req.body.Provider;
	const contractAddr = marketplaceAddress;
	const privKey = req.body.privKey;
	const nftContract = req.body.nftContract;
	const itemId = req.body.itemId;
	const price = req.body.price;

	// const providerMumbai= new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");
	const market = new marketplace(contractAddr, Provider, privKey);
	market.createMarketItem(nftContract, itemId, price).then((resp) => {
		// convert a currency unit from wei to ether
		res.end(JSON.stringify(resp));
	})


})

app.post('/fetchMarketItems', (req, res) => {

	// var web3 = new Web3(new Web3.providers.HttpProvider('https://polygon-rpc.com'));
	// A=web3.eth.accounts.create("87h0u74+-*/");
	// var A=web3.eth.accounts.wallet.load("87h0u74+-*/");

	// res.end( JSON.stringify(A));
	const Provider = req.body.Provider;
	const contractAddr = marketplaceAddress;
	const privKey = req.body.privKey;


	// const providerMumbai= new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");
	const market = new marketplace(contractAddr, Provider, privKey);
	market.fetchMarketItems().then((resp) => {
		// convert a currency unit from wei to ether
		res.end(JSON.stringify(resp));
	})


})

app.post('/startgame', (req, res) => {
	const Provider = req.body.Provider;
	const contractAddr = gameAddress;
	const privKey = req.body.privKey;
	const gamecode = req.body.gamecode;
	const beforeMatchURI = req.body.beforeMatchURI;
	const opponenetAddrss = req.body.opponenetAddrss;
	const stake = req.body.stake;


	// const providerMumbai= new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");
	const gm = new game(contractAddr, Provider, privKey);
	gm.startGame(gamecode, beforeMatchURI, opponenetAddrss, stake).then((resp) => {
		// convert a currency unit from wei to ether
		res.end(JSON.stringify(resp));
	})

})

app.post("/withdraw", (req, res) => {

	const Provider = req.body.Provider;
	const contractAddr = gameAddress;
	const privKey = req.body.privKey;


	// const providerMumbai= new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");
	const gm = new game(contractAddr, Provider, privKey);
	gm.withdraw().then((resp) => {
		// convert a currency unit from wei to ether
		res.end(JSON.stringify(resp));
	})
})

app.post("/participateGame", (req, res) => {
	const Provider = req.body.Provider;
	const contractAddr = gameAddress;
	const privKey = req.body.privKey;
	const gameCode = req.body.gameCode;

	// const providerMumbai= new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");
	const gm = new game(contractAddr, Provider, privKey);
	gm.participateGame(gameCode).then((resp) => {
		// convert a currency unit from wei to ether
		res.end(JSON.stringify(resp));
	})
})

app.post("/endGame", (req, res) => {
	const Provider = req.body.Provider;
	const contractAddr = gameAddress;
	const privKey = req.body.privKey;
	const gameCode = req.body.gameCode;
	const afterMatchURI = req.body.afterMatchURI;
	const result = req.body.result;
	const gm = new game(contractAddr, Provider, privKey);
	gm.endGme(gameCode, afterMatchURI, result).then((resp) => {
		// convert a currency unit from wei to ether
		res.end(JSON.stringify(resp));
	})
})

app.post("/deposit", (req, res) => {
	const Provider = req.body.Provider;
	const contractAddr = gameAddress;
	const privKey = req.body.privKey;
	const price = req.body.amount;
	const gm = new game(contractAddr, Provider, privKey);
	gm.deposit(price).then((resp) => {
		// convert a currency unit from wei to ether
		res.end(JSON.stringify(resp));
	})
})
app.post("/airdropETH", (req, res) => {
	const Provider = req.body.Provider;
	const contractAddr = gameAddress;
	const privKey = req.body.privKey; //owner Private
	const price = req.body.amount;
	const user = req.body.userAddr;
	const gm = new game(contractAddr, Provider, privKey);
	gm.airdropETH(user,price).then((resp) => {
		// convert a currency unit from wei to ether
		res.end(JSON.stringify(resp));
	})
})

app.post("/getPlayerBalance", (req, res) => {
	const Provider = req.body.Provider;
	const contractAddr = gameAddress;
	const privKey = req.body.privKey;
	const playerAddress = req.body.playerAddress;
	const gm = new game(contractAddr, Provider, privKey);
	gm.getPlayerBalance(playerAddress).then((resp) => {
		// convert a currency unit from wei to ether
		res.end(JSON.stringify(resp));
	})
})

app.post("/getGameDetails", (req, res) => {
	const Provider = req.body.Provider;
	const contractAddr = gameAddress;
	const privKey = req.body.privKey;
	const gameCode = req.body.gameCode;
	const gm = new game(contractAddr, Provider, privKey);
	gm.getGameDetails(gameCode).then((resp) => {
		// convert a currency unit from wei to ether
		res.end(JSON.stringify(resp));
	})
})



app.post("/transferToken", (req, res) => {
	const Provider = req.body.Provider;
	const contractAddr = gameAddress;
	const privKey = req.body.privKey;   //PrivateOwner
	const toAddress = req.body.toAddress;
	const amount = req.body.amount;
	const gm = new game(contractAddr, Provider, privKey);
	gm.transferToken(toAddress, amount).then((resp) => {
		// convert a currency unit from wei to ether
		res.end(JSON.stringify(resp));
	})
})


app.post("/creategamenft", (req, res) => {
	const Provider = req.body.Provider;
	const contractAddr = nftAddress;
	const privKey = req.body.privKey;
	const tokenURI = req.body.tokenURI;
	const token = new nftoken(contractAddr, Provider, privKey);
	token.createToken(tokenURI).then((resp) => {
		// convert a currency unit from wei to ether
		res.end(JSON.stringify(resp));
	})
})

app.post("/transfernft", (req, res) => {
	const Provider = req.body.Provider;
	const contractAddr = nftAddress;
	const privKey = req.body.privKey;
	const fromAddress = req.body.fromAddress;
	const toAddress = req.body.toAddress;
	const tokenURI = req.body.tokenURI;
	const token = new nftoken(contractAddr, Provider, privKey);
	token.transferToken(fromAddress, toAddress, tokenURI).then((resp) => {
		// convert a currency unit from wei to ether
		res.end(JSON.stringify(resp));
	})
})
app.listen(8080, () => {
	console.log("Serveur à l'écoute port 8080")
})