const {Command} = require('discord.js-commando');

module.exports = class InviteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'invite',
            group: 'info',
            memberName: 'invite',
            description: 'Replies with the bot invite.',
        });
    }

    run(message) {
        return message.embed({
            "title": "Invite",
            "description": "[Click me!](https://discord.com/oauth2/authorize?client_id=780857188171644962&scope=bot&permissions=8192)",
            "author": {
                "name": "Shortlink Bot",
                "url": "https://github.com/respecting/shortlink-bot",
                "icon_url": "https://cdn.discordapp.com/avatars/780857188171644962/0344f614c6e85bef212f77d24631c631.webp?size=128"
            }
        });
    }
};