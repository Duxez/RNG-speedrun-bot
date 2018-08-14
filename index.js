const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');
const NodeCache = require("node-cache");
const GameCache = new NodeCache();

let alreadyChosen = ["mario", "sonic"];
const baseurl = "https://www.speedrun.com/api/v1";
const platformids = ["8gejmne3" /*Amiga*/, "vm9vn63k" /*Arcade*/, "o0644863" /*Atari 2600*/, "gz9qox60" /*Commodore 64*/, "v06d394z" /*Dreamcast*/, "mr6k409z" /*Famicom Disk System*/, "gz9qkx90" /*Game & Watch*/, "n5683oev"/*Game Boy*/, "3167d6q2" /*Game Boy Advance*/, "gde3g9k1" /*Game Boy Color*/, "w89rwelk" /*Nintendo 64*/, "7g6m8erk" /*Nintendo DS*/, "jm95z9ol" /*Nintendo Entertainment System*/, "wxeod9rn" /*Playstation 1*/, "5negk9y7" /*Playstation Portable*/, "31670d9q" /*Sega CD*/, "w89r3w9l" /*Sega Game Gear*/, "mr6k0ezw" /*Sega Genesis*/, "83exwk6l" /*Sega Master System*/, "lq60l642" /*Sega Saturn*/, "83exk6l5" /*Super Nintendo Entertainment System*/, "n568zo6v" /*ZX Spectrum*/];

GameCache.set("test", "coolboy", 1000000000);
let platformOffset = 0;

function setGames()
{
    let games = [];
    for(let i = 0; i < platformids.length; i++)
    {
        games[i] = [];
        axios.get(baseurl + "/games?_bulk=yes&max=1000&platform=" + platformids[i])
        .then(function(json) {
        for(let j = 0; j < json.data.data.length; j++)
        {
            // console.log(json.data.data[j].names.international);
            games[i][j] = json.data.data[j].names.international;
        }

        if(GameCache.get("games") === undefined || GameCache.get("games").length === undefined || GameCache.get("games").length === 0)
                GameCache.set("games", games);
        else
            GameCache.set("games", GameCache.get("games").concat(games));
        })
        .catch(function(error)
        {
            console.log(error);
        });
        
        if(i === platformOffset + 4)
        {
            return;
        }
    }
    platformOffset = 5;
}

setGames();
let timer = setInterval(setGames, 30000);
if(platformOffset >= platformids.length)
    clearInterval(timer);

if(GameCache.get("picked") === undefined)
    GameCache.set("picked", [], 1000000000);

client.on('ready', () => {
    // console.log(GameCache.get("test"));
})

client.on('message', msg => {
    //Checks if someone uses the command and is mod
    if(msg.content === '!roll') 
    {
        const randomnizedGame = "";
        let alreadyChosen = GameCache.get("picked");
        let games = GameCache.get("games");
        roll(msg, games);
        //Checks if the game was already chosen the previous time
        // for(let i = 0; i < alreadyChosen.length; i++) 
        // {
            // if(randomnizedGame == alreadyChosen[i]) 
            // {
            //     //reroll
            // }
            // else 
            // {
                // console.log(games[0]);
                // let chosenGame = roll();
                // if(chosenGame !== "")
                // {
                //     alreadyChosen.push(chosenGame);
                //     msg.reply(chosenGame); 
                // }

            // }
        // }
    }
});

function roll(msg, games)
{
    let platform = Math.floor(Math.random() * games.length);
    const chosenGame = games[platform][Math.floor(Math.random() * games[platform].length)];
    if(chosenGame === undefined)
    {
        roll(msg, games);
        return;
    }
    // console.log(chosenGame);
    msg.reply(chosenGame);
}

client.login('NDc4NTg2MTY5ODY1NTM1NDg4.DlM4GQ.HXSrnqESttDNoyeCEwtpQSvRWNo');