const parseDuration = require('parse-duration'),
    humanizeDuration = require('humanize-duration')
 
module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('you dont have perms to use this command.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Please mention someone you want to mute.')
        if (member.id === message.guild.ownerID) return message.channel.send('Server owner cant be muted.')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('That member cant be muted.')
        if (!member.manageable) return message.channel.send('The bot cant mute that person.')
        const duration = parseDuration(args[1])
        if (!duration) return message.channel.send('Please specify a valid duration.')
        const reason = args.slice(2).join(' ') || 'No reason was provided.'
        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')
        if (!muteRole) {
            muteRole = await message.guild.roles.create({
                data: {
                    name: 'Muted',
                    permissions: 0
                }
            })
            message.guild.channels.cache.forEach(channel => channel.createOverwrite(muteRole, {
                SEND_MESSAGES: false,
                CONNECT: false,
                ADD_REACTIONS: false
            }))
        }
        await member.roles.add(muteRole)
        message.channel.send(`${member} was muted for ${humanizeDuration(duration, {language: 'fr'})} !`)
        setTimeout(() => {
            if (member.deleted || !member.manageable) return
            member.roles.remove(muteRole)
            message.channel.send(`${member} is unmuted now.`)
        }, duration)
    },
    name: 'tempmute',
    guildOnly: true
}
