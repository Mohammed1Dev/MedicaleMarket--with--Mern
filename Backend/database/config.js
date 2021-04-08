const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/pottersvillage', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected with db Successfuly'))
  .catch(err => console.log('error db could not connect'))

// mongoose.connect(process.env.DATABASE, { useUnifiedTopology: true,  useNewUrlParser: true});
// mongoose.connection
//         .once('open', ()=>console.log('Connected with db Successfuly'))
//         .on('error', (err)=>{
//           console.log(`error db could not connect`, err);
//         });

module.exports = mongoose;