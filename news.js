const mongoose = require('mongoose')

// Define the schema for the nearly good message
const newsSchema = new mongoose.Schema({
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
const NearlyGoodMessage = mongoose.model('news', newsSchema)

// Function to create a new nearly good message record
async function createnews(awardWinners) {
  try {
    const nearlyGoodMessage = new NearlyGoodMessage({ awardWinners })
    await nearlyGoodMessage.save()
    console.log('Nearly good message created successfully:', nearlyGoodMessage)
  } catch (error) {
    console.error('Error creating nearly good message:', error)
  }
}

// Function to retrieve all nearly good messages
async function getAllnews() {
  try {
    const nearlyGoodMessages = await NearlyGoodMessage.find()
    return nearlyGoodMessages
    console.log('All nearly good messages:', nearlyGoodMessages)
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
  getAllnews,
  createnews
}
