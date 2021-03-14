const {Command} = require('discord.js-commando');

module.exports = class InfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'info',
            group: 'info',
            memberName: 'info',
            description: 'Replies with info about the bot.',
        });
    }

    run(message) {
        return message.embed({
            "title": "Information",
            "fields": [{
                "name": "Hi! I'm Shortlink Bot.",
                "value": ":wave:"
            }, {
                "name": "I find what's behind the shortlink, like adf.ly and bit.ly!",
                "value": ":link:"
            }, {
                "name": "Find what my commands are by running",
                "value": "the help command!"
            }],
            "author": {
                "name": "Shortlink Bot",
                "url": "https://github.com/Rismose/shortlink-bot",
                "icon_url": "https://cdn.discordapp.com/avatars/780857188171644962/0344f614c6e85bef212f77d24631c631.webp?size=128"
            }
        });
    }
};