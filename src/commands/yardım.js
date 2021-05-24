const Discord = require("discord.js");
const data = require("croxydb");

exports.run = async (client, message, args) => {
  let embed = new Discord.MessageEmbed()
.setColor('#5865f2')
.setTitle(client.user.username+" yardım")
.setFooter(client.user.username, client.user.displayAvatarURL({dynamic :true}))
.setThumbnail(message.guild.iconURL({dynamic:true}))
.setDescription("**Yenilikler:**\n - Bot bakımdan çıktı, artık istek yollayınca sadece gelen isteği sunucu kurucusu kabul edebiliyor. Daha sonraki zamanlarda partner sorumlusu rolü olanlar kabul edebilecek hâle getireceğiz.")
.addField(` :coin: \`!gö\``, "**Günlük ödülünü alırsın!**" , "_ _")
.addField(`:handshake:\`!partner\``, "** Sunucunuzdaki partner ayarlarını yaparsın!**" ,"_ _")
.addField(`<a:bot:826399672028889108> \`!davet\``, "**Botu sunucuna davet edersin!**" ,"_ _")
.addField(`<:legit:845619906941943818> \`!istatistik\``, "**Bot istatistiğini görürsün!**", "_ _")
.addField("<:ghostid:841940126078337035>  `!partner-bul`", "**Partner sunucular ararsın!**", "_ _")
.addField(":gear: `!ayarlar`","**Sunucu partner ayarlarına bakarsın!**", "_ _")
.addField(`:trackball: \`!kb\``, "**Kullanıcı bilgisini görürsün!**", "_ _")
.addField(`:coin: \`!cf\``, "**Para yatırıp kumar oynarsın!**" ,"_ _")
.setImage('https://cdn.discordapp.com/attachments/770202714758971413/845695924805959710/ezgif-7-cf2f3059aff3.png')
message.channel.send(embed)
};
exports.help = { name: "yardım", aliases: ["y", "help", "info"] };