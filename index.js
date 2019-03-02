const discord = require("discord.js");
const client = new discord.Client();
const fs = require('fs');
const ms = require('ms');
const { get } = require("snekfetch")
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

client.on('ready', () => {
    console.log("Goupa Automation is online.");
    client.user.setActivity("Fly Goupa")
});

client.on('message', function(message) {
    if (message.author.equals(client.user)) return;

    if (!message.content.startsWith("-")) return;

    var args = message.content.substring(1).split(" ");
    var command = args[0].toLowerCase();

    if(message.content === "-cserver") {
        message.channel.send("The server has **successfully** been locked.");
        message.channel.fetchMessages({ limit: 1 }).then(messages => {
            let lastMessage = messages.first();
          
            if (lastMessage.author.bot) {
                lastMessage.delete(2000)
            }
        })
        let verifiedRole1 = message.guild.roles.find('name', 'Verified');
        if(!message.member.hasPermission('MANAGE_MESSAGES')){message.channel.send("You may not lock the server due to your roles not being high enough. :no_entry:")};
        const actionEmbed1 = new discord.RichEmbed()
        .setAuthor(`${message.author.username} (${message.author.id})`, message.author.avatarURL)
        .setColor('3a521c')
        .addField("Member who Locked the Server", message.author.username)
        .addField("Action", "Server lock.");    
        var botlogs = client.channels.get('545612138492985354');
        botlogs.send(actionEmbed1);
        // Locks the server
        client.channels.get('545554551818813440').send("Server locked. :lock:");
        //general
        client.channels.get('545603563984912396').overwritePermissions(
            verifiedRole1,
            { 'SEND_MESSAGES': false }
        )
        //bot-commands
        client.channels.get('546068118141665282').overwritePermissions(
            verifiedRole1,
            { 'SEND_MESSAGES': false }
        )
        //creations
        client.channels.get('545644043728846848').overwritePermissions(
            verifiedRole1,
            { 'SEND_MESSAGES': false }
        )
        //bot
        client.channels.get('546064919578279938').overwritePermissions(
            verifiedRole1,
            { 'SEND_MESSAGES': false }
        )
    }

    if(message.content === "-oserver") {
        message.channel.send("The server has **successfully** been unlocked.");
        message.channel.fetchMessages({ limit: 1 }).then(messages => {
            let lastMessage = messages.first();
          
            if (lastMessage.author.bot) {
                lastMessage.delete(2000)
            }
        })
        let verifiedRole2 = message.guild.roles.find('name', 'Verified');
        if(!message.member.hasPermission('MANAGE_MESSAGES')){message.channel.send("You may not unlock the server due to your roles not being high enough. :no_entry:")};
        const actionEmbed2 = new discord.RichEmbed()
        .setAuthor(`${message.author.username} (${message.author.id})`, message.author.avatarURL)
        .setColor('3a521c')
        .addField("Member who Unlocked the Server", message.author.username)
        .addField("Action", "Server unlock.");
        var botlogs = client.channels.get('545612138492985354');
        botlogs.send(actionEmbed2);
        // Unlocks the server
        client.channels.get('545554551818813440').send("Server unlocked. :unlock:");
        //general
        client.channels.get('545603563984912396').overwritePermissions(
            verifiedRole2,
            { 'SEND_MESSAGES': true }
        )
        //bot-commands
        client.channels.get('546068118141665282').overwritePermissions(
            verifiedRole2,
            { 'SEND_MESSAGES': true }
        )
        //creations
        client.channels.get('545644043728846848').overwritePermissions(
            verifiedRole2,
            { 'SEND_MESSAGES': true }
        )
        //bot
        client.channels.get('546064919578279938').overwritePermissions(
            verifiedRole2,
            { 'SEND_MESSAGES': true }
        )
    }
    if(message.content === "-help") {
        const helpEmbed = new discord.RichEmbed()
        .setTitle("Help")
        .setColor('3a521c') 
        .addField("-oserver", "Unlocks the server. (Administrators Only)")
        .addField("-cserver", "Locks the server. (Administrators Only)")
        .addField("-warn", "Warns a user. (Moderators Only)")
        .addField("-#warnings", "Returns the amount of warnings the user you tagged have.")
        .addField("-dog", "Returns a random picture of a dog.")
        .addField("-cat", "Returns a random picture of a cat.")
        .addField("-randomnumber", "Returns a number between 0 and 1.")
        .addField("-randomuser", "Returns a user in the guild.")
        .addField("-membercount", "Returns the amount of members there are in the discord server.");
        message.author.send(helpEmbed)
    }
    if(message.content === "-credits") {
        const helpEmbed = new discord.RichEmbed()
        .setTitle("Credits")
        .setColor('3a521c')
        .addField("AviaJxnny", "For being a king.")
        .addField("billyjoecobra", "For being the king of ideas.")
        .addField("Visual Studio Code / discord.js", "For running the bot.");
        message.channel.send(helpEmbed)
    }
    if(message.content === "-membercount") {
        const memberEmbed = new discord.RichEmbed()
        .setColor('3a521c')
        .addField("Member Count", `${message.guild.memberCount}`);
        message.channel.send(memberEmbed)
    }
    // if(message.content === "-links") {
    //     var rules = client.channels.get('545554678243655681');
    //     const rulesEmbed = new discord.RichEmbed()
    //     .setTitle("Links")
    //     .setColor('3a521c')
    //     .addField("Roblox Group:", "https://www.roblox.com/groups/3253427/Fly-Goupa")
    //     .addField("Discord Invite:", "https://discord.gg/9syuE5K")
    //     .addField("Twitter:", "https://twitter.com/FlyGoupa");
    //     rules.send(rulesEmbed);
    // }
    if(message.content.startsWith("-warn")){
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("You can not warn members!");
        
        let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        
        if(!wUser) return message.reply("This user does not exist.");
        if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("You can't warn them, they're the cool kids.");

        if(!warns[wUser.id]) warns[wUser.id] = {
            warns: 0
        };

         warns[wUser.id].warns++;

        fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
            if (err) console.log(err)
        });

        let warnEmbed = new discord.RichEmbed()
        .setDescription("Warns")
        .setAuthor(message.author.tag)
        .setColor('3a521c')
        .addField("Warned User", `<@${wUser.id}>`)
        .addField("Warned In", message.channel)
        .addField("Number of Warnings", warns[wUser.id].warns)

        let warnchannel = message.guild.channels.find(`name`, "moderation-logs");
        if(!warnchannel) return message.reply("Couldn't find channel");

        warnchannel.send(warnEmbed);

        if(warns[wUser.id].warns == 2){
            let muterole = message.guild.roles.find(`name`, "Muted");
            if(!muterole) return message.reply("That role does not exist.");
            let mutetime = "260s";

            try{
                await(wUser.send(`You have been muted for **${reason}**`));
            }catch(e){
                message.channel.send(`<@${wUser.id}>'s DM's are locked but they have been muted.`);
            }

            await(wUser.addRole(muterole.id));
            message.channel.send(`<@${wUser.id}> has been temporarily muted due to having 2 warnings.`);

        setTimeout(function(){
            wUser.removeRole(muterole.id)
            message.reply(`<@${wUser.id}> has been unmuted.`);
        }, ms(mutetime))
    }
    if(warns[wUser.id].warns == 3){

        try{
            await(wUser.send(`You have been banned for **${reason}**`));
        }catch(e){
            message.channel.send(`<@${wUser.id}>'s DM's are locked but they have been banned.`);
        }
        message.guild.member(wUser).ban(reason);
        message.reply(`<@${wUser.id}> has been banned after three warnings.`);
        }
    }
    if(message.content.startsWith("-#warnings")){
        let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!wUser) return message.reply("This user does not exist.");
        let warnlevel = warns[wUser.id].warns;

        let warnLevelEmbed = new discord.RichEmbed()
        .setDescription("Warn Level")
        .addField(`User:`, `${wUser}`)
        .setColor('3a521c')
        .addField("# of Warns", warnlevel);
        
        message.channel.send(warnLevelEmbed);
    }
    if(message.content.startsWith("-dog")){
        const randomPuppy = require('random-puppy');
 
    randomPuppy()
        .then(url => {
            const newEmbed = new discord.RichEmbed()
            .setImage(url);
            message.channel.send(newEmbed)
    })  
    }
    if(message.content.startsWith("-cat")){
        try {
			get('https://aws.random.cat/meow').then(res => {
				const embed = new discord.RichEmbed()
				.setImage(res.body.file)
				return message.channel.send({embed});
			});
		} catch(err) {
			return msg.channel.send(error.stack);
		}
    }
    if(message.content.startsWith("-randomnumber")){
        message.channel.send(Math.random(10));
    }
    if(message.content.startsWith("-randomuser")){
        message.channel.send(`I choose ${message.guild.members.random()} you.`);
    }
});

client.login('NTQ4NDc1NjMwMzYzMjEzODU2.D1F4lw.sOza1Q6tnm7z0cRcWe1odG_TRAU')
