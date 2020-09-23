const parseDuration = require('parse-duration'),
    humanizeDuration = require('humanize-duration')
 
module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('Please, you dont have perms to ban someone.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Please mention someone you want to ban temporarily.')
        if (member.id === message.guild.ownerID) return message.channel.send('You cant ban the owner.')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('you cant ban this member.')
        if (!member.bannable) return message.channel.send('The bot failed to ban that member.')
        const duration = parseDuration(args[1])
        if (!duration) return message.channel.send('Please specify the duration,use m for minutes, s for seconds, and similarly.')
        const reason = args.slice(2).join(' ') || 'No reason was given'
        await member.ban({reason})
        message.channel.send(`${member.user.tag} Was banned because of ${humanizeDuration(duration, {language: 'fr'})} !`)
        setTimeout(() => {
            message.guild.members.unban(member)
            message.channel.send(`${member.user.tag} is banned from this server`)
        }, duration)
    },
    name: 'tempban',
    guildOnly: true
}
