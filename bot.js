const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = 'L'

client.on('ready', () => {
  client.user.setStatus("dnd")
  console.log(`Logged in as ${client.user.tag}!`);
  console.log('')
  console.log('')
  console.log('╔[═════════════════════════════════════════════════════════════════]╗')
  console.log(`Start ${new Date()}`);
  console.log('╚[═════════════════════════════════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════════════════════════════]╗');
  console.log(`Logged in as * [ " ${client.user.username} " ]`);
  console.log('')
  console.log('Informations :')
  console.log('')
  console.log(`servers! [ " ${client.guilds.size} " ]`);
  console.log(`Users! [ " ${client.users.size} " ]`);
  console.log(`channels! [ " ${client.channels.size} " ]`);
  console.log('╚[════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════]╗')
  console.log(' Bot Is Online')
  console.log('╚[════════════]╝')
  console.log('')
  console.log('')
	
});





const adminprefix = "L";
const devs = ['283580465862934539','283580465862934539'];
client.on('message', message => {
  var argresult = message.content.split(` `).slice(1).join(' ');
    if (!devs.includes(message.author.id)) return;
    
if (message.content.startsWith(adminprefix + 'setgame')) {
  client.user.setGame(argresult);
    message.channel.sendMessage(`**${argresult} تم تغيير بلاينق البوت إلى **`)
} else 
	if (message.content.startsWith(adminprefix + 'wt')) {
  client.user.setActivity(argresult, {type:'WATCHING'});
      message.channel.send(` ☑ Client Activity Now Is : \`Watching ${argresult} \` `)
} else
 if (message.content.startsWith(adminprefix + 'ls')) {
  client.user.setActivity(argresult , {type:'LISTENING'});
      message.channel.send(` ☑ Client Activity Now Is : \`Listening ${argresult} \` `)
      } else     
if (message.content.startsWith(adminprefix + 'setT')) {
  client.user.setGame(argresult, "https://www.twitch.tv/squad");
    message.channel.sendMessage(`**تم تغيير تويتش البوت إلى  ${argresult}**`)
}
});

