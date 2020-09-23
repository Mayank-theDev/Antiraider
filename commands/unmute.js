module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You lack perms to use this command.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Please mention someone you want to unmute.')
        if (member.id === message.guild.ownerID) return message.channel.send('Server owner cant be muted.')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('You cant unmute this member.')
        if (!member.manageable) return message.channel.send('The bot failed to unmute this person.')
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie.'
        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')
        if (!muteRole) return message.channel.send('Il n\'There is no mute role.')
        await member.roles.remove(muteRole)
        message.channel.send(`${member} is now unmuted !`)
    },
    name: 'unmute',
    guildOnly: true
}
