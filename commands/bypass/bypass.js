/*############################################################
THIS CODE IS PROTECTED BY GNU v3 LICENSE. IF YOU WISH TO USE
THIS CODE, PLEASE FORK THE BOT FROM THE ORIGINAL GITHUB
(https://github.com/Rismose/Shortlink-Bot) AND MAKE THE
FORK PUBLIC! YOU MUST DO THIS, OTHERWISE YOU ARE IN
VIOLATION OF THE GNU v3 LICENSE!
##############################################################*/

const { Message, MessageFlags } = require('discord.js');
const {Command} = require('discord.js-commando'),
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
                usages: 3,
                duration: 45,
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
                "discord.kim",
                "goo.gl",
                "zzb.bz",
                "grabify.link"
            ],
            fetch = require('node-fetch');

        let o;

        // This code checks that the bot has the correct permissions. If it doesn't it returns an error.
        if(msg.channel.type != "dm") { //This line simply checks if the bot is being messaged inside a DM, if it is, it skips past the code (as permissions dont exist in DM's) and if it isn't a DM, it checks the permissions. 
            if(!msg.guild.me.hasPermission("ADMINISTRATOR")) {
                return createErrorEmbed("I do not have the ``ADMINISTRATOR`` permission. This means I cannot execute this command. Sorry! Please give me the permission, and try again!")
        }}

        //This code creates an embed, which is sent when a bypass is completed. The function is executed later on in the code.
        function createBypassEmbed(url, bypassedUrl, time) {
            msg.channel.stopTyping()
            msg.author.send({
                embed: {
                    "title": `Bypassed the link successfully in ${new Date().getTime()-time}ms.`,
                    "color": 1964014,
                    "footer": {
                        "icon_url": "https://miro.medium.com/max/719/0*9f5uMrKMjLbzEf7q.png",
                        "text": `GitHub @ Rismose/shortlink-bot`
                    },
                    "author": {
                        "name": "Shortlink Bot",
                        "url": "https://GitHub.com/Rismose/shortlink-bot",
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
                createErrorEmbed("You do not have DM's enabled! I cannot send you your bypassed link. Please enable DM's and continue.")
            })
            if (msg.channel.type != "dm") msg.embed({ //Checks to see if message is inside a DM, if it is, it will not send the message, if it isn't a DM, it simply skips this part!
                "title": `Link Bypassed!`,
                "color": 1964014,
                "footer": {
                    "icon_url": "https://miro.medium.com/max/719/0*9f5uMrKMjLbzEf7q.png",
                    "text": `GitHub @ Rismose/shortlink-bot`
                },
                "author": {
                    "name": "Shortlink Bot",
                    "url": "https://GitHub.com/Rismose/shortlink-bot",
                    "icon_url": "https://cdn.discordapp.com/avatars/780857188171644962/0344f614c6e85bef212f77d24631c631.webp?size=128"
                },
                "description": "I have sent the bypassed link to your DM's!"
            }).then(m => (m.delete({timeout: 10000})))
        }

        function createErrorEmbed(errorInfo) { //This is a template for an error. It simply sends an error embed, with the error message specified in the description (as errorInfo)
            msg.channel.stopTyping()
            return msg.embed({
                "title": "ERROR!",
                "description": errorInfo,
                "color": 15158332,
                "footer": {
                    "icon_url": "https://miro.medium.com/max/719/0*9f5uMrKMjLbzEf7q.png",
                    "text": `Join our support server! https://discord.gg/${process.env.invite}`
                },
                "author": {
                    "name": "Shortlink Bot",
                    "url": "https://GitHub.com/Rismose/shortlink-bot",
                    "icon_url": "https://cdn.discordapp.com/avatars/780857188171644962/0344f614c6e85bef212f77d24631c631.webp?size=128"
                }
            }).then(m => (m.delete({timeout: 10000})))
        }

        function validateUrl(url) { //This will simply validates the links to make sure they are correct and safe.
            try {
                url = url + " "
                let urls = [...new Set(url.split(' '))].filter(Boolean);
                if (urls.length > 3) { // This code makes sure you only send 3 URLs. If you dont, it returns an error.
                    return createErrorEmbed("Provided too many links! (Limit: 3)");
                }
                urls.forEach(url => {
                    url = new URL(url);
                    if (ipLoggers.includes(url.host)) return createErrorEmbed(`The Link You Have Given (${url.host}) Is Flagged As An IP Logger. Please do not try this.`); //This is what is sent if an IPLogger is sent.
                    bypass(url)
                })
            } catch (e) {
                createErrorEmbed(`The link provided is invalid.`); //This will be the error message inside of the ErrorEmbed
            }
        }

        function adshrinkit(html, url, timestamp) { //Bypass for AdShrinkIt
            createBypassEmbed(url, html.split('url\\":\\"')[1].split('\\\",')[0].replace(/\\/g, ""), timestamp)
        }

        function rekonise(url, timestamp) { //Bypass Code For Rekonise
            fetch("https://api.rekonise.com/unlocks/"+url.pathname).then(r=>r.json()).then(j=>{
                createBypassEmbed(url, j.url, timestamp)
            })
        }

        function shortconnect(html, url, timestamp) { //Bypass code for ShortConnect
            createBypassEmbed(url, html.split('seconds, <a href="')[1].split('"\>')[0], timestamp)
        }

        function boostink(html, url, timestamp) { //Bypass code for BoostInk
            createBypassEmbed(url, Buffer.from(html.split('version=')[1].split('"')[1], 'base64').toString('ascii'), timestamp)
        }

        function mboost(html, url, timestamp) { //Bypass code for mBoost
            createBypassEmbed(url, html.split('{"pageProps":{"data":{"targeturl":"')[1].split('"')[0], timestamp)
        }

        function adfly(html, url, timestamp) { //Bypass code for AdFly
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
            if (new URL(r).search.includes("dest=")) return createBypassEmbed(url, decodeURIComponent(r.split('dest=')[1]), timestamp)
            createBypassEmbed(url, r, timestamp)
        }

        function s2u(url, html, timestamp) { //Bypass code for Sub2Unlock
            createBypassEmbed(url, html.split('<div id="theGetLink" style="display: none">')[1].split('</div>')[0], timestamp)
        }

        function linkvertise(url) { //Bypass code for Linkvertise
            if (msg.channel.type != "dm") {
            msg.delete({timeout: 50}) //Don't change this number! It is set to 50 to stop a bug on Discord.
            }
            let ping = new Date().getTime(),
                path = `/${url.pathname.replace('/download','').split('/')[1]}/${url.pathname.replace('/download','').split('/')[2]}`;
            fetch('https://publisher.linkvertise.com/api/v1/redirect/link/static' + path, {
                method: "GET",
                headers: {
                    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1"
                },
            }).then(r => r.json().catch(() => createErrorEmbed('Linkvertise is ratelimited, or the supplied link was invalid. Try another one, and if it happens again, contact the bot developer.'))).then(json => {
                if (json._idleTimeout) return;
                o = Buffer.from(JSON.stringify({
                    "timestamp": new Date().getTime(),
                    "random": "6548307",
                    "link_id": json.data.link.id
                }), 'utf-8').toString('base64'); //get link id, make serial and convert to base64
            }).then(() => {
                if (!o) return;
                try {
                fetch('https://publisher.linkvertise.com/api/v1/redirect/link' + path + '/target?serial=' + o, {
                    method: "post",
                    headers: {
                        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1"
                    },
                }).then(r => r.json()).then(json => {
                    if (json._idleTimeout) return msg.channel.send("An error has occurred. Please try again later.").msg.delete({timeout: 5000});
                    let bypassedLink = json.data.target; //bypassed link goes here.
                    createBypassEmbed(url, bypassedLink, ping)
                    msg.channel.stopTyping()
                })
                }catch(e) {
                    console.log(e)
                }
            })
        }

        async function bypass(url) { //This is the code that eventually checks and then sends to the users DM's
            try {
                if (!msg.channel.type === 'dm') msg.delete().catch(() => {
                    createErrorEmbed('Please Give Me The Permission ``Manage Messages`` So I Can Remove My Bypass Messages.', originalCommand)
                });
                let timestamp = new Date().getTime(),
                    resp = await fetch(url.href),
                    html = await resp.text();
                if (url.hostname.includes("mboost.me")) return mboost(html, new URL(resp.url), timestamp);
                if (html.includes('<title>Create Free Social Unlocks - Rekonise</title>')) return rekonise(url, timestamp)
                if (html.includes('<title>shorten and protect links</title>')) return shortconnect(html, url, timestamp)
                if (html.includes('<meta name="description" content="Shrink your URLs and get paid!" />')) return adfly(html, new URL(resp.url), timestamp)
                if (html.includes(' - Sub2Unlock - ')) return s2u(new URL(resp.url), html, timestamp);
                if (html.includes('<title>Boost.ink - Complete the steps to proceed</title>')) return boostink(html, new URL(resp.url), timestamp);
                if (html.includes('<title>AdShrink.it - </title>')) return adshrinkit(html, new URL(resp.url), timestamp);
                if (html.includes('<title>Loading... | Linkvertise</title>')) {
                    if (url.href.includes("dynamic")) {
                        return createBypassEmbed(url, Buffer.from(new URLSearchParams(url.search).get("r"), 'base64').toString('ascii'), timestamp);
                    }
                    linkvertise(new URL(resp.url));
                } else {
                    if (url.href == new URL(resp.url)) return createErrorEmbed('The link you provided is invalid. Please check your link and try again!')
                    createBypassEmbed(url, resp.url, timestamp)
                }
            } catch (err) {
                createErrorEmbed(`The link provided (${url.href}) is invalid.`)
            }
        }
        validateUrl(link)
}
};
