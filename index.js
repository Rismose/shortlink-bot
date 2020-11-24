require('dotenv').config();
const Eris = require("eris"),
client = new Eris(process.env.token),
fetch = require('node-fetch');

client.on("ready", () => {
    console.log("Ready!");
});

client.on("messageCreate", (msg) => {
	if(msg.content.startsWith(process.env.prefix+'help')) {
		client.createMessage(msg.channel.id, {"embed":{"title":"Commands", "fields": [{"name":"help", "value": "Displays help. Usage: help"}, {"name":"linkvertise", "value": "Bypasses linkvertise link. Usage: linkvertise [link]"}]}})
	}
    if(msg.content.startsWith(process.env.prefix+'linkvertise ')) {
    	if(!msg.content.split(' ')[1].includes('http') & !msg.content.split(' ')[1].includes('://')) return client.createMessage(msg.channel.id, "Not a valid linkvertise link.").then(msg=>setTimeout(()=>msg.delete(),3000)); //catch if not a link at all.
    	let path = new URL(msg.content.split(' ')[1]).pathname //get path
    	if(path=="/") return client.createMessage(msg.channel.id, "Not a valid linkvertise link.").then(msg=>setTimeout(()=>msg.delete(),3000)); //catch if no path
    	msg.channel.sendTyping();
    	fetch('https://publisher.linkvertise.com/api/v1/redirect/link/static'+path)
    	.then(res=>res.json())
    	.then(json=>{
    		serial = Buffer.from(JSON.stringify({
    			"timestamp": new Date().getTime(),
    			"random": "6548307",
    			"link_id": json.data.link.id
    		}), 'utf-8').toString('base64'); //get link id, make serial and convert to base64
    		let favicon = json.data.link.favicon_url
    		fetch('https://publisher.linkvertise.com/api/v1/redirect/link'+path+'/target?serial='+serial) //get link
    		.then(res1=>res1.json())
    		.then(json1=>{
    			let bypassedLink = new URLSearchParams(new URL(json1.data.target).search).get('k'), //bypassed link
    			embed = {
					"embed": {
					        "title": "Bypassed the link sucessfully.",
					        "color": 1964014,
					        "footer": {
					            "icon_url": "https://avatars1.githubusercontent.com/u/62519659?s=460&u=4b87fac26aca329573e0ef1fa98502e44e78ee97&v=4",
					            "text": "github @ respecting/linkvertise-bot, code derived from thebypasser.com"
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