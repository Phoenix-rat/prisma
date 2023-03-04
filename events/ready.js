const Discord = require("discord.js");
const config = require('../config.json');
module.exports = async client => {
  client.user.setPresence({ activity: { type: "PLAYING", name: `Prisma` }, status: 'idle' })
};
