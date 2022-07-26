const axios = require('axios');

const getInfo = async () => {

	try{

		const msgType = "&msgType=withdraw"
		const dateRange = "&fromDate=2021-01-01&toDate=2022-07-23" + msgType;
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
					const messages = resp3.data.tx.body.messages;
					///console.log(messages)

					messages.forEach(function(msg){
						//console.log(msg)

							const result = [];
							const keys = Object.keys(msg);

							const msgType = msg[keys[0]];

							if(msgType !== "/provenance.metadata.v1.MsgWriteScopeRequest"){
								const amount = msg.amount[0].amount;
								const denom = msg.amount[0].denom;
								const toAddress = msg.toAddress;
								const administrator = msg.administrator;
								const fromAddress = msg.fromAddress;

								console.log( i + ";" + txHash + ";" + time + ";" + msgType + ";" + amount + ";" + denom + ";" + toAddress + ";" + administrator + ";" + fromAddress );

							}


					})
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
