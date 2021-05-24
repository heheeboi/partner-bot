const Discord = require("discord.js");
const moment = require("moment");
const client = new Discord.Client();
const data = require("croxydb");

exports.run = async (bot, msg, args) => {
  let simdikitarih = moment.utc(msg.createdAt).format("DD MM YYYY");

  let user = msg.mentions.users.first() || msg.author;

  let userinfo = {};
  userinfo.avatar = user.displayAvatarURL({ dynamic: true });
  userinfo.id = user.id;
  userinfo.od1 =
    msg.guild.members.cache.get(user.id).user.presence.game ||
    "Oynadığı Bir Oyun Yok.";
  userinfo.status = user.presence.status
    .toString()

    .replace("dnd", `Rahatsız Etmeyin`)
    .replace("online", `Çevrimiçi`)
    .replace("idle", `Boşta`)
    .replace("offline", `Çevrimdışı`);
  userinfo.bot = user.bot
    .toString()
    .replace("false", `Hayır`)
    .replace("true", `Evet`);

  userinfo.sonmesaj =
    user.lastMessage ||
    "Son Yazılan Mesaj Bulunamadı." ||
    "Son Yazılan Mesaj Gösterilemedi.";

  userinfo.dctarih = moment
    .utc(msg.guild.members.cache.get(user.id).user.createdAt)
    .format("DD MMMM YYYY (**DD/MM/YYYY**)")

    .replace("Monday", `**Pazartesi**`)
    .replace("Tuesday", `**Salı**`)
    .replace("Wednesday", `**Çarşamba**`)
    .replace("Thursday", `**Perşembe**`)
    .replace("Friday", `**Cuma**`)
    .replace("Saturday", `**Cumartesi**`)
    .replace("Sunday", `**Pazar**`)
    .replace("January", `Ocak`)
    .replace("February", `Şubat`)
    .replace("March", `Mart`)
    .replace("April", `Nisan`)
    .replace("May", `Mayıs`)
    .replace("June", `Haziran`)
    .replace("July", `Temmuz`)
    .replace("August", `Ağustos`)
    .replace("September", `Eylül`)
    .replace("October", `Ekim`)
    .replace("November", `Kasım`)
    .replace("December", `Aralık`);

  userinfo.dctarihkatilma = moment
    .utc(msg.guild.members.cache.get(user.id).joinedAt)
    .format("DD MMMM YYYY (**DD/MM/YYYY**)")

    .replace("Monday", `**Pazartesi**`)
    .replace("Tuesday", `**Salı**`)
    .replace("Wednesday", `**Çarşamba**`)
    .replace("Thursday", `**Perşembe**`)
    .replace("Friday", `**Cuma**`)
    .replace("Saturday", `**Cumartesi**`)
    .replace("Sunday", `**Pazar**`)
    .replace("January", `Ocak`)
    .replace("February", `Şubat`)
    .replace("March", `Mart`)
    .replace("April", `**Nisan`)
    .replace("May", `Mayıs`)
    .replace("June", `Haziran`)
    .replace("July", `Temmuz`)
    .replace("August", `Ağustos`)
    .replace("September", `Eylül`)
    .replace("October", `Ekim`)
    .replace("November", `Kasım`)
    .replace("December", `Aralık`);

  const uembed = new Discord.MessageEmbed()

    .setAuthor(user.tag, user.displayAvatarURL({dynamic:true}))
       .addField(`:coin: Coin Sayısı:`, data.fetch(`partner_${user.id}.coin`) || 0)
    .addField(`<:activity:844941544821358632> Durum:`, userinfo.status, false)
    .setColor("#5865f2")
    .addField(`:rocket: Katılım Tarihi (Sunucu):`, userinfo.dctarihkatilma, false)
    .addField(`:handshake: Katılım Tarihi (Discord):`, userinfo.dctarih, false)
    .addField(`<:duyuru:818014313104146434> Kimlik:`, userinfo.id, true)
    .addField(`<a:bot:826399672028889108> Bot Mu?:`, userinfo.bot, true)
    .addField(
      `<:m902:840910621230104576> Roller:`,
      `${msg.guild.members.cache
        .get(user.id)
        .roles.cache.filter(r => r.name !== "@everyone")
        .map(r => r)
        .join(" **|** ") || "**Bu Kullanıcıda Hiç Rol Bulunmuyor!**"}`,
      false
    )
    .addField(`<:offline:827137356732956692> Son Gönderdiği Mesaj:`, userinfo.sonmesaj, false)

  msg.channel.send(uembed);
};

    exports.help = { name: "kb", aliases: ["kullanıcı-bilgi"] };