const {Command} = require('discord.js-commando');

module.exports = class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            group: 'info',
            memberName: 'ping',
            description: 'Replies with Discord API ping and linkvertise bypass ping.',
        });
    }

    run(message) {
        const fetch = require('node-fetch');
        let o;

        function createErrorEmbed(errorInfo, msg) {
            return msg.embed({
                "title": "ERROR",
                "description": errorInfo,
                "color": 15158332,
                "footer": {
                    "icon_url": "https://www.freepnglogos.com/uploads/discord-logo-png/concours-discord-cartes-voeux-fortnite-france-6.png",
                    "text": `Join our support server! https://discord.gg/${process.env.invite}`
                },
                "author": {
                    "name": "Shortlink Bot",
                    "url": "https://github.com/Rismose/shortlink-bot",
                    "icon_url": "https://cdn.discordapp.com/avatars/780857188171644962/0344f614c6e85bef212f77d24631c631.webp?size=128"
                }
            }).then(msg => setTimeout(() => msg.delete(), 5000))
        }

        function ping(msg) {
            let ping = Date.now();
            /*fetch('https://publisher.linkvertise.com/api/v1/redirect/link/static/180849/respecting', {
                headers: {
                    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1"
                }
            }).then(r => r.json().catch(() => createErrorEmbed('Linkvertise is ratelimited, or the supplied link was invalid. Try another one, and if it happens again, contact the bot developer.', msg))).then(json => {
                o = Buffer.from(JSON.stringify({
                    "timestamp": new Date().getTime(),
                    "random": "6548307",
                    "link_id": json.data.link.id
                }), 'utf-8').toString('base64');
            }).then(() => {
                fetch('https://publisher.linkvertise.com/api/v1/redirect/link/180849/respecting/target?serial=' + o, {
                    headers: {
                        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1"
                    }
                }).then(r => r.json().catch(() => createErrorEmbed('Linkvertise is ratelimited. Contact the bot developer.', msg))).then(json => {
                    msg.channel.stopTyping();*/
                    return msg.embed({
                        "title": "Ping",
                        "fields": [{
                            "name": "Discord API (can be inaccurate)",
                            "value": Date.now() - msg.createdTimestamp + " ms"
                        }, {
                            "name": "Linkvertise Bypass",
                            "value": "Disabled."
                        }]
                    })
                //})
            //})
        }

        message.channel.startTyping();
        ping(message);
        message.channel.stopTyping();
    }
};