client.on('message', message => {
    if(message.content.startsWith(prefix+'help')) {
   const embed = new Discord.RichEmbed()
.setColor('RANDOM')
        .setDescription(`**
General's Commands. 
${prefix}giveaway - لانشاء قيف اواي :scroll:
${prefix}server - معلومات عن السيرفر :smile:
${prefix}clear - يمسح الشات بس حط عدد  :eyeglasses: 
${prefix}id - معلومات عنك  :scroll:
${prefix}ban - يعطى بان بس حط سبب :flashlight:
${prefix}kick - يعطى كيك مع السبب :frame_photo:
${prefix}bc - ارسال رساله جماعيه لكل الى فسيرفر بالخاص:microphone:
${prefix}hc - يخفي الشات :nut_and_bolt:
${prefix}unhc - يظهر الشات :nut_and_bolt:

            bot help       

    message.author.send(embed)
}
});


client.on('message',async message => {
          var room;
          var title;
          var duration;
          var gMembers;
          var filter = m => m.author.id === message.author.id;
          if(message.content.startsWith(prefix + "giveaway")) {
            if(!message.guild.member(message.author).hasPermission('MANAGE_GUILD')) return message.channel.send(':heavy_multiplication_x:| **يجب أن يكون لديك خاصية التعديل على السيرفر**');
            message.channel.send(`:eight_pointed_black_star:| **من فضلك اكتب اسم الروم**`).then(msgg => {
              message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
              }).then(collected => {
                let room = message.guild.channels.find('name', collected.first().content);
                if(!room) return message.channel.send(':heavy_multiplication_x:| **لم اقدر على ايجاد الروم المطلوب**');
                room = collected.first().content;
                collected.first().delete();
                msgg.edit(':eight_pointed_black_star:| **اكتب مدة القيف اواي بالدقائق , مثال : 60**').then(msg => {
                  message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 20000,
                    errors: ['time']
                  }).then(collected => {
                    if(isNaN(collected.first().content)) return message.channel.send(':heavy_multiplication_x:| **يجب عليك ان تحدد وقت زمني صحيح.. ``يجب عليك اعادة كتابة الامر``**');
                    duration = collected.first().content * 60000;
                    collected.first().delete();
                    msgg.edit(':eight_pointed_black_star:| **واخيرا اكتب على ماذا تريد القيف اواي**').then(msg => {
                      message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 20000,
                        errors: ['time']
                      }).then(collected => {
                        title = collected.first().content;
                        collected.first().delete();
                        try {
                          let giveEmbed = new Discord.RichEmbed()
                          .setAuthor(message.guild.name, message.guild.iconURL)
                          .setTitle(title)
                          .setDescription(`المدة : ${duration / 60000} دقائق`)
                          .setFooter(message.author.username, message.author.avatarURL);
                          message.guild.channels.find('name', room).send(giveEmbed).then(m => {
                             let re = m.react('🎉');
                             setTimeout(() => {
                               let users = m.reactions.get("🎉").users;
                               let list = users.array().filter(u => u.id !== m.author.id);
                               let gFilter = list[Math.floor(Math.random() * list.length) + 0];
                                 if(users.size === 1) gFilter = '**لم يتم التحديد**';
                               let endEmbed = new Discord.RichEmbed()
                               .setAuthor(message.author.username, message.author.avatarURL)
                               .setTitle(title)
                               .addField('انتهى القيف اواي !',`الفائز هو : ${gFilter}`)
                               .setFooter(message.guild.name, message.guild.iconURL);
                               m.edit(endEmbed);
                             },duration);
                           });
                          msgg.edit(`:heavy_check_mark:| **تم اعداد القيف اواي**`);
                        } catch(e) {
                          msgg.edit(`:heavy_multiplication_x:| **لم اقدر على اعداد القيف اواي بسبب نقص الخصائص**`);
                          console.log(e);
                        }
                      });
                    });
                  });
                });
              });
            });
          }
        });
       
client.on('message', function(msg) {
    if(msg.content.startsWith (prefix  + 'server')) {
      let embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setThumbnail(msg.guild.iconURL)
      .setTitle(`**Showing Details Of** ${msg.guild.name}`)
      .addField('`Server Region`',`[${msg.guild.region}]`,true)
      .addField('`Roles Count`',`[${msg.guild.roles.size}]`,true)
      .addField('`Members Count`',`[${msg.guild.memberCount}]`,true)
      .addField('`Online Members`',`[${msg.guild.members.filter(m=>m.presence.status == 'online').size}]`,true)
      .addField('`Text Channels`',`[${msg.guild.channels.filter(m => m.type === 'text').size}]`,true)
      .addField('`Voice Channels`',`[${msg.guild.channels.filter(m => m.type === 'voice').size}]`,true)
      .addField('`Server Owner`',`**${msg.guild.owner}**`,true)
      .addField('`Server Id`',`**${msg.guild.id}**`,true)
      .addField('`Server was created in`',msg.guild.createdAt.toLocaleString())
      msg.channel.send({embed:embed})
    }
});


client.on('message', message => {
      if(!message.channel.guild) return;
var prefix = "L";
if(message.content.startsWith(prefix + 'bc')) {
if(!message.channel.guild) return message.channel.send('**هذا الأمر فقط للسيرفرات**').then(m => m.delete(5000));
if(!message.member.hasPermission('ADMINISTRATOR')) return      message.channel.send('**للأسف لا تمتلك صلاحية** `ADMINISTRATOR`' );
let args = message.content.split(" ").join(" ").slice(2 + prefix.length);
let copy = "Squad Bot";
let request = `Requested By ${message.author.username}`;
if (!args) return message.reply('```**يجب عليك كتابة كلمة او جملة لإرسال البرودكاست**```');message.channel.send(`**هل أنت متأكد من إرسالك البرودكاست؟ \nمحتوى البرودكاست:** \` ${args}\``).then(msg => {
msg.react('✅')
.then(() => msg.react('❌'))
.then(() =>msg.react('✅'))

let reaction1Filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
let reaction2Filter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;

let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 12000 });
let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 12000 });
reaction1.on("collect", r => {
message.channel.send(`☑ | Done ... The Broadcast Message Has Been Sent For ${message.guild.members.size} Members`).then(m => m.delete(5000));
message.guild.members.forEach(m => {
var bc = new
Discord.RichEmbed()
.setColor('RANDOM')
.setTitle('Broadcast')
.addField('Server', message.guild.name)
.addField('Sender', message.author.username)
.addField('Message', args)
.setThumbnail(message.author.avatarURL)
.setFooter(copy, client.user.avatarURL);
m.send({ embed: bc })
msg.delete();
})
})
reaction2.on("collect", r => {
message.channel.send(`**Broadcast Canceled.**`).then(m => m.delete(5000));
msg.delete();
})
})
}
});

 
client.on('message', message => {
                 if(message.content.startsWith("Lclear")) {
                     var args = message.content.split(" ").slice(1);
             if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You need MANAGE_MESSAGES permission noob');
              if (!args[0]) return message.channel.send('ضع عدد الرسائل التي تريد مسحها مثل Lclear 100');

              message.channel.bulkDelete(args[0]).then(() => {
                const embed = new Discord.RichEmbed()
                  .setColor(0xF16104)
                  .setDescription(`Cleared ${args[0]} messages.`);
                message.channel.send({ embed });

                const actionlog = message.guild.channels.find('name', 'logs');

                if (!actionlog) return message.channel.send('تم المسح بنجاح');
                const embedlog = new Discord.RichEmbed()
                  .setDescription('Leaders')
                  .setColor(0xF16104)
                actionlog.send(embedlog);

              });
            };

            });


