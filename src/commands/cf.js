 const Discord = require("discord.js");
const db = require("croxydb");
const ms = require("parse-ms");
exports.run = async (client, message, args) => {
  let para = db.fetch(`partner_${message.author.id}.coin`);

  let timeout = 10000;

  let crime = await db.fetch(`bahisoynama1_${message.author.id}`);

  if (crime !== null && timeout - (Date.now() - crime) > 0) {
    let time = ms(timeout - (Date.now() - crime));
    return message.channel.send(
      `:stopwatch: **| ${message.author.username}**! Lütfen **${
        time.seconds}** saniye sonra tekrar dene! `
    );
  } else {
    var miktar = args[0];
    if (!miktar)
      return message.channel.send(
        `:no_entry_sign: **| ${message.author.username}**, Geçersiz Sayı!!`
      );
    if (miktar > 50)
      return message.channel.send(
        `:no_entry_sign: **| ${message.author.username}**, en fazla 50 :coin: oynayabilirsin!`
      );
    if (para == "0") 
      return message.channel.send(
        `:no_entry_sign: **| ${message.author.username}**, dalgamı geçiyorsun canım!`
      );
    

    if (para < "1") 
      return message.channel.send(
        `:no_entry_sign: **| ${message.author.username}**, dalgamı geçiyorsun canım!`
      );
    
    
      if (miktar > para) {
      return message.channel.send(
        `:no_entry_sign: **| ${message.author.username}**, yeterli :coin: bulunmuyor!`
      );
    }
    const result = ["WINWIN", "LOOSELOOSE"];
    let awnser = result[Math.floor(Math.random() * result.length)];
    if (awnser === "LOOSELOOSE") {
      var kaybettin = miktar;
      message.channel.send(`**${message.author.tag}**, **${miktar}** :coin: döndürüyor... <a:donuyo:846099055104753684>`).then((x) => { setTimeout(function() { x.edit(`**${message.author.tag}**, **${miktar}** :coin: döndürüyor... <:tail:833358485025980486> ve kaybetti **-${kaybettin}** :coin:`) }, 3000)});
      await db.set(`bahisoynama1_${message.author.id}`, Date.now());
      await db.subtract(`partner_${message.author.id}.coin`, kaybettin);
    } else {
      var kazandın = miktar * 2;
      message.channel.send(`**${message.author.tag}**, **${miktar}** :coin: döndürüyor... <a:donuyo:846099055104753684>`).then((x) => { setTimeout(function() { x.edit(`**${message.author.tag}**, **${miktar}** :coin: döndürüyor... <:tail:833358485025980486> ve kazandı **+${kazandın}** :coin:`) }, 3000)});
      await db.set(`bahisoynama1_${message.author.id}`, Date.now());
      await db.add(`partner_${message.author.id}.coin`, kazandın);
    };
  };
};

exports.help = { name: "cf", aliases: [] };