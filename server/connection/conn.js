const mongoose = require('mongoose');
const DB = 'mongodb+srv://20cse005ayushkumar:Shubham2001@cluster0.rjqk7cl.mongodb.net/?retryWrites=true&w=majority'
mongoose.set('strictQuery', true);
mongoose
  .connect(DB)
  .then(() => {
    console.log(`connection established`);
  })
  .catch((err) => console.log('no connection'));
