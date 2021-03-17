# shortlink-bot
A discord bot that bypasses pesky ad-links using node-fetch, and Discord.js-Commando.

Originally created by the super cute [respecting / lemons](https://github.com/respecting)

Now Maintained By [Rismose](https://github.com/Rismose) & [jiggey](https://github.com/jiggey1) <3

# Support Server

[Click me!](https://discord.gg/YhkPFjrDjk)

# Invite
[Invite Shortlink Bot into your Discord!](https://discord.com/oauth2/authorize?client_id=780857188171644962&scope=bot&permissions=8192) The prefix is - (pipe).

# Demo

![Demo](demo1.gif)

*The bot sends a message to your DM's, It isn't clear in the DEMO above*
# Credits
[Sainan/Universal-Bypass](https://github.com/Sainan/Universal-Bypass) for old linkvertise bypass.

# How does it work? (for bypassing linkvertise?)
The bot sends a request to Linkvertise (https://publisher.linkvertise.com/api/v1/redirect/link/static/insert/linkvertise/path/here) and obtains the link id necessary to get the link.

Then, it sends another request to them (https://publisher.linkvertise.com/api/v1/redirect/link/insert/linkvertise/path/here/target?serial=base64encodedjson) to grab the link.

The linkvertise path is this part. (/respecting/linkvertise-bypass/)

An example of a serial is: 
`{"timestamp":0000000000, "random":"6548307", "link_id":00000000}`

The timestamp is the unix epoch, random isn't really random (always has to be 6548307) and link_id is the id we obtained from the first request.

# Usage
1. Clone this repository

2. `cd` into the repository.

3. `npm i` to install necessary dependencies.

4. Create a `.env` file and put the following in. 

```
token=
prefix=
invite=
owner=
```

5. Change prefix to whatever you like.

6. Add token.

7. Put your invite code. (DO NOT PUT THE LINK!)

8. Put your discord ID.

9. `node index.js` to start running the bot.

10. Profit!

# Formatting

Please format your proxies like the chart listed [here](https://github.com/TooTallNate/node-proxy-agent/blob/master/README.md).
