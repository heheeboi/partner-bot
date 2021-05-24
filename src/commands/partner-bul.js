const Discord = require("discord.js");
  
exports.run = async (client, message, args) => {
        
        let i0 = 0;
        let i1 = 5;
        let page = 1;

        let guilds = client.guilds.cache.array();
        guilds.forEach((a) => guilds = [...guilds]);

        let description = guilds.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
        .map((r, i) => `\n**${r.name} ・ ${r.memberCount} üye**\n> Kurucusu: <@${r.ownerID}> \n> Son Partner Yapılma: **Yakında Eklencek!**\n> URL: **${r.id}**`)
        .slice(0, 5)
        .join("\n");

        let embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor("BLUE")
            .setFooter(message.client.user.username, message.client.user.displayAvatarURL({dynamic:true}))
            .setThumbnail(message.guild.iconURL({dynamic:true}))
            .setDescription(description);

        let msg = await message.channel.send(embed);
        
        await msg.react("⬅");
        await msg.react("❌");
        await msg.react("➡");

        let collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);

        collector.on("collect", async(reaction, user) => {

            if(reaction._emoji.name === "⬅") {

                // Updates variables
                i0 = i0-5;
                i1 = i1-5;
                page = page-1;
                
                // if there is no guild to display, delete the message
                if(i0 < 0){
                    return msg.delete();
                }
                if(!i0 || !i1){
                    return msg.delete();
                }
                
                description = guilds.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
                .map((r, i) => `\n**${r.name} ・ ${r.memberCount} üye**\n> Kurucusu: <@${r.ownerID}> \n> Son Partner Yapılma: **Yakında Eklencek!**\n> URL: **${r.id}**`)
                .slice(i0, i1)
                .join("\n");

                // Update the embed with new informations
                embed.setDescription(description);
            
                // Edit the message 
                msg.edit(embed);
            
            };

            if(reaction._emoji.name === "➡"){

                // Updates variables
                i0 = i0+5;
                i1 = i1+5;
                page = page+1;

                // if there is no guild to display, delete the message
                if(i1 > guilds.length + 5){
                    return msg.delete();
                }
                if(!i0 || !i1){
                    return msg.delete();
                }

                description = guilds.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
                .map((r, i) => `\n**${r.name} ・ ${r.memberCount} üye**\n> Kurucusu: <@${r.ownerID}> \n> Son Partner Yapılma: **Yakında Eklencek!**\n> URL: **${r.id}**`)
                .slice(i0, i1)
                .join("\n");

                // Update the embed with new informations
                embed.setDescription(description);
            
                // Edit the message 
                msg.edit(embed);

            };

            if(reaction._emoji.name === "❌"){
                return msg.delete(); 
            }

            // Remove the reaction when the user react to the message
            await reaction.users.remove(message.author.id);

        });
    };
    exports.help = { name: "partner-bul", aliases: [] };