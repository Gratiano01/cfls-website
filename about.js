const mongoose = require('mongoose')

// Define the schema for the nearly good message
const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  photos: {
    type: String,
    required: true
  }
})

// Create a Mongoose model
const Message = mongoose.model('about', Schema)

// Function to create a new nearly good message record
async function create(options) {
  try {
    const res = new Message(options)
    await res.save()
    console.log('Nearly good message created successfully:', res)
  } catch (error) {
    console.error('Error creating nearly good message:', error)
  }
}

// Function to retrieve all nearly good messages
async function getData() {
  try {
    const res = await Message.findOne()
    return res
  } catch (error) {
    console.error('Error fetching nearly good messages:', error)
  }
}

// Connect to MongoDBmongodb://
mongoose
  .connect(
    'mongodb+srv://3564028649:JuZOZdN8WLlCONx8@gratiano.iuy275q.mongodb.net/cfls_data',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log('Connected to MongoDB')
    // Example usage:
    // const awardWinners = [{
    //   name: 'John Doe',
    //   awardReceived: 'Best Student of the Year',
    //   awardSubject: 'Mathematics',
    //   awardScale: 'School Level',
    //   experiences: 'John excelled in mathematics throughout the year and actively participated in various math competitions.'
    // }];
    // createNearlyGoodMessage(awardWinners);
    // getAllNearlyGoodMessages();
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err))

module.exports = {
  create,
  getData
}
