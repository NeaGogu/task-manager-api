const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})


// const me = new User({
//   name: '        Gugu    ',
//   email: 'alo@alo.com     ',
//   password: 'aloaapasswoard    '
// })

// const task = new Task({
//   description: 'Tidy house              ',
  
// })

// // me.save().then(() => {
// //   console.log(me);
// // }).catch((error) => {
// //   console.log(error)
// // })

// task.save().then(() => {
//   console.log(task);
// }).catch((error) => {
//   console.log(error)
// })