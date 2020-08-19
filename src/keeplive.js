const fetch = require('node-fetch')

//Keep server live by doing a get req every 5 mins
function keepServerLive(){
    setInterval(async function(){
        await fetch(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`)
    }, 280000);
}

module.exports = keepServerLive