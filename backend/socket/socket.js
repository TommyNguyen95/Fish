const User = require('../schemas/userSchema');

const socket = (io) => {
  io.on('connection', socket => {
    socket.on('initialMessage', async username => {
      const data = await User.find({ username })
      const user = data[0];
      user.socketIds = [...user.socketIds, socket.id]
      user.save()
    })

    socket.on('paymentMessage', async message => {
      const receiver = await User.findById(message.to);
      const sender = await User.findById(message.from).select('username');
      message.from = sender.username
      delete message.to;
      if (receiver.socketIds.length) {
        receiver.socketIds.forEach(id => {
          io.to(id).emit('paymentMessage', message);
        })
      }
    })

    socket.on('disconnect', async () => {
      const data = await User.find({ socketIds: socket.id })
      const user = data[0]
      // console.log(data)
      // user.socketIds = user.socketIds.filter(id => id !== socket.id)
      // user.save()
    })
  })
}

module.exports = socket