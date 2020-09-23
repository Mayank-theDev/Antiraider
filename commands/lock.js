const fs = require('fs')
 
module.exports = {
    run: (message, args, client) => {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('You miss perms to use this command.')
        const channel = message.mentions.channels.first() || message.channel
        if (client.db.lockedChannels.includes(channel.id)) return message.channel.send('This channel is already locked.')
        client.db.lockedChannels.push(channel.id)
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        message.channel.send('This channel has been locked !')
    },
    name: 'lock',
    guildOnly: true
}
