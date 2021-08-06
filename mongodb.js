// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const {MongoClient, ObjectId} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// const id = new ObjectId();
// console.log(id);
// console.log(id.getTimestamp());

MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) => {
  if (error) {
    return console.log('Unable to connect!');
  }

  const db = client.db(databaseName);
  
  //READ

  // db.collection('users').findOne({name: 'Jen'}, (error, user) => {
  //   if(error) {
  //     return console.log('lala')
  //   }
  //   console.log(user)
  // })

  // find returns a Pointer, it does not have a callback
  // db.collection('users').find({ age: 19 }).toArray((error, users) => {
  //   console.log(users)
  // })


  // UPDATING
  // db.collection('users').updateOne( {
  //   _id: new ObjectId('60f0a4f804515e42a04d20aa')
  // }, {
  //   $set: {
  //     name: 'Mike'
  //   }
  // }).then((result) => {
  //   console.log(result)
  // }).catch((error) => {
  //   console.log(error);
  // })

  // DELETE
  db.collection('users').deleteMany({
    age: 19
  }).then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log(error);
  })

})