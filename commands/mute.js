module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Looks like you dont have perms.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Mention a member you want to mute.')
        if (member.id === message.guild.ownerID) return message.channel.send('You cant mute the server owner.')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('You cant mute this member.')
        if (!member.manageable) return message.channel.send('The bot cant mute this member.')
        const reason = args.slice(1).join(' ') || 'No reason was given.'
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
        message.channel.send(`${member} is muted! !`)
    },
    name: 'mute',
    guildOnly: true
}
