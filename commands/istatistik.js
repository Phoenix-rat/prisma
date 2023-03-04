const Discord = require("discord.js"),
client = new Discord.Client();

module.exports.run = async (client, message, args) => {
    const totalSeconds = client.uptime / 1000;
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds % 60);

    const memory = await getMemoryUsage();

    const embed = new Discord.MessageEmbed()
      .setTitle('Bot İstatistikleri')
      .setDescription('Aşağıda botunuzun istatistikleri bulunmaktadır.')
      .addField('Sunucu Sayısı', `${client.guilds.cache.size}`, true)
      .addField('Toplam Kullanıcı Sayısı', `${client.users.cache.size}`, true)
      .addField('Toplam Kanal Sayısı', `${client.channels.cache.size}`, true)
      .addField('Ping', `${client.ws.ping} ms`, true)
      .addField('Bellek Kullanımı', `${memory}`, true)
      .addField('CPU Kullanımı', `${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}%`, true)
      .addField('Komut Sayısı', `${client.commands.size}`, true)
      .addField('Ping Tarihi', `${new Date(client.readyTimestamp).toLocaleString()}`, true)
      .addField('Node.js Sürümü', `${process.version}`, true)
      .addField('Çalışma Süresi', `${days} gün, ${hours} saat, ${minutes} dakika, ${seconds} saniye`, true)
      .setThumbnail(client.user.displayAvatarURL())
      .setColor('#0099ff')
      .setTimestamp();
    message.channel.send(embed);
      
      function getMemoryUsage() {
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        const forcalculate = process.memoryUsage().heapUsed / 1024 / 1024 / 1024;
        const total = 134217728 / 1024 / 1024;
        const percent = ((forcalculate / total) * 100).toFixed(2);
        return `${used.toFixed(2)} MB / ${total.toFixed(2)} GB (${percent}%)`;
      
      };
  };

exports.config = {
  name: "istatistik",
  description: "Botun istatistiklerini gösterir.",
  usage: "",
  guildOnly: true,
  aliases: ["i"],
};