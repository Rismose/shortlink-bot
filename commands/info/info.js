/*############################################################
THIS CODE IS PROTECTED BY GNU v3 LICENSE. IF YOU WISH TO USE
THIS CODE, PLEASE FORK THE BOT FROM THE ORIGINAL GITHUB
(https://github.com/Rismose/Shortlink-Bot) AND MAKE THE
FORK PUBLIC! YOU MUST DO THIS, OTHERWISE YOU ARE IN
VIOLATION OF THE GNU v3 LICENSE!
##############################################################*/

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
                "name": "I find what's behind the shortlink, like adf.ly, bit.ly and Linkvertise!",
                "value": ":link:"
            }, {
                "name": "Find what my commands are by running",
                "value": "the help command!"
            },
            {
                "name": "Original Source Code:", //Don't change or delete this line
                "value": "[https://github.com/Rismose/Shortlink-Bot](https://github.com/Rismose/Shortlink-Bot)" //Don't change or delete this line
            }, {
                "name": "Bypasses:",
                "value": "Bypasses by lemons#7106 / respecting <3"
            }],
            "author": {
                "name": "Shortlink Bot",
                "url": "https://github.com/Rismose/shortlink-bot",
                "icon_url": "https://cdn.discordapp.com/avatars/780857188171644962/0344f614c6e85bef212f77d24631c631.webp?size=128"
            }
        });
    }
};
