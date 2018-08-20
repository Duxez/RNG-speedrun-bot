const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');
const fs = require('fs');

let alreadyChosen = [""];
const baseurl = "https://www.speedrun.com/api/v1";
const platformids = ["8gejmne3" /*Amiga*/, "vm9vn63k" /*Arcade*/, "o0644863" /*Atari 2600*/, "gz9qox60" /*Commodore 64*/, "v06d394z" /*Dreamcast*/, "mr6k409z" /*Famicom Disk System*/, "gz9qkx90" /*Game & Watch*/, "n5683oev"/*Game Boy*/, "3167d6q2" /*Game Boy Advance*/, "gde3g9k1" /*Game Boy Color*/, "w89rwelk" /*Nintendo 64*/, "7g6m8erk" /*Nintendo DS*/, "jm95z9ol" /*Nintendo Entertainment System*/, "wxeod9rn" /*Playstation 1*/, "5negk9y7" /*Playstation Portable*/, "31670d9q" /*Sega CD*/, "w89r3w9l" /*Sega Game Gear*/, "mr6k0ezw" /*Sega Genesis*/, "83exwk6l" /*Sega Master System*/, "lq60l642" /*Sega Saturn*/, "83exk6l5" /*Super Nintendo Entertainment System*/, "n568zo6v" /*ZX Spectrum*/];
const gametypeids = ["53no817x" /*Category Extension*/, "x3n6vme4" /*Prerelease*/, "j8138myw" /*Expansion/DLC*/];

let platformOffset = 0;

client.on('ready', () => {

})

client.on('message', msg => {

    if(msg.content === '!roll') 
    {
        let gamestext = fs.readFileSync('./games.txt').toString('utf-8');
        let games = gamestext.split("\r\n");
        roll(msg, games);
    }
    if(msg.content === '!funroll' && msg.channel.id === '480450456124915727')
    {
        let gamestext = fs.readFileSync('./games.txt').toString('utf-8');
        let games = gamestext.split("\r\n");
        funroll(msg, games);
    }
});

function roll(msg, games)
{
    const chosenGame = games[Math.floor(Math.random() * games.length)];
    axios.get(baseurl + '/games/' + chosenGame).then((json) => {
        let name = json.data.data.names.international;
        let alreadyPlayed = false;
        let played = fs.readFileSync('./alreadyplayed.txt').toString('utf-8').split("\r\n");
        for(let i = 0; i < played.length; i++)
        {
            if(played[i] === name)
                alreadyPlayed = true;
        }
        if(name === undefined || json.data.data.ruleset["emulators-allowed"] === false || alreadyPlayed || (json.data.data.gametypes.length > 0 && json.data.data.gametypes.includes("53no817x")))
        {
            roll(msg, games);
            return;
        }

        let platforms = "";
        for(let i = 0; i < json.data.data.platforms.length; i++)
        {
            let comma = true;
            switch(json.data.data.platforms[i])
            {
                case "8gejmne3":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Amiga";
                    break;
                case "vm9vn63k":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Arcade";
                    break;
                case "o0644863":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Atari 2600";
                    break;
                case "gz9qox60":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Commodore 64";
                    break;
                case "v06d394z":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Dreamcast";
                    break;
                case "mr6k409z":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Famicom Disk System";
                    break;
                case "gz9qkx90":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Game & Watch";
                    break;
                case "n5683oev":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Game Boy";
                    break;
                case "3167d6q2":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Game Boy Advance";
                    break;
                case "gde3g9k1":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Game Boy Color";
                    break;
                case "w89rwelk":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Nintendo 64";
                    break;
                case "7g6m8erk":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Nintendo DS";
                    break;
                case "jm95z9ol":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "NES";
                    break;
                case "wxeod9rn":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Playstation 1";
                    break;                                        
                case "5negk9y7":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Playstation Portable";
                    break;
                case "31670d9q":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Sega CD";
                    break;                                
                case "w89r3w9l":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Sega Game Gear";
                    break;
                case "mr6k0ezw":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Sega Genesis";
                    break;
                case "83exwk6l":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Sega Master System";
                    break;
                case "lq60l642":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Sega Saturn";
                    break;
                case "83exk6l5":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "SNES";
                    break;
                case "n568zo6v":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "ZX Spectrum";
                    break;
                default:
                    comma = false;
                    break;
            }
        }

        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let startDate = year + "-" + month + "-" + day;
        let newDay = date.getDate() + 7;
        let endDate = new Date();
        endDate.setDate(newDay);
        let endYear = endDate.getFullYear();
        let endMonth = endDate.getMonth() + 1;
        let endDay = endDate.getDate();
        let endDateString = endYear + "-" + endMonth + "-" + endDay;
        
        msg.channel.send({embed: {
            color: 10980551,
            title: name,
            "image": {
                "url": json.data.data.assets["cover-medium"].uri
            },
            fields: [
                {
                    name: "Week",
                    value: startDate + " till " + endDateString
                },
                {
                    name: "Release date",
                    value: json.data.data.released
                }, 
                {
                    name: "Platform",
                    value: platforms
                },
                {
                    name: "Speedrun.com link",
                    value: json.data.data.weblink                                                
                },
            ],

            footer: {
            icon_url: 'https://cdn.discordapp.com/avatars/478586169865535488/7ac94aaf8d5e7456f8bda2f0629c06cf.png?size=128',
            text: "Bot made by Job Rapati and Seydie."
            }
        }}).then(async (message) => {
            await message.react("👍");
            await message.react("👎");

        }).catch((err) => {
            console.log("ouch");
        });

        fs.appendFile('./alreadyplayed.txt', name + "\r\n", function(err) {
            if(err)
                console.log(err);
                
            console.log("successfully wrote game to file");
        });
    }).catch((err) => {
        console.log(err);
    });
}

