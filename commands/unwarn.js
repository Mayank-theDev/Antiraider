const fs = require('fs')
 
module.exports = {
    run: async (message, args, client) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('looks like you are missing perms.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('whom do you want to unwarn?')
        if (!client.db.warns[member.id]) return message.channel.send('This member has no warnings.')
        const warnIndex = parseInt(args[1], 10) - 1
        if (warnIndex < 0 || !client.db.warns[member.id][warnIndex]) return message.channel.send('This warn doesnt exist.')
        const { reason } = client.db.warns[member.id].splice(warnIndex, 1)[0]
        if (!client.db.warns[member.id].length) delete client.db.warns[member.id]
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        message.channel.send(`${member} was unwarned for ${reason} !`)
    },
    name: 'unwarn',
    guildOnly: true
}
 
