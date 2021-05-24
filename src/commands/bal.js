const Discord = require("discord.js");
const data = require("croxydb");

exports.run = async (client, message, args) => {
  let coin = data.fetch(`partner_${message.author.id}.coin`);
  let embed = new Discord.MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor("#5865f2").setTimestamp().setThumbnail(message.guild.iconURL({dynamic:true}));
  return message.channel.send(embed.setTitle("Senin `"+coin+"` :coin: coinin var!"));
};

exports.help = { name: "bal", aliases: ["balance", "para", "coin"] };