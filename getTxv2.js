const axios = require('axios');

const url = "https://service-explorer.figure.tech:443/api/v2/txs/height/";//"https://service-explorer.figure.tech:443/api/v2/blocks/height/";

//https://service-explorer.figure.tech:443/api/v2/txs/height/6495800


let amountOfTx;

const start = 6489580;//6510000;//6496000 ; //6210000;
const end   = 6495999;//6510295;//6496635;  //6496455;

let totalTx0 = 0;
let timeInit = 0;
let timeFinal = 0;


const getInfo = async () => {

	try{
		const resp = await axios.get("https://service-explorer.figure.tech:443/api/v2/txs/recent?page=1&count=200&fromDate=2022-01-01&toDate=2022-01-31");
    if(resp.data.pages){
			const pages = resp.data.pages;
			for(let i = 1; i <= pages; i++){
				const resp2 = await axios.get("https://service-explorer.figure.tech:443/api/v2/txs/recent?page="+i+"&count=200&fromDate=2022-06-01&toDate=2022-06-30");
				resp2.data.results.forEach(function(data, index) {
					const txHash = data.txHash;
					const displayMsgType = data.msg.displayMsgType;
					const msgCount = data.msg.msgCount;
					const feepayer = data.feepayer.address;
				  const feeAmount = data.fee.amount;
					const feeName = data.fee.denom;
					const signer = data.signers.signers[0];
					const status = data.status;

					console.log(txHash + ";" + displayMsgType + ";" + msgCount + ";" + feepayer + ";" + feeAmount + ";" + feeName + ";" + signer + ";" + status); 
				})
			}
		}	
	}
	catch(err){
		console.error(err)
	}
}

module.exports = {
  getInfo
};

getInfo();
