module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('You dont have perms to use this command.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Please mention the member to kick.')
        if (member.id === message.guild.ownerID) return message.channel.send('You cant kick the server owner.')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('You cant kick this member.')
        if (!member.kickable) return message.channel.send('The bot cant kick this member.')
        const reason = args.slice(1).join(' ') || 'No reason provided'
        await member.kick(reason)
        message.channel.send(`${member.user.tag} was kicked from server! !`)
    },
    name: 'kick',
    guildOnly: true
}
