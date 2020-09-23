module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('You do not have permission to use this command.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Please mention the member to be banned.')
        if (member.id === message.guild.ownerID) return message.channel.send('You cannot ban the server owner.')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('You cant ban this member')
        if (!member.bannable) return message.channel.send('The bot cant ban this member')
        const reason = args.slice(1).join(' ') || 'No reason was given'
        await member.ban({reason})
        message.channel.send(`${member.user.tag} was banned, xD !`)
    },
    name: 'ban',
    guildOnly: true
}
