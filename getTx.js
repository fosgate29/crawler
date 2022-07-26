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
		for(let i = start; i <= end; i++){
			const resp = await axios.get(url + i);
			//console.log(resp.data);

			if(resp.data.results){
				resp.data.results.forEach(async function(data, index) {
					const txHash = data.txHash;
					const displayMsgType = data.msg.displayMsgType;
					const feepayer = data.feepayer.address;
				
					console.log(txHash + ";" + displayMsgType + ";" + feepayer);
				});
			}
			/*totalTx0 += resp.data.txNum;
			if(timeInit == 0){
				timeInit = resp.data.time;
			}

			timeFinal = resp.data.time;*/
			//console.log("Processing block");
		}

		
	}
	catch(err){
		console.error(err)
	}

	console.log(totalTx0)
	console.log(timeInit)
	console.log(timeFinal)
}

module.exports = {
  getInfo
};

getInfo();
