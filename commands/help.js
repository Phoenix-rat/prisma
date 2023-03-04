const Discord = require("discord.js");
const fs = require("fs");
const { readdirSync } = require("fs");
const { join } = require("path");
const config = require("../config.json");
const client = new Discord.Client();
client.commands = new Discord.Collection();

module.exports.run = async (client, message, args) => {
    const prefix = config.prefix;
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    console.log(commandFiles); // Konsola dosyaların bulunduğu klasörü yazdır
    //for (const file of commandFiles) {
    //    const command = (`${file}`);
    //   client.commands.set(command.exports.config.usage, command);
    //}

    if (!args.length) {
        // Belirli bir komutun olmadığı durumda, tüm komutları göster

        const embed = new Discord.MessageEmbed()
            .setTitle('Komutlar')
            .setDescription('Bu botun kullanabileceği komutlar:')
            .setColor('#00ff00');

        const commands = client.commands.map(command => command.config.name).join('\n');
        embed.addField('Komutlar', `. ${client.commands.map(props => `\`${props.config.name}\``).join(" | ")}`/*`commands`*/);

        return message.channel.send(embed);
    } else {
        // Belirli bir komutun nasıl kullanılacağını göster
        const command = client.commands.get(args[0].toLowerCase()) || client.commands.find(cmd => cmd.config.aliases && cmd.config.aliases.includes(args[0].toLowerCase()));

        if (!command) {
            return message.reply('Geçersiz komut!');
        }

        const embed = new Discord.MessageEmbed()
            .setTitle(`Yardım: ${command.config.name}`)
            .setColor('#00ff00');

        if (command.config.aliases) {
            embed.addField('Alternatif isimler', command.config.aliases.join(', '));
        }
        if (command.config.description) {
            embed.addField('Açıklama', command.config.description);
        }
        if (command.config.usage) {
            embed.addField('Kullanım', `${prefix}${command.config.name} ${command.config.usage}`);
        }

        return message.channel.send(embed);
    }
};

exports.config = {
    name: "help",
    usage: "help [komut]",
    description: "Botun komutlarını gösterir.",
    guildOnly: true,
    aliases: ["h", "yardım", "y"],
};