function funroll(msg, games)
{
    const chosenGame = games[Math.floor(Math.random() * games.length)];
    axios.get(baseurl + '/games/' + chosenGame).then((json) => {
        let name = json.data.data.names.international;

        if(name === undefined || json.data.data.ruleset["emulators-allowed"] === false || (json.data.data.gametypes.length > 0 && json.data.data.gametypes.includes("53no817x")))
        {
            funroll(msg, games);
            return;
        }

        let platforms = "";
        for(let i = 0; i < json.data.data.platforms.length; i++)
        {
            let comma = true;
            switch(json.data.data.platforms[i])
            {
                case "8gejmne3":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Amiga";
                    break;
                case "vm9vn63k":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Arcade";
                    break;
                case "o0644863":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Atari 2600";
                    break;
                case "gz9qox60":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Commodore 64";
                    break;
                case "v06d394z":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Dreamcast";
                    break;
                case "mr6k409z":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Famicom Disk System";
                    break;
                case "gz9qkx90":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Game & Watch";
                    break;
                case "n5683oev":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Game Boy";
                    break;
                case "3167d6q2":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Game Boy Advance";
                    break;
                case "gde3g9k1":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Game Boy Color";
                    break;
                case "w89rwelk":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Nintendo 64";
                    break;
                case "7g6m8erk":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Nintendo DS";
                    break;
                case "jm95z9ol":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "NES";
                    break;
                case "wxeod9rn":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Playstation 1";
                    break;                                        
                case "5negk9y7":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Playstation Portable";
                    break;
                case "31670d9q":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Sega CD";
                    break;                                
                case "w89r3w9l":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Sega Game Gear";
                    break;
                case "mr6k0ezw":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Sega Genesis";
                    break;
                case "83exwk6l":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Sega Master System";
                    break;
                case "lq60l642":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "Sega Saturn";
                    break;
                case "83exk6l5":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "SNES";
                    break;
                case "n568zo6v":
                    if(i !== 0 && platforms !== "")
                        platforms += ", "
                    platforms += "ZX Spectrum";
                    break;
                default:
                    comma = false;
                    break;
            }
        }
        
        msg.channel.send({embed: {
            color: 10980551,
            title: name,
            "image": {
                "url": json.data.data.assets["cover-medium"].uri
            },
            fields: [
                {
                    name: "Release date",
                    value: json.data.data.released
                },
                {
                    name: "Platform",
                    value: platforms
                }, 
                {
                    name: "Speedrun.com link",
                    value: json.data.data.weblink                                                
                },
            ],

            footer: {
            icon_url: 'https://cdn.discordapp.com/avatars/478586169865535488/7ac94aaf8d5e7456f8bda2f0629c06cf.png?size=128',
            text: "Bot made by Job Rapati and Seydie."
            }
        }}).then(async (message) => {
            await message.react("👍");
            await message.react("👎");

        }).catch((err) => {
            console.log("ouch");
        });
    }).catch((err) => {
        console.log(err);
    });
}

client.login('NDc4NTg2MTY5ODY1NTM1NDg4.DlM4GQ.HXSrnqESttDNoyeCEwtpQSvRWNo');