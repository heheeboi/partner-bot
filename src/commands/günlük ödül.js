const Discord = require("discord.js");
const db = require("croxydb");
const ms = require("parse-ms");
exports.run = async (client, message) => {
  function rastgeleMiktar(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  let times = await db.fetch(`odul_${message.author.id}`);
  let day = 86400000;
  if (times !== null && day - (Date.now() - times) > 0) {
    let time = ms(day - (Date.now() - times));
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor("#5865f2")
        .setAuthor(
          message.author.tag,
          message.author.avatarURL({ dynamic: true })
        )
        .setDescription(
          `⏱ Günlük ödülünü almak için **${
            time.hours}** saat, **${time.minutes}** dakika, **${
            time.seconds}** saniye sonra komutu tekrar dene!`
        )
    );
    return;
  }
  let moneys = rastgeleMiktar(1, 15);
  message.channel.send(
    new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setAuthor(
        message.author.tag,
        message.author.avatarURL({ dynamic: true })
      )
      .setDescription(
        `Günlük ödülünü topladın, cüzdanına ${moneys} :coin: eklendi!`
      )
  );

  db.set(`odul_${message.author.id}`, Date.now());

  db.add(`partner_${message.author.id}.coin`, moneys);
};


exports.help = { name: "günlük-ödül",aliases:["gö"]}