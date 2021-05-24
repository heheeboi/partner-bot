const Discord = require("discord.js");
const data = require("croxydb");
const moment = require("moment");

exports.run = async (client, message, args) => {
  let embed = new Discord.MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setThumbnail(message.guild.iconURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor("#5865f2").setTimestamp();
  let embed2 = new Discord.MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setThumbnail(message.guild.iconURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor("#5865f2").setTimestamp();
  let arg = args[0];
  if(!arg) return message.channel.send(embed.setDescription("\:x: **Hata! Lütfen seçenek seçin.**\n**(`sorumlusu`, `text`, `aç`, `kapat`, `sıfırla`, `ol`, `kanal`, `log`)**\n\n:book: **Örnek:**").setImage("https://media.discordapp.net/attachments/833354598558203924/845590890504126504/unknown.png?width=295&height=43"));
  if(arg == "sorumlusu") {
    if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(embed.setDescription("\:x: **|  Hata! Bu komutu kullanabilmek için `Yönetici` yetkisine ihtiyacınız var.**"));
    let role = message.mentions.roles.first();
    if(!role) return message.channel.send(embed.setDescription("\:x: **| Rol etiketlemediniz.**").setColor("#5865f2"));
    data.set(`partner_${message.guild.id}.sorumlu`, role.id)
    return message.channel.send(embed.setDescription("\:white_check_mark:  **| Artık Partner sorumlusu rolü `"+role.name+"` olarak ayarlandı.**"))
  } else if(arg == "text") {
    if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(embed.setDescription("\:x: **|  Hata! Bu komutu kullanabilmek için `Yönetici` yetkisine ihtiyacınız var.**"));
    let text = args[1];
    if(!text) return message.channel.send(embed.setDescription("\:x: **| Hata! Lütfen seçenek seçin. (`ayarla`, `sıfırla`)**"));
    if(text == "ayarla") {
      let mesaj = args.slice(2).join(" ");
      if(!mesaj) return message.channel.send(embed.setDescription("\:x: **| Lütfen bir text girin.**"));
      if(mesaj) {
        data.set(`partner_${message.guild.id}.text`, mesaj)
        return message.channel.send(embed.setDescription("\:white_check_mark: **| Partner texti başarıyla ayarlandı.**"))
      };
    }  else if(text == "sıfırla") {
      data.delete(`partner_${message.guild.id}.text`)
      return message.channel.send(embed.setDescription("\:white_check_mark: **| Partner texti başarıyla sıfırlandı.**"))
    };
  } else if(arg ==  "aç") {
    if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(embed.setDescription("\:x: **|  Hata! Bu komutu kullanabilmek için `Yönetici` yetkisine ihtiyacınız var.**"));
    data.set(`partner_${message.guild.id}.sistem`, true)
    return message.channel.send(embed.setDescription("\:white_check_mark: **| Partnerlik sistemi başarıyla `aktif` hale getirildi.**"))
  } if(arg == "kapat") {
    if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(embed.setDescription("\:x: **|  Hata! Bu komutu kullanabilmek için `Yönetici` yetkisine ihtiyacınız var.**"));
    data.delete(`partner_${message.guild.id}.sistem`)
    return message.channel.send(embed.setDescription("\:white_check_mark: **| Partnerlik sistemi başarıyla `deaktif` hale getirildi.**"))
  } if(arg == "ol") {
    if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(embed.setDescription("\:x: **|  Hata! Bu komutu kullanabilmek için `Yönetici` yetkisine ihtiyacınız var.**"));
    let sistem = data.fetch(`partner_${message.guild.id}.sistem`);
    let sorumlu = data.fetch(`partner_${message.guild.id}.sorumlu`);
    let log = data.fetch(`partner_${message.guild.id}.log`);
    let kanal = data.fetch(`partner_${message.guild.id}.kanal`);
    let text = data.fetch(`partner_${message.guild.id}.text`);
    if(!sistem) return message.channel.send(embed.setDescription("\:x: **| Sunucuda sistem aktif değil.\n\n`!partner aç`**"));
    if(!sorumlu) return message.channel.send(embed.setDescription("\:x: **| Sunucuda Partner Sorumlusu rolü aktif değil.\n\n`!partner sorumlusu @rol`**"));
    if(!text) return message.channel.send(embed.setDescription("\:x: **| Sunucuda Partner Text ayarlı değil.\n\n\`!partner text ayarla <Text>`**"))
    if(!kanal) return message.channel.send(embed.setDescription("\:x: **| Sunucuda Partner Kanalı ayarlı değil.\n\n\`!partner kanal ayarla #kanal`**"))
    if(!log) return message.channel.send(embed.setDescription("\:x: **| Sunucuda Partner Log Kanalı ayarlı değil.\n\n`!partner log ayarla #kanal`**"))
    let url = args[1];
    if(!url) return message.channel.send(embed.setDescription("\:x: **| Lütfen bir URL girin.\n\n`!partner ol "+message.guild.id+"`**"));
    if(!client.guilds.cache.get(url)) {
      return message.channel.send(embed.setDescription("\:x: **| URL'sini yazdığın sunucuda bulunmuyorum.**"))
    } else if(client.guilds.cache.get(url) == message.guild.id) {
      return message.channel.send(embed2.setDescription("\:x: **| Kendi sunucun ile partnerlik yapamazsın.**"))
    } else if(client.guilds.cache.get(url)) {
      let urlsistem = data.fetch(`partner_${url}.sistem`);
      let urlsorumlu = data.fetch(`partner_${url}.sorumlu`);
      let urllog = data.fetch(`partner_${url}.log`);
      let urlkanal = data.fetch(`partner_${url}.kanal`);
      let urltext = data.fetch(`partner_${url}.text`);
      if(!urlsistem) return message.channel.send(embed.setDescription("\:x: **| `"+client.guilds.cache.get(url).name+"` adlı sunucuda Sistem açık değil.**"))
      if(!urlsorumlu) return message.channel.send(embed.setDescription("\:x: **| `"+client.guilds.cache.get(url).name+"` adlı sunucuda Partner Sorumlusu ayarlı değil.**"))
      if(!urllog) return message.channel.send(embed.setDescription("\:x: **| `"+client.guilds.cache.get(url).name+"` adlı sunucuda Partner Log Kanalı ayarlı değil.**"))
      if(!urlkanal) return message.channel.send(embed.setDescription("\:x: **| `"+client.guilds.cache.get(url).name+"` adlı sunucuda Partner Kanalı ayarlı değil.**"))
      if(!urltext) return message.channel.send(embed.setDescription("\:x: **| `"+client.guilds.cache.get(url).name+"` adlı sunucuda Partner Sorumlusu ayarlı değil.**"))
        let serverCreate = moment.utc(message.guild.createdAt).format("DD MMMM YYYY (DD/MM/YYYY)")

    .replace("Monday", `Pazartesi`)
    .replace("Tuesday", `Salı`)
    .replace("Wednesday", `Çarşamba`)
    .replace("Thursday", `Perşembe`)
    .replace("Friday", `Cuma`)
    .replace("Saturday", `Cumartesi`)
    .replace("Sunday", `Pazar`)
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
        let uye1 = message.guild.members.cache.filter((m) => m.presence.status === "dnd"  && !m.user.bot).size;
        let uye2 = message.guild.members.cache.filter((m) => m.presence.status === "idle"  && !m.user.bot).size;
        let uye3 = message.guild.members.cache.filter((m) => m.presence.status === "online"  && !m.user.bot).size;
        let uyeler = uye1+uye2+uye3;
       let asd = await message.channel.send(embed2.setDescription("\:white_check_mark: **| Başvuru isteği `"+client.guilds.cache.get(url).name+"` sunucusundaki ayarlanmış olan partner log kanalına Gönderildi. Yetkililerin cevabı bekleniyor..**"))
        let msg = await client.channels.cache.get(urllog).send("<@&"+urlsorumlu+">", embed.addField(":heart_eyes: | Partnerlik İsteği!", `\`${message.guild.name}\` adlı sunucuda yetkili olan \`${message.author.tag}\` kullanıcısı \`${client.guilds.cache.get(url).name}\` sunucusu ile partner olmak istedi.\n\nBilgiler;`).addField(":heart_exclamation: Sunucu Adı", "`"+message.guild.name+" / "+message.guild.premiumSubscriptionCount+" boost ("+message.guild.premiumTier+" level)`").addField(":date: Sunucu Oluşturulma Tarihi", "`"+serverCreate+"`").addField(":guard: Partner Başvurusu Yapan", "`"+message.author.tag+"`").addField(":man_student: Sunucudaki Üye Sayısı", "`"+message.guild.memberCount+" üye / "+uyeler+" aktif (Botlar Dahil Değil)`"))
        await msg.react("✅");
        await msg.react("❌");
        let collector = msg.createReactionCollector((reaction, user) => user.id == client.guilds.cache.get(url).ownerID);
        collector.on('collect', async (reaction, user) => {
          if(reaction._emoji.name == "✅") {
            let dataa = data.fetch(`partner_${message.guild.id}_${message.author.id}.sayi`);
            let dat;
            if(dataa) {
              dat = dataa
            } else {
              dat = "0"
            }
            let dataa2 = data.fetch(`partner_${client.guilds.cache.get(url).id}_${user.id}.sayi`);
            let dat2;
            if(dataa2) {
              dat2 = dataa2
            } else {
              dat2 = "0"
            }
            asd.delete();
            msg.delete();
            data.push(`toplam_partner`, { giden: message.author.id, gelen: user.id })
            data.add(`partner_${message.guild.id}_${user.id}.sayi`, 1)
            data.add(`partner_${client.guilds.cache.get(url).id}_${user.id}.sayi`, 1)
            data.add(`partner_${user.id}.coin`, 4)
            data.add(`partner_${message.author.id}.coin`, 4)
            client.channels.cache.get(log).send(new Discord.MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setThumbnail(message.guild.iconURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor("#5865f2").setTimestamp().setDescription("\:white_check_mark: **| `"+client.guilds.cache.get(url).name+"` adlı sunucu partnerlik isteğini kabul etti.**\n\n> Partnerlik yapan <@"+message.author.id+"> ("+dat+")"))
            client.channels.cache.get(urllog).send(embed2.setDescription("\:white_check_mark: **|  `"+client.guilds.cache.get(url).name+"` adlı sunucudan gelen istek kabul edildi.**\n\n> Partnerlik yapan: <@"+user.id+"> ("+dat2+")"))
            client.channels.cache.get(kanal).send("> "+client.user.username+" - Partnerlik Sistemi\n\n"+urltext+"\n\n> Partnerlik yapan: <@"+message.author.id+"> ("+dat2+")").then((mse) => {client.channels.cache.get(urlkanal).send("> "+client.user.username+" - Partnerlik Sistemi\n\n"+text+"\n\n> Partnerlik yapan: <@"+user.id+"> ("+dat+")") });
          } else if(reaction._emoji.name == "❌") {
            asd.delete();
            msg.delete();
            client.guilds.cache.get(message.guild.id).channels.cache.get(message.channel.id).send(embed2.setDescription("\:x: **| `"+client.guilds.cache.get(url).name+"` adlı sunucuya giden istek reddedildi.**")).then((mse) => { client.channels.cache.get(urllog).send(embed2.setDescription(":x: **| `"+message.guild.name+"` adlı sunucudan gelen istek reddedildi.**")) });
          };
        });
    };
  } if(arg == "kanal") {
    if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(embed.setDescription("\:x: **|  Hata! Bu komutu kullanabilmek için `Yönetici` yetkisine ihtiyacınız var.**"));
    let knl = args[1];
    if(!knl) return message.channel.send(embed.setDescription("\:x: **| Hata! Lütfen seçenek seçin. (`ayarla`, `sıfırla`)**"));
    if(knl == "ayarla") {
      let kanal = message.mentions.channels.first();
      if(!kanal) return message.channel.send(embed.setDescription("\:x: **| Lütfen bir kanal etiketleyin.**"));
      if(kanal) {
        data.set(`partner_${message.guild.id}.kanal`, kanal.id)
        return message.channel.send(embed.setDescription("\:white_check_mark: **| Partner kanalı başarıyla <#"+kanal+"> olarak ayarlandı.**"))
      };
    } else if(knl == "sıfırla") {
      data.delete(`partner_${message.guild.id}.kanal`)
      return message.channel.send(embed.setDescription("\:white_check_mark: **| Partner kanalı başarıyla sıfırlandı.**"))
    };
  } if(arg == "log") {
    if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(embed.setDescription("\:x: **|  Hata! Bu komutu kullanabilmek için `Yönetici` yetkisine ihtiyacınız var.**"));
    let lg = args[1];
    if(!lg) return message.channel.send(embed.setDescription("\:x: **| Hata! Lütfen seçenek seçin. (`ayarla`, `sıfırla`)**"));
    if(lg == "ayarla") {
      let kanal = message.mentions.channels.first();
      if(!kanal) return message.channel.send(embed.setDescription("\:x: **| Lütfen bir kanal etiketleyin.**"));
      if(kanal) {
        data.set(`partner_${message.guild.id}.log`, kanal.id)
        return message.channel.send(embed.setDescription("\:white_check_mark: **| Partner log kanalı başarıyla <#"+kanal+"> olarak ayarlandı.**"))
      };
    } else if(lg == "sıfırla") {
      data.delete(`partner_${message.guild.id}.log`)
      return message.channel.send(embed.setDescription("\:white_check_mark: **| Partner log kanalı başarıyla sıfırlandı.**"))
    };
  } if(arg == "sıfırla") {
    if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(embed.setDescription("\:x: **|  Hata! Bu komutu kullanabilmek için `Yönetici` yetkisine ihtiyacınız var.**"));
    let msg = await message.channel.send(embed.setDescription(":question: **| Partnerlik sistemindeki tüm her şeyi sıfırlamak istediğine emin misin ?**"));
    await msg.react("✅");
    await msg.react("❌");
    let collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);
    collector.on('collect', async (reaction, user) => {
      if(reaction._emoji.name == "✅") {
        await msg.edit(embed.setDescription("\:white_check_mark: **| Sistem başarıyla sıfırlandı.**")).then((es) => {
          data.delete(`partner_${message.guild.id}.sorumlu`),
          data.delete(`partner_${message.guild.id}.sart`),
          data.delete(`partner_${message.guild.id}.text`),
          data.delete(`partner_${message.guild.id}.sistem`),
          data.delete(`partner_${message.guild.id}.kanal`),
          data.delete(`partner_${message.guild.id}.log`)
        });
      } else if(reaction._emoji.name == "❌") {
        await msg.edit(embed.setDescription("\:x: **| Sıfırlama isteğinden vazgeçildi.**"));
      };
      await reaction.users.remove(message.author.id);
    });
  }
};

exports.help = { name: "partner", aliases: [] };