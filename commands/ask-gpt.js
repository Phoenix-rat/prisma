const Discord = require("discord.js"),
  client = new Discord.Client();

const config = require("../config.json");
const bardapi = require('@xelcior/bard-api');
const _bard = new bardapi(config.bardapi);


module.exports.run = async (client, message, args) => {
    const answer = await _bard.getAnswer(args.join(' '));
    message.channel.send(answer);
};

exports.config = {
  name: "ask-gpt",
  description: "Ask GPT a question.",
  usage: "",
  guildOnly: true,
  aliases: [],
};