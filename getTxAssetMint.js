const axios = require('axios');

const getInfo = async () => {

	try{

		const msgType = "&msgType=mint"
		const dateRange = "&fromDate=2021-01-01&toDate=2022-03-31" + msgType;
		//https://service-explorer.figure.tech:443/api/v2/txs/module/ASSET?page=1&count=200&fromDate=2021-06-01&toDate=2022-06-30
		const resp = await axios.get("https://service-explorer.figure.tech:443/api/v2/txs/module/ASSET?page=1&count=200" + dateRange);
    if(resp.data.pages){
			const pages = resp.data.pages;
			for(let i = 1; i <= pages; i++){
				const resp2 = await axios.get("https://service-explorer.figure.tech:443/api/v2/txs/module/ASSET?page="+i+"&count=200" + dateRange);
				
				resp2.data.results.forEach(async function(data, index) {
					const txHash = data.txHash;
				  const time = data.time;
					const resp3 = await axios.get("https://service-explorer.figure.tech:443/api/v2/txs/"+txHash+"/json");
					const message = resp3.data.tx.body.messages[0];
					const amount = message.amount.amount;
					const denom = message.amount.denom;
					const administrator = message.administrator;

					console.log( i + ";" + txHash + ";" + time + ";" + denom + ";" + amount + ";" + administrator);
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
