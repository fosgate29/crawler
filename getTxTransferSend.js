const axios = require('axios');

const getInfo = async () => {

	try{

		const msgType = "&msgType=send"
		const dateRange = "&fromDate=2022-05-01&toDate=2022-05-31" + msgType;
		
		const resp = await axios.get("https://service-explorer.figure.tech:443/api/v2/txs/module/TRANSFER?page=1&count=200" + dateRange);
    if(resp.data.pages){
			const pages = resp.data.pages;
			for(let i = 1; i <= pages; i++){
				const resp2 = await axios.get("https://service-explorer.figure.tech:443/api/v2/txs/module/TRANSFER?page="+i+"&count=200" + dateRange);
				
				resp2.data.results.forEach(async function(data, index) {
					const txHash = data.txHash;
				  const time = data.time;
					const resp3 = await axios.get("https://service-explorer.figure.tech:443/api/v2/txs/"+txHash+"/json");
					//console.log(resp3.data.tx)

					const message = resp3.data.tx.body.messages[0];
					const amount = message.amount[0].amount;
					const denom = message.amount[0].denom;
					const from = message.fromAddress;
					const to = message.toAddress;

					console.log( i + ";" + txHash + ";" + time + ";" + denom + ";" + amount + ";" + from + ";" + to);
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
