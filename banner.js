const mongoose = require('mongoose')

// Define the schema for the nearly good message
const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  awardReceived: {
    type: String,
    required: true
  },
  awardSubject: {
    type: String,
    required: true
  },
  awardScale: {
    type: String,
    required: true
  },
  experiences: {
    type: String,
    required: true
  },
  photos: [
    {
      type: String
    }
  ]
})

// Create a Mongoose model
const Message = mongoose.model('banner', Schema)

// Function to create a new nearly good message record
async function create(awardWinners) {
  try {
    const res = new Message({ awardWinners })
    await res.save()
  } catch (error) {
    console.error('Error creating nearly good message:', error)
  }
}

// Function to retrieve all nearly good messages
async function getBannerData() {
  try {
    const res = await Message.find()
    return res
  } catch (error) {
    console.error('Error fetching nearly good messages:', error)
  }
}

// Connect to MongoDBmongodb://
mongoose
  .connect(
    'mongodb+srv://1207888735:qaz1231207@cluster0.1o7e993.mongodb.net/school',
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
  getBannerData
}
