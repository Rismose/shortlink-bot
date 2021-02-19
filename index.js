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
let status = 1;

function createBypassEmbed(url, bypassedUrl, time, msg, id) {
    client.createMessage(id, {
        "embed": {
            "title": `Bypass sent!`,
            "color": 1964014,
            "footer": {
                "icon_url": "https://avatars1.githubusercontent.com/u/62519659?s=460&u=4b87fac26aca329573e0ef1fa98502e44e78ee97&v=4",
                "text": `github @ respecting/shortlink-bot`
            },
            "author": {
                "name": "Shortlink Bot",
                "url": "https://github.com/respecting/shortlink-bot",
                "icon_url": "https://cdn.discordapp.com/avatars/780857188171644962/0344f614c6e85bef212f77d24631c631.webp?size=128"
            },
            "description": "See your DMs for your bypassed link."
        }
    }).then(msg=>setTimeout(()=>msg.delete(),5000))
    return msg.createMessage({
        "embed": {
            "title": `Bypassed the link successfully in ${new Date().getTime()-time} ms.`,
            "color": 1964014,
            "footer": {
                "icon_url": "https://avatars1.githubusercontent.com/u/62519659?s=460&u=4b87fac26aca329573e0ef1fa98502e44e78ee97&v=4",
                "text": `github @ respecting/shortlink-bot`
            },
            "author": {
                "name": "Shortlink Bot",
                "url": "https://github.com/respecting/shortlink-bot",
                "icon_url": "https://cdn.discordapp.com/avatars/780857188171644962/0344f614c6e85bef212f77d24631c631.webp?size=128"
            },
            "fields": [{
                    "name": "Original Link:",
                    "value": "[" + url.href + "](" + url.href + ")"
                },
                {
                    "name": "Bypassed Link:",
                    "value": "[" + bypassedUrl + "](" + bypassedUrl + ")"
                }
            ]
        }
    }).catch(()=>{
        createErrorEmbed("Please enable DMs.", id)
    })
}

function createErrorEmbed(errorInfo, id) {
    return client.createMessage(id, {
        "embed": {
            "title": "ERROR",
            "description": errorInfo,
            "color": 15158332,
            "footer": {
                "icon_url": "https://avatars1.githubusercontent.com/u/62519659?s=460&u=4b87fac26aca329573e0ef1fa98502e44e78ee97&v=4",
                "text": "github @ respecting/shortlink-bot"
            },
            "author": {
                "name": "Shortlink Bot",
                "url": "https://github.com/respecting/shortlink-bot",
                "icon_url": "https://cdn.discordapp.com/avatars/780857188171644962/0344f614c6e85bef212f77d24631c631.webp?size=128"
            }
        }
    }).then(msg=>setTimeout(()=>msg.delete(),3000))
}

client.on("ready", () => {
    console.log("Ready!");
    statusSwitch()
    setInterval(() => statusSwitch(), 30000)
});

function statusSwitch() {
    if (status == 1) {
        status = 2;
        client.editStatus("online", {
            name: `${process.env.prefix}bypass`,
            type: 2
        });
    } else if (status == 2) {
        status = 1;
        client.editStatus("online", {
            name: client.guilds.size + " guilds",
            type: 3
        });
    }
}

client.on('error', error => {
    console.warn('bot crashed due to ' + error)
});

function validateUrl(url, msg, id, author) {
    try {
        if (url.split(', ')[1]) {
            let urls = [...new Set(url.split(', '))].filter(Boolean);
            if (urls.length > 3) {
                    return createErrorEmbed("Provided too many links! (Limit is 3.)", id);
            }
            urls.forEach(url=>{
                url = new URL(url);
                if (ipLoggers.includes(url.host)) return createErrorEmbed(`The link provided (${myURL.host}) is an ip logger.`, id);
                bypass(url, msg, id, author)
            })
        } else {
            let myURL = new URL(url);
            if (ipLoggers.includes(myURL.host)) return createErrorEmbed(`The link provided (${myURL.host}) is an ip logger.`, id);
            bypass(myURL, msg, id, author);
        }
    } catch (e) {
        createErrorEmbed(`The link provided is invalid.`, id);
    }
}

async function bypass(url, msg, id, author) {
    try {
        author.delete().catch(()=>{createErrorEmbed('Please let me have access to Manage Messages so I can delete bypass commands.', id)});
        let timestamp = new Date().getTime(),
            resp = await fetch(url.href),
            html = await resp.text();
        if (url.hostname.includes("mboost.me")) return mboost(html, new URL(resp.url), msg, timestamp, id);
        if (html.includes('<title>Shrink your URLs and get paid!</title>')) return adfly(html, new URL(resp.url), msg, timestamp, id)
        if (html.includes(' - Sub2Unlock - ')) return s2u(new URL(resp.url), msg, html, timestamp, id);
        if (html.includes('<title>Boost.ink - Complete the steps to proceed</title>')) return boostink(html, new URL(resp.url), msg, timestamp, id);
        if (html.includes('<title>Loading... | Linkvertise</title>')) {
            if (url.href.includes("dynamic")) {
                return createBypassEmbed(url, Buffer.from(new URLSearchParams(url.search).get("r"), 'base64').toString('ascii'), timestamp, msg, id);
            }
            linkvertise(new URL(resp.url), msg, id);
        } else {
            if (url.href == new URL(resp.url)) return createErrorEmbed('The link provided is invalid.', id)
            createBypassEmbed(url, resp.url, timestamp, msg, id)
        }
    } catch {
        createErrorEmbed(`The link provided (${url.href}) is invalid.`, id)
    }
}



