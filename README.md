# shortlink-bot
A discord bot that bypasses pesky ad-links using node-fetch, and Discord.js-Commando.

Originally created by the super cute [respecting / lemons](https://github.com/respecting)

This is the origial source code, make sure you follow the license when using the source code.

Now Maintained By [Rismose](https://github.com/Rismose) & [jiggey](https://github.com/jiggey1) <3

# Support Server

[Click me!](https://discord.gg/YhkPFjrDjk)

# Invite
[Invite Shortlink Bot into your Discord!](https://discord.com/oauth2/authorize?client_id=780857188171644962&scope=bot&permissions=8192) The prefix is - (pipe).

# Demo

![Demo](demo1.gif)

*The bot sends a message to your DM's, It isn't clear in the DEMO above*
# Credits
[Sainan/Universal-Bypass](https://github.com/Sainan/Universal-Bypass) for the old linkvertise bypass.

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

# How does it work? (for bypassing linkvertise?)
First, we parse the user's submitted linkvertise link and get the path!

We're going to use JS for these examples. (**Note! These examples have NOT BEEN tested, and probably won't work in a real environment!**)

```js
var linkvertiseURL = new URL("https://linkvertise.com/123456/gaming?o=sharing")
console.log(linkvertiseURL.pathname)
```

Here's a cool diagram so you can understand:
```
https://linkvertise.com/123456/gaming?o=sharing
          ^                ^^^^^^          ^
  junk we dont need    we need this   junk we dont need
```

Since we've parsed the link sucessfully, we now have to send a request to Linkvertise to obtain the link id.

```js
var linkId;
fetch("https://publisher.linkvertise.com/api/v1/redirect/link/static"+linkvertiseURL.pathname).then(r=>r.json()).then(j=>{
  linkId = j.data.link.id
})
```

Now we have to create a serial, to actually get the bypassed link.

An example of a serial is: 

```json
{
  "timestamp":0000000000, 
  "random":"6548307", 
  "link_id":00000000
}
``` 
```js
({
  "timestamp":new Date().getTime(), 
  "random":"6548307", 
  "link_id":linkId
})
```

The timestamp is the unix epoch in milliseconds, we can ignore random (It's always 6548307) and link_id is the ID we obtained from the first request. After creating our serial, we need to convert it to base64.

```js
serial = btoa(JSON.stringify({ //btoa means to base64 encode, JSON.stringify turns the serial JSON into a string so btoa doesn't throw errors.
  "timestamp":new Date().getTime(), 
  "random":"6548307", 
  "link_id":linkid
}));
```

Now, we just have to send a request to Linkvertise to get the bypassed link!

```js
var bypassedLink;
fetch("https://publisher.linkvertise.com/api/v1/redirect/link" + linkvertiseURL.path + "/target?serial=" + serial, {
  method: "POST"
}).then(r=>r.json()).then(j=>{
  bypassedLink = j.data.target;
  console.log(bypassedLink)
})
```
* Please note that logging links to console is only for demonstration purposes.
