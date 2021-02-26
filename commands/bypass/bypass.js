const {Command} = require('discord.js-commando'),
    ProxyAgent = require('proxy-agent'),
    fs = require('fs');
require("dotenv").config();

module.exports = class BypassCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'bypass',
            aliases: ['bp', 'b'],
            group: 'bypass',
            memberName: 'bypass',
            description: 'Finds what is behind the shortlink.',
            throttling: {
                usages: 5,
                duration: 30,
            },
            args: [{
                key: 'link',
                prompt: 'What link would you like to bypass?',
                type: 'string'
            }, ]
        });
    }
    run(msg, {
        link
    }) {
        msg.channel.startTyping();
        const ipLoggers = [
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
            ],
            fetch = require('node-fetch');

        let o;

        function createBypassEmbed(url, bypassedUrl, time) {
            msg.channel.stopTyping()
            msg.author.send({
                embed: {
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
            }).catch(err => {
                createErrorEmbed("Please enable DMs.")
            })
            if (msg.channel.type != "dm") msg.embed({
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
            }).then(msg => setTimeout(() => msg.delete(), 5000))
        }

        function createErrorEmbed(errorInfo) {
            msg.channel.stopTyping()
            return msg.embed({
                "title": "ERROR",
                "description": errorInfo,
                "color": 15158332,
                "footer": {
                    "icon_url": "https://avatars1.githubusercontent.com/u/62519659?s=460&u=4b87fac26aca329573e0ef1fa98502e44e78ee97&v=4",
                    "text": `Join our support server! https://discord.gg/${process.env.invite}`
                },
                "author": {
                    "name": "Shortlink Bot",
                    "url": "https://github.com/respecting/shortlink-bot",
                    "icon_url": "https://cdn.discordapp.com/avatars/780857188171644962/0344f614c6e85bef212f77d24631c631.webp?size=128"
                }
            }).then(msg => setTimeout(() => msg.delete(), 5000))
        }

        function validateUrl(url) {
            try {
                url = url + " "
                let urls = [...new Set(url.split(' '))].filter(Boolean);
                if (urls.length > 3) {
                    return createErrorEmbed("Provided too many links! (Limit is 3.)");
                }
                urls.forEach(url => {
                    url = new URL(url);
                    if (ipLoggers.includes(url.host)) return createErrorEmbed(`The link provided (${url.host}) is an ip logger.`);
                    bypass(url)
                })
            } catch (e) {
                createErrorEmbed(`The link provided is invalid.`);
            }
        }

        function adshrinkit(html, url, msg, timestamp) {
            createBypassEmbed(url, html.split('url\\":\\"')[1].split('\\\",')[0].replace(/\\/g, ""), timestamp, msg)
        }

        function boostink(html, url, msg, timestamp) {
            createBypassEmbed(url, Buffer.from(html.split('version=')[1].split('"')[1], 'base64').toString('ascii'), timestamp, msg)
        }

        function mboost(html, url, msg, timestamp) {
            createBypassEmbed(url, html.split('{"pageProps":{"data":{"targeturl":"')[1].split('"')[0], timestamp, msg)
        }

        function adfly(html, url, msg, timestamp) {
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
            if (new URL(r).search.includes("dest=")) return createBypassEmbed(url, decodeURIComponent(r.split('dest=')[1]), timestamp, msg)
            createBypassEmbed(url, r, timestamp, msg)
        }

        function s2u(url, msg, html, timestamp) {
            createBypassEmbed(url, html.split('<div id="theGetLink" style="display: none">')[1].split('</div>')[0], timestamp, msg)
        }

        function linkvertise(url) {
            let randomProxy = fs.readFileSync('proxies').toString().split("\n")
            randomProxy = randomProxy[Math.floor(Math.random() * randomProxy.length)]
            let ping = new Date().getTime(),
                path = `/${url.pathname.replace('/download','').split('/')[1]}/${url.pathname.replace('/download','').split('/')[2]}`;
            fetch('https://publisher.linkvertise.com/api/v1/redirect/link/static' + path, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1"
                },
                agent: new ProxyAgent(randomProxy)
            }).then(r => r.json().catch(() => createErrorEmbed('Linkvertise is ratelimited, or the supplied link was invalid. Try another one, and if it happens again, contact the bot developer.', msg))).then(json => {
                if (json._idleTimeout) return;
                o = Buffer.from(JSON.stringify({
                    "timestamp": new Date().getTime(),
                    "random": "6548307",
                    "link_id": json.data.link.id
                }), 'utf-8').toString('base64'); //get link id, make serial and convert to base64
            }).then(() => {
                if (!o) return;
                fetch('https://publisher.linkvertise.com/api/v1/redirect/link' + path + '/target?serial=' + o, {
                    headers: {
                        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1"
                    },
                    agent: new ProxyAgent(randomProxy)
                }).then(r => r.json().catch(() => createErrorEmbed('Linkvertise is ratelimited. Contact the bot developer.', msg))).then(json => {
                    let bypassedLink = json.data.target; //bypassed link
                    createBypassEmbed(url, bypassedLink, ping)
                })
            })
        }

        async function bypass(url) {
            try {
                if (!msg.channel.type === 'dm') msg.delete().catch(() => {
                    createErrorEmbed('Please let me have access to Manage Messages so I can delete bypass commands.', originalCommand)
                });
                let timestamp = new Date().getTime(),
                    resp = await fetch(url.href),
                    html = await resp.text();
                if (url.hostname.includes("mboost.me")) return mboost(html, new URL(resp.url), msg, timestamp);
                if (html.includes('<meta name="description" content="Shrink your URLs and get paid!" />')) return adfly(html, new URL(resp.url), msg, timestamp)
                if (html.includes(' - Sub2Unlock - ')) return s2u(new URL(resp.url), msg, html, timestamp);
                if (html.includes('<title>Boost.ink - Complete the steps to proceed</title>')) return boostink(html, new URL(resp.url), msg, timestamp);
                if (html.includes('<title>AdShrink.it - </title>')) return adshrinkit(html, new URL(resp.url), msg, timestamp);
                if (html.includes('<title>Loading... | Linkvertise</title>')) {
                    if (url.href.includes("dynamic")) {
                        return createBypassEmbed(url, Buffer.from(new URLSearchParams(url.search).get("r"), 'base64').toString('ascii'), timestamp);
                    }
                    linkvertise(new URL(resp.url));
                } else {
                    if (url.href == new URL(resp.url)) return createErrorEmbed('The link provided is invalid.')
                    createBypassEmbed(url, resp.url, timestamp, msg)
                }
            } catch (err) {
                createErrorEmbed(`The link provided (${url.href}) is invalid.`)
            }
        }
        validateUrl(link)
    }

};