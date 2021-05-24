const { MessageEmbed } = require("discord.js");

module.exports = message => {
  let client = message.client;
  if (message.author.bot) return;
  if (!message.guild) return message.channel.send(
      new MessageEmbed()
        .setColor("#5865f2")
         .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true}))
         .setDescription(`Özel mesajlarda komut kullanmak veya mesaj yazmak yasak!`)
         .setFooter(`Ghost Partner`, client.user.displayAvatarURL({dynamic:true})).setThumbnail(client.user.displayAvatarURL({dynamic:true}))
         .setTimestamp()
         );
  let prefix = "";
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0].slice(prefix.length);
  let params = message.content.split(" ").slice(1);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    cmd.run(client, message, params);
  }
};
