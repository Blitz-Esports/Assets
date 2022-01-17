const axios = require("axios");
const fs = require("fs");

const path = "./game-assets/brawlstars";

(async () => {

    const brawlers = await axios.get("https://api.brawlapi.com/v1/brawlers");

    brawlers.data.list.forEach(async (brawler) => {

        //* Brawler icons
        const icons = await axios.get(brawler.imageUrl, { responseType: "arraybuffer" });
        fs.writeFileSync(`${path}/brawler/icons/${brawler.path}.png`, icons.data);

        //* Brawler starPowers
        brawler.starPowers.forEach(async (sp) => {
            const spBuffer = await axios.get(sp.imageUrl, { responseType: "arraybuffer" });
            fs.writeFileSync(`${path}/brawler/star-powers/${sp.path}.png`, spBuffer.data);
        });

        //* Brawler gadgets
        brawler.gadgets.forEach(async (gadget) => {
            const gadgetBuffer = await axios.get(gadget.imageUrl, { responseType: "arraybuffer" });
            fs.writeFileSync(`${path}/brawler/gadgets/${gadget.path}.png`, gadgetBuffer.data);
        });

    });

})();

(async () => {

    const icons = await axios.get("https://api.brawlapi.com/v1/icons");

    Object.values(icons.data.player).forEach(async (player) => {

        const playerBuffer = await axios.get(player.imageUrl, { responseType: "arraybuffer" });
        fs.writeFileSync(`${path}/icons/player/${player.id}.png`, playerBuffer.data);

    });

    Object.values(icons.data.club).forEach(async (club) => {

        const clubBuffer = await axios.get(club.imageUrl, { responseType: "arraybuffer" });
        fs.writeFileSync(`${path}/icons/club/${club.id}.png`, clubBuffer.data);

    });

})();