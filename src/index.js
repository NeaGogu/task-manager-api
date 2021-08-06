const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT;

// app.use((req, res, next) => {
//   // if(req.method === 'GET') {
//   //   res.send('GET reqs are disabled')
//   // } else {
//   //   next();
//   // }
//   // let maintenance = false;

//   // if(maintenance) {
//   //   res.status(503).send('Site is under maintenance');
//   // } else {
//   //   next();
//   // }
// })

// auto parse incoming json to object
app.use(express.json());

// setup routers
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log('Server is up on ' + port)
})


// ----------------------------

// const jwt = require('jsonwebtoken');

// const myFunc = async() => {
//   const token = jwt.sign({ _id: 'abc123'}, 'thisisme', { expiresIn: '7 days'});
//   console.log(token);

//   const data = jwt.verify(token, 'thisisme');
//   console.log(data);
// }

// myFunc();

// ------------------------------------------ task owner relation -------------------

// const Task = require('./models/task');
// const User = require('./models/user');

// const main = async() => {
//   const task = await Task.findById('6107ddd6c6eff922b03f26d6');
//   await task.populate('owner').execPopulate();
//   console.log(task.owner)

//   const user = await User.findById('6107dc6b57cdb027cc682751');
//   await user.populate('tasks').execPopulate();
//   console.log(user.tasks);
// }
//main()

// ----------------------------- File upload --------------------------------

// const multer = require('multer');
// const upload = multer({
//   dest: 'images',
//   limits: {
//     fileSize: 1000000,
//   },
//   fileFilter(req, file, cb) {
//     if(!file.originalname.match(/\.(doc|docx)$/)) {
//       return cb(new Error('file must be a Word Document!'));
//     }

//     cb(undefined, true);
    
//     // cb(new Error('file must be a PDF'));
//     // cb(undefined, true);
//     // cb(undefined, false);
//   }
// })


// app.post('/upload', upload.single('upload'),  (req, res) => {
//   res.send()
// }, (error, req, res, next) => {
//   res.status(400).send({ error: error.message});
// })

