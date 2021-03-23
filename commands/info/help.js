/*############################################################
THIS CODE IS PROTECTED BY GNU v3 LICENSE. IF YOU WISH TO USE
THIS CODE, PLEASE FORK THE BOT FROM THE ORIGINAL GITHUB
(https://github.com/Rismose/Shortlink-Bot) AND MAKE THE
FORK PUBLIC! YOU MUST DO THIS, OTHERWISE YOU ARE IN
VIOLATION OF THE GNU v3 LICENSE!
##############################################################*/

const {Command} = require('discord.js-commando');

module.exports = class HelpCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            group: 'info',
            memberName: 'help',
            description: 'Replies with info about commands.',
        });
    }

    run(message) {
        return message.embed({
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
            }, {
                "name": "info",
                "value": "Get information about the bot."
            }],
            "author": {
                "name": "Shortlink Bot",
                "url": "https://github.com/Rismose/shortlink-bot",
                "icon_url": "https://cdn.discordapp.com/avatars/780857188171644962/0344f614c6e85bef212f77d24631c631.webp?size=128"
            }
        });
    }
};