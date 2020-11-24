require('dotenv').config();
const Eris = require("eris"),
client = new Eris(process.env.token),
fetch = require('node-fetch');

client.on("ready", () => {
    console.log("Ready!");
    client.editStatus("online", {name: `${process.env.prefix}bypass`, type: 2});
});

client.on('error', error => {
  console.warn('bot crashed due to '+error)
});

client.on("messageCreate", (msg) => {
	if(msg.content.startsWith(process.env.prefix+'help')) {
		client.createMessage(msg.channel.id, {"embed":{"title":"Commands", "fields": [{"name":"help", "value": "Displays help. Usage: `help`"}, {"name":"bypass", "value": "Bypasses a linkvertise link. Usage: `bypass [link]`"}]}})
	}
    if(msg.content.startsWith(process.env.prefix+'bypass')) {
    	if(!msg.content.includes(' ')) return client.createMessage(msg.channel.id, {"embed":{"title": `Usage`, "description": "`bypass [link]`"}}).then(msg=>setTimeout(()=>msg.delete(),3000));
    	if(!msg.content.split(' ')[1].includes('http') & !msg.content.split(' ')[1].includes('://')) return client.createMessage(msg.channel.id, {"embed":{"title": `Usage`, "description": "`bypass [link]`"}}).then(msg=>setTimeout(()=>msg.delete(),3000)); //catch if not a link at all.
    	let path = new URL(msg.content.split(' ')[1]).pathname //get path
    	if(path=="/") return client.createMessage(msg.channel.id, {"embed":{"title": `Usage`, "description": "`bypass [link]`"}}).then(msg=>setTimeout(()=>msg.delete(),3000)); //catch if no path
    	msg.channel.sendTyping();
    	fetch('https://publisher.linkvertise.com/api/v1/redirect/link/static'+path)
    	.then(r=>r.json())
    	.then(json=>{
    		o = Buffer.from(JSON.stringify({
    			"timestamp": new Date().getTime(),
    			"random": "6548307",
    			"link_id": json.data.link.id
    		}), 'utf-8').toString('base64'); //get link id, make serial and convert to base64
    		let favicon = json.data.link.favicon_url
    		fetch('https://publisher.linkvertise.com/api/v1/redirect/link'+path+'/target?serial='+o) //get link
    		.then(r=>r.json())
    		.then(json=>{
    			let bypassedLink = new URLSearchParams(new URL(json.data.target).search).get('k'), //bypassed link
    			embed = {
					"embed": {
					        "title": "Bypassed the link sucessfully.",
					        "color": 1964014,
					        "footer": {
					            "icon_url": "https://avatars1.githubusercontent.com/u/62519659?s=460&u=4b87fac26aca329573e0ef1fa98502e44e78ee97&v=4",
					            "text": "github @ respecting/linkvertise-bot, code derived from Sainan/Universal-Bypass"
					        },
					        "thumbnail": {
					            "url": favicon
					        },
					        "author": {
					            "name": "Linkvertise Bypass",
					            "url": "https://github.com/respecting/linkvertise-bot",
					            "icon_url": "https://i.imgur.com/601T9uY.png"
					        },
					        "fields": [{
					                "name": "Original Link:",
					                "value": "["+msg.content.split(' ')[1]+"]("+msg.content.split(' ')[1]+")"
					            },
					            {
					                "name": "Bypassed Link:",
					                "value": "["+bypassedLink+"]("+bypassedLink+")"
					            }
					        ]
					    }
					}; //embed
    			client.createMessage(msg.channel.id, embed); //send message
    		})
    	})
    }
});
client.connect();