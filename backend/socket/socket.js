const User = require('../schemas/userSchema');

const socket = (io) => {
  io.on('connection', socket => {
    console.log('User connected');

    socket.on('initialMessage', async username => {
      const user = await User.find({ username })
      user[0].socketIds = [...user[0].socketIds, socket.id]
      user[0].save()
    })

    socket.on('disconnect', async () => {
      const user = await User.find({ socketIds: socket.id })
      user[0].socketIds = user[0].socketIds.filter(id => id !== socket.id)
      user[0].save()
    })
  })
}

module.exports = socket