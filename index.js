require('dotenv').config();
const Eris = require("eris"),
client = new Eris(process.env.token),
fetch = require('node-fetch'),
ipLoggers = [
		"viral.over-blog.com",
		"gyazo.in",
		"ps3cfw.com",
		"urlz.fr",
		"webpanel.space",
		"steamcommumity.com",
		"imgur.com.de",
		"fuglekos.com",
		"grabify.link",
		"leancoding.co",
		"stopify.co",
		"freegiftcards.co",
		"joinmy.site",
		"curiouscat.club",
		"catsnthings.fun",
		"catsnthings.com",
		"xn--yutube-iqc.com",
		"gyazo.nl",
		"yip.su",
		"iplogger.com",
		"iplogger.org",
		"iplogger.ru",
		"2no.co",
		"02ip.ru",
		"iplis.ru",
		"iplo.ru",
		"ezstat.ru",
		"whatstheirip.com",
		"hondachat.com",
		"bvog.com",
		"youramonkey.com",
		"pronosparadise.com",
		"freebooter.pro",
		"blasze.com",
		"blasze.tk",
		"ipgrab.org",
		"gyazos.com",
		"discord.kim"
];

client.on("ready", () => {
    console.log("Ready!");
    client.editStatus("online", {name: `${process.env.prefix}bypass`, type: 2});
});

client.on('error', error => {
  console.warn('bot crashed due to '+error)
});

function validateUrl(url, id) {
  try {
        let myURL = new URL(url);
        if(ipLoggers.includes(myURL.host)) return client.createMessage(id, {"embed": {"title": "ERROR", "description": `The link given (${myURL.host}) is an ip logger.`,"color": 15158332, "footer":{"icon_url":"https://avatars1.githubusercontent.com/u/62519659?s=460&u=4b87fac26aca329573e0ef1fa98502e44e78ee97&v=4","text":"github @ respecting/shortlink-bot, code derived from Sainan/Universal-Bypass"},"author":{"name":"Shortlink Bot","url":"https://github.com/respecting/shortlink-bot"}}});
        bypass(myURL, id);
    } catch (e) {
    		client.createMessage(id, {"embed": {"title": "ERROR", "description": `The link given (${url.href}) is invalid.`,"color": 15158332, "footer":{"icon_url":"https://avatars1.githubusercontent.com/u/62519659?s=460&u=4b87fac26aca329573e0ef1fa98502e44e78ee97&v=4","text":"github @ respecting/shortlink-bot, code derived from Sainan/Universal-Bypass"},"author":{"name":"Shortlink Bot","url":"https://github.com/respecting/shortlink-bot"}}})
    }
}
async function bypass(url, id) {
    try {
        let resp = await fetch(url.href)
        let html = await resp.text()
        if(html.includes('<title>Loading... | Linkvertise</title>')) linkvertise(url, id); else {client.createMessage(id, {"embed":{"title":"Bypassed the link sucessfully.","color":1964014,"footer":{"icon_url":"https://avatars1.githubusercontent.com/u/62519659?s=460&u=4b87fac26aca329573e0ef1fa98502e44e78ee97&v=4","text":"github @ respecting/shortlink-bot, code derived from Sainan/Universal-Bypass"},"author":{"name":"Shortlink Bot","url":"https://github.com/respecting/shortlink-bot"},"fields":[{"name":"Original Link:","value":"["+url.href+"]("+url.href+")"},{"name":"Bypassed Link:","value":"["+resp.url+"]("+resp.url+")"}]}})}
    } catch {
        client.createMessage(id, {"embed": {"title": "ERROR", "description": `The link given (${url.href}) is invalid.`,"color": 15158332, "footer":{"icon_url":"https://avatars1.githubusercontent.com/u/62519659?s=460&u=4b87fac26aca329573e0ef1fa98502e44e78ee97&v=4","text":"github @ respecting/shortlink-bot, code derived from Sainan/Universal-Bypass"},"author":{"name":"Shortlink Bot","url":"https://github.com/respecting/shortlink-bot"}}})
    }
}

function linkvertise(url, id) {
	let path = url.pathname
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
					            "text": "github @ respecting/shortlink-bot, code derived from Sainan/Universal-Bypass"
					        },
					        "thumbnail": {
					            "url": favicon
					        },
					        "author": {
					            "name": "Shortlink Bot",
					            "url": "https://github.com/respecting/shortlink-bot"
					        },
					        "fields": [{
					                "name": "Original Link:",
					                "value": "["+url.href+"]("+url.href+")"
					            },
					            {
					                "name": "Bypassed Link:",
					                "value": "["+bypassedLink+"]("+bypassedLink+")"
					            }
					        ]
					    }
					}; //embed
    			client.createMessage(id, embed); //send message
    		})
    	})
}

client.on("messageCreate", (msg) => {
	if(msg.content.startsWith(process.env.prefix+'help')) {
		client.createMessage(msg.channel.id, {"embed":{"title":"Commands", "fields": [{"name":"help", "value": "Displays help. Usage: `help`"}, {"name":"invite", "value": "Displays the invite to the bot. Usage: `invite`"}, {"name":"bypass", "value": "Get what's behind the shortlink. Usage: `bypass [link]`"}], "author": {"name": "Shortlink Bot","url": "https://github.com/respecting/shortlink-bot"}}})
	}
	if(msg.content.startsWith(process.env.prefix+'invite')) {
		client.createMessage(msg.channel.id, {"embed":{"title":"Invite", "description": "[Click me!](https://discord.com/oauth2/authorize?client_id=780857188171644962&scope=bot&permissions=8)", "author": {"name": "Shortlink Bot","url": "https://github.com/respecting/shortlink-bot"}}})
	}
    if(msg.content.startsWith(process.env.prefix+'bypass')) {
    	if(!msg.content.includes(' ')) return client.createMessage(msg.channel.id, {"embed":{"title": `Usage`, "description": "`bypass [link]`"}}).then(msg=>setTimeout(()=>msg.delete(),3000));
    	msg.channel.sendTyping();
    	validateUrl(msg.content.split(' ')[1], msg.channel.id)
    }
});
client.connect();