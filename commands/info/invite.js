/*############################################################
THIS CODE IS PROTECTED BY GNU v3 LICENSE. IF YOU WISH TO USE
THIS CODE, PLEASE FORK THE BOT FROM THE ORIGINAL GITHUB
(https://github.com/Rismose/Shortlink-Bot) AND MAKE THE
FORK PUBLIC! YOU MUST DO THIS, OTHERWISE YOU ARE IN
VIOLATION OF THE GNU v3 LICENSE!
##############################################################*/

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
            "description": "[Click me!](https://discord.com/oauth2/authorize?client_id=820713791884361768&scope=bot&permissions=8)",
            "author": {
                "name": "Shortlink Bot",
                "url": "https://github.com/Rismose/shortlink-bot",
                "icon_url": "https://cdn.discordapp.com/avatars/780857188171644962/0344f614c6e85bef212f77d24631c631.webp?size=128"
            }
        });
    }
};