client.on('message', msg => {

    if (msg.content == 'Ljoin') {
        if (msg.member.voiceChannel) {

     if (msg.member.voiceChannel.joinable) {
         msg.member.voiceChannel.join().then(msg.react('white_check_mark'));
     }
    }
}
})
client.on('ready', () => { //code bot not leave room voice //Bot Is Online
    client.channels.get("512341859813687335").join(); //by : iBeAnthonyD
    });

client.on('message', message => {
        if(message.content === prefix + "hc") {
        if(!message.channel.guild) return;
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You Dont Have Perms ❌');
               message.channel.overwritePermissions(message.guild.id, {
               READ_MESSAGES: false
   })
                message.channel.send('Channel Hided Successfully ! ✅  ')
   }
  });


client.on('message', message => {
        if(message.content === prefix + "unhc") {
        if(!message.channel.guild) return;
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('❌');
               message.channel.overwritePermissions(message.guild.id, {
               READ_MESSAGES: true
   })
                message.channel.send('Done  ')
   }
  });


client.on('message', msg => {
     if(msg.content === 'هلا')
                 setTimeout(function() {
   msg.reply('هلا حبي')
                 }, 0)
   });


 client.on('message' , async message => {
      var prefix = "L";
         if(message.content.startsWith(prefix + "emoji")) {
            let args = message.content.split(" ").slice(1);
    if (args.length < 1) {
      message.channel.send('You must provide some text to emojify!');
  }
  
  message.channel.send(
      args.join(' ')
          .split('')
          .map(c => codes[c] || c)
          .join('')
  );
  };
  });

client.on('message', message => {
    var prefix = "L"
    let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);


if(command == "draw") {
    var Canvas = require('canvas')
  , Image = new Canvas.Image
  , canvas = new Canvas(450, 170)
  , ctx = canvas.getContext('2d');
  ctx.font = '30px Impact';
  let args = message.content.split(" ").slice(1);
  
Image.src = canvas.toBuffer();

    console.log(Image);
ctx.drawImage(Image, 0, 0, Image.width / 470, Image.height / 170);
ctx.fillText(args.join("  "),110, 70);


ctx.beginPath();
ctx.lineTo(50, 102);
ctx.stroke();

message.channel.sendFile(canvas.toBuffer());
}
}).on('ready', () => {

});


client.on('message', message => {
    if (message.content.startsWith("Lavatar")) {
if(!message.channel.guild) return;
        var mentionned = message.mentions.users.first();
    var client;
      if(mentionned){
          var client = mentionned; } else {
          var client = message.author;
      }
        const embed = new Discord.RichEmbed()
                           .addField('Requested by:', "<@" + message.author.id + ">")
        .setColor(000000)
        .setImage(`${client.avatarURL}`)
      message.channel.sendEmbed(embed);
    }
});


client.on('message', message => {
           var prefix = "L";
            if (message.content.startsWith(prefix + "bot")) {
     let embed = new Discord.RichEmbed()
.setThumbnail(message.author.avatarURL)
.addField(' السيرفرات🌐',`[${client.guilds.size}]  `)
.addField(' الاعضاء👥 ',` [${client.users.size}] `)
.addField('الرومات📚 ',`[${client.channels.size}]`) 
.addField(' البنق🚀 ',`[${Date.now() - message.createdTimestamp}]`) 
.addField('مصمم البوت',`‹« ζ͜͡LD »› • ★ XMas ★ •#2311`)
.addField('صاحب البوت',`-'Leaders NetWork.`)
.setColor('#7d2dbe')
  message.channel.sendEmbed(embed);
    }
});

client.on('message', message => {
  var prefix ="L"; 
if (message.content.startsWith(prefix + 'perms')) {
         if(!message.channel.guild) return;
         var perms = JSON.stringify(message.channel.permissionsFor(message.author).serialize(), null, 4);
         var zPeRms = new Discord.RichEmbed()
         .setColor('RANDOM')
         .setTitle(':tools: Permissions')
         .addField('Your Permissions:',perms)
                  message.channel.send({embed:zPeRms});

    }
});


    client.on('message', message => {
      if(message.content.startsWith(prefix + 'ma')) {
       if (!message.member.hasPermission("MOVE_MEMBERS")) return message.channel.send('**لايوجد لديك صلاحية سحب الأعضاء**');
         if(!message.guild.member(client.user).hasPermission("MOVE_MEMBERS")) return message.reply("**لايوجد لدي صلاحية السحب**");
      if (message.member.voiceChannel == null) return message.channel.send(`**الرجاء الدخول لروم صوتي**`)
       var author = message.member.voiceChannelID;
       var m = message.guild.members.filter(m=>m.voiceChannel)
       message.guild.members.filter(m=>m.voiceChannel).forEach(m => {
       m.setVoiceChannel(author)
       })
       message.channel.send(`✅ **| تم سحب جميع الأعضاء إليك**`)
      
      
       }
         });



       
client.login(process.env.BOT_TOKEN);
