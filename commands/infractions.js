const moment = require('moment'),
    Discord = require('discord.js')
 
moment.locale('fr')
 
module.exports = {
    run: async (message, args, client) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You dont have enough perms to use this command.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Please mention the member whose warnings you want to see')
        if (!client.db.warns[member.id]) return message.channel.send('This member doesnt have any warnings')
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`**Total warns :** ${client.db.warns[member.id].length}\n\n__**10 Latest warns**__\n\n${client.db.warns[member.id].slice(0, 10).map((warn, i) => `**${i + 1}.** ${warn.reason}\nSanctioned ${moment(warn.date).fromNow()} par <@!${warn.mod}>`).join('\n\n')}`))
    },
    name: 'infractions',
    guildOnly: true
}
