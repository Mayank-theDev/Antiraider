const fs = require('fs')
 
module.exports = {
    run: (message, args, client) => {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('You dont have perms to use this command')
        const channel = message.mentions.channels.first() || message.channel
        if (!client.db.lockedChannels.includes(channel.id)) return message.channel.send('This channel is already unlocked')
        client.db.lockedChannels.splice(client.db.lockedChannels.indexOf(channel.id), 1)
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        message.channel.send('This channel is now unlocked !')
    },
    name: 'unlock',
    guildOnly: true
}
