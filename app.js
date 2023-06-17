const express = require('express');
const { engine } = require('express-handlebars');
const app = express()
const { urlencoded, json } = require("body-parser");
const { Client, MessageEmbed, Collection } = require("discord.js");
const client = new Client({ fetchAllMembers: true });
const moment = require("moment");
const config = require("./config.json");
const fs = require("fs");
const path = require("path");
const { readdirSync } = require("fs");
const { join } = require("path");

const port = config.port
require('./util/Loader.js')(client);

client.commands = new Collection();
client.aliases = new Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  console.log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    console.log(`${props.config.name} komutu yüklendi.`);
    client.commands.set(props.config.name, props);
    props.config.aliases.forEach(alias => {
      client.aliases.set(alias, props.config.name);
    });
  });
})

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(urlencoded({ limit: "50mb", extended: false }));


app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home'
  });
});
app.get('/faq', (req, res) => {
  res.render('faq', {
    title: 'FAQ'
  });
});
app.get('/whoweare', (req, res) => {
  res.render('whoweare', {
    title: 'Who We Are'
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact'
  });
});
app.post("/contact", async (req, res) => {
  const ID = req.body.message;
  const email = req.body.email;
  let actionType = req.body.type;
  let adres = req.body.adress2;
  const user = client.users.cache.get(config.userid);
  if (ID) {
    if (actionType === "ortakçalisma") {
      user.send(new MessageEmbed().setTitle("Site Contact System | Ortak Çalışma").setDescription(`
          ⚪ **Email :** **${email}**
          ⚪ **İp : ${req.ip}**
          ⚪ **Adres : ${adres}**

          **Mesaj;**

          \`\`\`${ID}\`\`\`
          `).setColor("161616").setFooter(``)).catch(x => { })
    };
    if (actionType === "isbirliği") {
      user.send(new MessageEmbed().setTitle("Site Contact System | İş Birliği").setDescription(`
          ⚪ **Email :** **${email}**
          ⚪ **İp : ${req.ip}**
          ⚪ **Adres : ${adres}**

          **Mesaj;**

          \`\`\`${ID}\`\`\`
          `).setColor("161616").setFooter(``)).catch(x => { })
    };
    if (actionType === "acilkonu") {
      user.send(new MessageEmbed().setTitle("Site Contact System | Acil Konu").setDescription(`
          ⚪ **Email :** **${email}**
          ⚪ **İp : ${req.ip}**
          ⚪ **Adres : ${adres}**

          **Mesaj;**
          \`\`\`${ID}\`\`\`
           `).setColor("161616").setFooter(``)).catch(x => { })
    };
  };
  res.redirect("/");
});

app.get('/suggestions', (req, res) => {
  res.render('suggestions', {
    title: 'Suggestions'
  });
});

app.post("/suggestions", async (req, res) => {
  const ID = req.body.message;
  const email = req.body.email;
  const user = client.users.cache.get(config.userid);
  if (ID) {
    user.send(new MessageEmbed().setTitle("Site Suggestions System").setDescription(`
        ⚪ **Email :** **${email}**
        ⚪ **İp : ${req.ip}**
        ⚪ **Adres : ${req.body.adress}**

        **Mesaj;**

        \`\`\`${ID}\`\`\`
        `).setColor("161616").setFooter(``)).catch(x => { })
  };
  res.redirect("/");
});

const { inspect } = require("util");

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === "eval") {
    if (message.author.id !== config.userid) return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = inspect(evaled, { depth: 0 });

      message.channel.send(`\`\`\`js\n${evaled}\n\`\`\``);
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
    }
  }
});
app.use((req, res) => { return res.redirect("/"); });
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

client.login(config.token).then(() => {
  console.log("Bot Aktif!")
}).catch(err => {
  console.log("Bot Aktif Değil!")
}
);