function boostink(html, url, msg, timestamp, id) {
    createBypassEmbed(url, Buffer.from(html.split('version=')[1].split('"')[1], 'base64').toString('ascii'), timestamp, msg, id)
}

function mboost(html, url, msg, timestamp, id) {
    createBypassEmbed(url, html.split('{"pageProps":{"data":{"targeturl":"')[1].split('"')[0], timestamp, msg, id)
}

function adfly(html, url, msg, timestamp, id) {
    let a, m, I = "",
        X = "",
        r = html.split(`var ysmm = `)[1].split('\'')[1]
    for (m = 0; m < r.length; m++) {
        if (m % 2 == 0) {
            I += r.charAt(m)
        } else {
            X = r.charAt(m) + X
        }
    }
    r = I + X
    a = r.split("")
    for (m = 0; m < a.length; m++) {
        if (!isNaN(a[m])) {
            for (var R = m + 1; R < a.length; R++) {
                if (!isNaN(a[R])) {
                    let S = a[m] ^ a[R]
                    if (S < 10) {
                        a[m] = S
                    }
                    m = R
                    R = a.length
                }
            }
        }
    }
    r = a.join('')
    r = Buffer.from(r, 'base64').toString('ascii');
    r = r.substring(r.length - (r.length - 16));
    r = r.substring(0, r.length - 16);
    createBypassEmbed(url, decodeURIComponent(r.split('dest=')[1]), timestamp, msg, id)
}

function s2u(url, msg, html, timestamp, id) {
    createBypassEmbed(url, html.split('<div id="theGetLink" style="display: none">')[1].split('</div>')[0], timestamp, msg, id)
}

function linkvertise(url, message, id, msg) {
    let ping = new Date().getTime(),
    path = `/${url.pathname.replace('/download','').split('/')[1]}/${url.pathname.replace('/download','').split('/')[2]}`;
    fetch('https://publisher.linkvertise.com/api/v1/redirect/link/static' + path, {
        headers: {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1"
        }
    }).catch(()=>createErrorEmbed('Linkvertise is ratelimited. Contact the bot developer.')).then(r => r.json()).then(json => {
        o = Buffer.from(JSON.stringify({
            "timestamp": new Date().getTime(),
            "random": "6548307",
            "link_id": json.data.link.id
        }), 'utf-8').toString('base64'); //get link id, make serial and convert to base64
    }).then(() => {
        fetch('https://publisher.linkvertise.com/api/v1/redirect/link' + path + '/target?serial=' + o, {
            headers: {
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1"
            }
        }).catch(()=>createErrorEmbed('Linkvertise is ratelimited. Contact the bot developer.')).then(r => r.json()).then(json => {
            if (msg) return client.createMessage(msg.channel.id, {
                "embed": {
                    "title": "Ping",
                    "fields": [{
                        "name": "Discord API (inaccurate?)",
                        "value": msg.createdAt - ping + " ms"
                    }, {
                        "name": "Linkvertise Bypass",
                        "value": new Date().getTime() - ping + " ms"
                    }]
                }
            })
            let bypassedLink = json.data.target; //bypassed link
            createBypassEmbed(url, bypassedLink, ping, message, id) //send message
        })
    })
}

client.on("messageCreate", (msg) => {
    if (msg.content.startsWith(process.env.prefix + 'ping')) {
        msg.channel.sendTyping();
        linkvertise(new URL("https://up-to-down.net/180849/respecting"), 1, 1, msg);
    }
    if (msg.content.startsWith(process.env.prefix + 'help')) {
        client.createMessage(msg.channel.id, {
            "embed": {
                "title": "Commands",
                "fields": [{
                    "name": "help",
                    "value": "Displays help. Usage: `help`"
                }, {
                    "name": "invite",
                    "value": "Displays the invite to the bot. Usage: `invite`"
                }, {
                    "name": "bypass",
                    "value": "Get what's behind the shortlink. Usage: `bypass link[, link[, link]]` (brackets mean optional)"
                }, {
                    "name": "ping",
                    "value": "Get the ping for the bot & the linkvertise bypass. Usage: `ping`"
                }],
                "author": {
                    "name": "Shortlink Bot",
                    "url": "https://github.com/respecting/shortlink-bot",
                    "icon_url": "https://cdn.discordapp.com/avatars/780857188171644962/0344f614c6e85bef212f77d24631c631.webp?size=128"
                }
            }
        })
    }
    if (msg.content.startsWith(process.env.prefix + 'invite')) {
        client.createMessage(msg.channel.id, {
            "embed": {
                "title": "Invite",
                "description": "[Click me!](https://discord.com/oauth2/authorize?client_id=780857188171644962&scope=bot&permissions=8192)",
                "author": {
                    "name": "Shortlink Bot",
                    "url": "https://github.com/respecting/shortlink-bot",
                    "icon_url": "https://cdn.discordapp.com/avatars/780857188171644962/0344f614c6e85bef212f77d24631c631.webp?size=128"
                }
            }
        })
    }
    if (msg.content.startsWith(process.env.prefix + 'bypass')) {
        if (!msg.content.includes(' ')) return createErrorEmbed(`No link was provided. Usage: \`bypass link[, link[, link]]\` (brackets mean optional)`, msg.channel.id)
        msg.channel.sendTyping();
        msg.author.getDMChannel().then(chan=>validateUrl(msg.content.replace(process.env.prefix + 'bypass ', ''), chan, msg.channel.id, msg))
    }
});
client.connect();