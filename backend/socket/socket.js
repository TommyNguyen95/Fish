const User = require('../schemas/userSchema');

const socket = (io) => {
  io.on('connection', socket => {
    console.log('User connected');

    socket.on('initialMessage', async username => {
      const data = await User.find({ username })
      const user = data[0];
      user.socketIds = [...user.socketIds, socket.id]
      user.save()
    })

    socket.on('paymentMessage', async message => {
      const receiver = await User.findById(message.to);
      if (receiver.socketIds.length) {
        receiver.socketIds.forEach(id => {
          // PaymentMessage should emit the message data
          // that will be displayed on the frontend
          io.to(id).emit('paymentMessage', 'betalning har skett')
        })
      }
    })

    socket.on('disconnect', async () => {
      console.log('User disconnected');
      const data = await User.find({ socketIds: socket.id })
      const user = data[0]
      user.socketIds = user.socketIds.filter(id => id !== socket.id)
      user.save()
    })
  })
}

module.exports = socket