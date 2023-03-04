const Discord = require("discord.js"),
  client = new Discord.Client();

module.exports.run = async (client, message, args) => {
  message.channel.send(`Pong! ${client.ws.ping}ms`)
};

exports.config = {
  name: "ping",
  description: "Ping Komudu",
  usage: "",
  guildOnly: true,
  aliases: [],
};