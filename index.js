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

client.on("ready", () => {
    console.log("Ready!");
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

function validateUrl(url, id) {
    try {
        if (url.split(', ')[1]) {
            let urls = [...new Set(url.split(', '))].filter(Boolean);
            if (urls.length > 3) {
                return client.createMessage(id, {
                    "embed": {
                        "title": "ERROR",
                        "description": `Provided too many links! (Limit is 3.)`,
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
                });
            }
            urls.forEach(url=>{
                url = new URL(url);
                if (ipLoggers.includes(url.host)) return client.createMessage(id, {
                    "embed": {
                        "title": "ERROR",
                        "description": `The link provided (${myURL.host}) is an ip logger.`,
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
                });
                bypass(url, id)
            })
        } else {
            let myURL = new URL(url);
            if (ipLoggers.includes(myURL.host)) return client.createMessage(id, {
                "embed": {
                    "title": "ERROR",
                    "description": `The link provided (${myURL.host}) is an ip logger.`,
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
            });
            bypass(myURL, id);
        }
    } catch (e) {
        client.createMessage(id, {
            "embed": {
                "title": "ERROR",
                "description": `The link provided is invalid.`,
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
        })
    }
}

async function bypass(url, id) {
    try {
        let timestamp = new Date().getTime(),
            resp = await fetch(url.href),
            html = await resp.text();
        if (url.hostname.includes("mboost.me")) return mboost(html, new URL(resp.url), id, timestamp)
        if (html.includes('<title>Shrink your URLs and get paid!</title>')) return adfly(html, new URL(resp.url), id, timestamp)
        if (html.includes(' - Sub2Unlock - ')) return s2u(new URL(resp.url), id, html, timestamp);
        if (html.includes('<title>Boost.ink - Complete the steps to proceed</title>')) return boostink(html, new URL(resp.url), id, timestamp);
        if (html.includes('<title>Loading... | Linkvertise</title>')) {
            if (url.href.includes("dynamic")) {
                return client.createMessage(id, {
                    "embed": {
                        "title": "Bypassed the link sucessfully.",
                        "color": 1964014,
                        "footer": {
                            "icon_url": "https://avatars1.githubusercontent.com/u/62519659?s=460&u=4b87fac26aca329573e0ef1fa98502e44e78ee97&v=4",
                            "text": `github @ respecting/shortlink-bot, bypassed in ${new Date().getTime()-timestamp} ms`
                        },
                        "author": {
                            "name": "Shortlink Bot",
                            "url": "https://github.com/respecting/shortlink-bot",
                            "icon_url": "https://cdn.discordapp.com/avatars/780857188171644962/0344f614c6e85bef212f77d24631c631.webp?size=128"
                        },
                        "fields": [{
                            "name": "Original Link:",
                            "value": "[" + url.href + "](" + url.href + ")"
                        }, {
                            "name": "Bypassed Link:",
                            "value": "[" + Buffer.from(new URLSearchParams(url.search).get("r"), 'base64').toString('ascii') + "](" + Buffer.from(new URLSearchParams(url.search).get("r"), 'base64').toString('ascii') + ")"
                        }]
                    }
                })
            }
            linkvertise(new URL(resp.url), id);
        } else {
            if (url.href == new URL(resp.url)) return client.createMessage(id, {
                "embed": {
                    "title": "ERROR",
                    "description": `The link provided is invalid.`,
                    "color": 15158332,
                    "footer": {
                        "icon_url": "https://avatars1.githubusercontent.com/u/62519659?s=460&u=4b87fac26aca329573e0ef1fa98502e44e78ee97&v=4",
                        "text": "github @ respecting/shortlink-bot, code derived from Sainan/Universal-Bypass"
                    },
                    "author": {
                        "name": "Shortlink Bot",
                        "url": "https://github.com/respecting/shortlink-bot",
                        "icon_url": "https://cdn.discordapp.com/avatars/780857188171644962/0344f614c6e85bef212f77d24631c631.webp?size=128"
                    }
                }
            });
            client.createMessage(id, {
                "embed": {
                    "title": "Bypassed the link sucessfully.",
                    "color": 1964014,
                    "footer": {
                        "icon_url": "https://avatars1.githubusercontent.com/u/62519659?s=460&u=4b87fac26aca329573e0ef1fa98502e44e78ee97&v=4",
                        "text": `github @ respecting/shortlink-bot, bypassed in ${new Date().getTime()-timestamp} ms`
                    },
                    "author": {
                        "name": "Shortlink Bot",
                        "url": "https://github.com/respecting/shortlink-bot",
                        "icon_url": "https://cdn.discordapp.com/avatars/780857188171644962/0344f614c6e85bef212f77d24631c631.webp?size=128"
                    },
                    "fields": [{
                        "name": "Original Link:",
                        "value": "[" + url.href + "](" + url.href + ")"
                    }, {
                        "name": "Bypassed Link:",
                        "value": "[" + resp.url + "](" + resp.url + ")"
                    }]
                }
            })
        }
    } catch {
        client.createMessage(id, {
            "embed": {
                "title": "ERROR",
                "description": `The link provided (${url.href}) is invalid.`,
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
        })
    }
}



function boostink(html, url, id, timestamp) {
    client.createMessage(id, {
        "embed": {
            "title": "Bypassed the link sucessfully.",
            "color": 1964014,
            "footer": {
                "icon_url": "https://avatars1.githubusercontent.com/u/62519659?s=460&u=4b87fac26aca329573e0ef1fa98502e44e78ee97&v=4",
                "text": `github @ respecting/shortlink-bot, bypassed in ${new Date().getTime()-timestamp} ms`
            },
            "author": {
                "name": "Shortlink Bot",
                "url": "https://github.com/respecting/shortlink-bot",
                "icon_url": "https://cdn.discordapp.com/avatars/780857188171644962/0344f614c6e85bef212f77d24631c631.webp?size=128"
            },
            "fields": [{
                "name": "Original Link:",
                "value": "[" + url.href + "](" + url.href + ")"
            }, {
                "name": "Bypassed Link:",
                "value": "[" + Buffer.from(html.split('version=')[1].split('"')[1], 'base64').toString('ascii') + "](" + Buffer.from(html.split('version=')[1].split('"')[1], 'base64').toString('ascii') + ")"
            }]
        }
    })
}

function mboost(html, url, id, timestamp) {
    client.createMessage(id, {
        "embed": {
            "title": "Bypassed the link sucessfully.",
            "color": 1964014,
            "footer": {
                "icon_url": "https://avatars1.githubusercontent.com/u/62519659?s=460&u=4b87fac26aca329573e0ef1fa98502e44e78ee97&v=4",
                "text": `github @ respecting/shortlink-bot, bypassed in ${new Date().getTime()-timestamp} ms`
            },
            "author": {
                "name": "Shortlink Bot",
                "url": "https://github.com/respecting/shortlink-bot",
                "icon_url": "https://cdn.discordapp.com/avatars/780857188171644962/0344f614c6e85bef212f77d24631c631.webp?size=128"
            },
            "fields": [{
                "name": "Original Link:",
                "value": "[" + url.href + "](" + url.href + ")"
            }, {
                "name": "Bypassed Link:",
                "value": "[" + html.split('{"pageProps":{"data":{"targeturl":"')[1].split('"')[0] + "](" + html.split('{"pageProps":{"data":{"targeturl":"')[1].split('"')[0] + ")"
            }]
        }
    })
}

function adfly(html, url, id, timestamp) {
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
    client.createMessage(id, {
        "embed": {
            "title": "Bypassed the link sucessfully.",
            "color": 1964014,
            "footer": {
                "icon_url": "https://avatars1.githubusercontent.com/u/62519659?s=460&u=4b87fac26aca329573e0ef1fa98502e44e78ee97&v=4",
                "text": `github @ respecting/shortlink-bot, bypassed in ${new Date().getTime()-timestamp} ms`
            },
            "author": {
                "name": "Shortlink Bot",
                "url": "https://github.com/respecting/shortlink-bot",
                "icon_url": "https://cdn.discordapp.com/avatars/780857188171644962/0344f614c6e85bef212f77d24631c631.webp?size=128"
            },
            "fields": [{
                "name": "Original Link:",
                "value": "[" + url.href + "](" + url.href + ")"
            }, {
                "name": "Bypassed Link:",
                "value": "[" + decodeURIComponent(r.split('dest=')[1]) + "](" + decodeURIComponent(r.split('dest=')[1]) + ")"
            }]
        }
    })
}

function s2u(url, id, html, timestamp) {
    client.createMessage(id, {
        "embed": {
            "title": "Bypassed the link sucessfully.",
            "color": 1964014,
            "footer": {
                "icon_url": "https://avatars1.githubusercontent.com/u/62519659?s=460&u=4b87fac26aca329573e0ef1fa98502e44e78ee97&v=4",
                "text": `github @ respecting/shortlink-bot, bypassed in ${new Date().getTime()-timestamp} ms`
            },
            "author": {
                "name": "Shortlink Bot",
                "url": "https://github.com/respecting/shortlink-bot",
                "icon_url": "https://cdn.discordapp.com/avatars/780857188171644962/0344f614c6e85bef212f77d24631c631.webp?size=128"
            },
            "fields": [{
                "name": "Original Link:",
                "value": "[" + url.href + "](" + url.href + ")"
            }, {
                "name": "Bypassed Link:",
                "value": "[" + html.split('<div id="theGetLink" style="display: none">')[1].split('</div>')[0] + "](" + html.split('<div id="theGetLink" style="display: none">')[1].split('</div>')[0] + ")"
            }]
        }
    })
}

function linkvertise(url, id, msg) {
    let ping = new Date().getTime();
    let path = url.pathname
    path = `/${path.replace('/download','').split('/')[1]}/${path.replace('/download','').split('/')[2]}`
    fetch('https://publisher.linkvertise.com/api/v1/redirect/link/static' + path, {
        headers: {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1"
        }
    }).then(r => r.json()).then(json => {
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
        }).then(r => r.json()).then(json => {
            if (msg) return client.createMessage(msg.channel.id, {
                "embed": {
                    "title": "Ping",
                    "fields": [{
                        "name": "Discord API",
                        "value": ping - msg.createdAt + " ms"
                    }, {
                        "name": "Linkvertise Bypass",
                        "value": new Date().getTime() - ping + " ms"
                    }]
                }
            })
            let bypassedLink = json.data.target, //bypassed link
                embed = {
                    "embed": {
                        "title": `Bypassed the link successfully in ${new Date().getTime()-ping} ms.`,
                        "color": 1964014,
                        "footer": {
                            "icon_url": "https://avatars1.githubusercontent.com/u/62519659?s=460&u=4b87fac26aca329573e0ef1fa98502e44e78ee97&v=4",
                            "text": `github @ respecting/shortlink-bot, creds: Sainan/Universal-Bypass`
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
                                "value": "[" + bypassedLink + "](" + bypassedLink + ")"
                            }
                        ]
                    }
                }; //embed
            client.createMessage(id, embed); //send message
        })
    })
}

client.on("messageCreate", (msg) => {
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
                "description": "[Click me!](https://discord.com/oauth2/authorize?client_id=780857188171644962&scope=bot&permissions=3072)",
                "author": {
                    "name": "Shortlink Bot",
                    "url": "https://github.com/respecting/shortlink-bot",
                    "icon_url": "https://cdn.discordapp.com/avatars/780857188171644962/0344f614c6e85bef212f77d24631c631.webp?size=128"
                }
            }
        })
    }
    if (msg.content.startsWith(process.env.prefix + 'bypass')) {
        if (!msg.content.includes(' ')) return client.createMessage(msg.channel.id, {
            "embed": {
                "title": "ERROR",
                "description": `No link was provided. Usage: \`bypass link[, link[, link]]\` (brackets mean optional)`,
                "color": 15158332,
                "footer": {
                    "icon_url": "https://avatars1.githubusercontent.com/u/62519659?s=460&u=4b87fac26aca329573e0ef1fa98502e44e78ee97&v=4",
                    "text": "github @ respecting/shortlink-bot, code derived from Sainan/Universal-Bypass"
                },
                "author": {
                    "name": "Shortlink Bot",
                    "url": "https://github.com/respecting/shortlink-bot",
                    "icon_url": "https://cdn.discordapp.com/avatars/780857188171644962/0344f614c6e85bef212f77d24631c631.webp?size=128"
                }
            }
        })
        msg.channel.sendTyping();
        validateUrl(msg.content.replace(process.env.prefix + 'bypass ', ''), msg.channel.id)
    }
    if (msg.content.startsWith(process.env.prefix + 'ping')) {
        msg.channel.sendTyping();
        linkvertise(new URL("https://up-to-down.net/180849/respecting"), 1, msg);
    }
});
client.connect();