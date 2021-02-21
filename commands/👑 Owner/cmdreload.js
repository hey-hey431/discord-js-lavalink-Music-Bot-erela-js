const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "cmdreload",
    category: "👑 Owner",
    aliases: [""],
    description: "Reloads a command",
    usage: "cmdreload <CMD>",
    run: async (client, message, args, cmduser, text, prefix) => {
        if (!config.ownerIDS.includes(message.author.id)) return message.channel.send("You are not allowed to run this command! Only the Owner is allowed to run this Cmd");
        try {
            let reload = false;
            for (let i = 0; i < client.categories.length; i += 1) {
                let dir = client.categories[i];
                try{
                    if(!args[0]) return message.channel.send("Write command name")
                        delete require.cache[require.resolve(`../../commands/${dir}/${args[0]}.js`)] // usage !reload <name>
                        client.commands.delete(args[0])
                        const pull = require(`../../commands/${dir}/${args[0]}.js`)
                        client.commands.set(args[0], pull)
                        reload = true;            
                }catch{ }
            }
            if(reload) return message.channel.send(`Successfully reloaded \`${args[0]}\``);
            message.channel.send(`Could not reload: \`${args[0]}\``)
            
        
        } catch (e) {
            console.log(String(e.stack).red);
            return message.channel.send("there was an error");
        }
    },
};