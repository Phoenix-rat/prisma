const express = require('express');
const { engine } = require('express-handlebars');
const app = express()
const { urlencoded, json } = require("body-parser");
const { Client, MessageEmbed } = require("discord.js");
const client = new Client({ fetchAllMembers: true });
const moment = require("moment");
const port = 3000
const config = require("./config.json");

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(urlencoded({ limit: "50mb", extended: false }));


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home'
    });
});
app.get('/features', (req, res) => {
    res.render('features', {
        title: 'Features'
    });
});

app.get('/faq', (req, res) => {
    res.render('faq', {
        title: 'FAQ'
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact'
    });
});
app.post("/contact", async(req, res) => {
  const ID = req.body.message;
  const email = req.body.email;
  let actionType = req.body.type;
  const user = client.users.cache.get(config.userid);
  if (ID) {
      if (actionType === "ortakçalisma") {
          user.send(new MessageEmbed().setTitle("Site Contact System | Ortak Çalışma").setDescription(`
          ⚪ **Email :** **${email}**
          ⚪ **İp : ${req.ip}**

          **Mesaj;**

          \`\`\`${ID}\`\`\`
          `).setColor("161616").setFooter(``)).catch(x => {})
      };
      if (actionType === "isbirliği") {
          user.send(new MessageEmbed().setTitle("Site Contact System | İş Birliği").setDescription(`
          ⚪ **Email :** **${email}**
          ⚪ **İp : ${req.ip}**

          **Mesaj;**

          \`\`\`${ID}\`\`\`
          `).setColor("161616").setFooter(``)).catch(x => {})
      };
      if (actionType === "acilkonu") {
          user.send(new MessageEmbed().setTitle("Site Contact System | Acil Konu").setDescription(`
          ⚪ **Email :** **${email}**
          ⚪ **İp : ${req.ip}**

          **Mesaj;**
          \`\`\`${ID}\`\`\`
           `).setColor("161616").setFooter(``)).catch(x => {})
      };
  };
  res.redirect("/");
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    });
});
app.use((req, res) => { return res.redirect("/"); });
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

client.login(config.token).then (() => {
    console.log("Bot Aktif!")
    }).catch(err => {
    console.log("Bot Aktif Değil!")
    }
);