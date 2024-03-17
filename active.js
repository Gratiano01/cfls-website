const mongoose = require('mongoose')

// Define the schema for the activity
const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  briefIntroduction: {
    type: String,
    required: true
  },
  detailedIntroduction: {
    type: String,
    required: true
  },
  studentComments: [
    {
      type: String
    }
  ],
  photos: [
    {
      type: String
    }
  ]
})

// Create a Mongoose model
const Activity = mongoose.model('Activity', activitySchema)

// Function to create a new activity record
async function createActivity(
  name,
  startTime,
  endTime,
  briefIntroduction,
  detailedIntroduction,
  studentComments
) {
  try {
    const activity = new Activity({
      name,
      startTime,
      endTime,
      briefIntroduction,
      detailedIntroduction,
      studentComments
    })
    await activity.save()
    console.log('Activity created successfully:', activity)
  } catch (error) {
    console.error('Error creating activity:', error)
  }
}

// Function to retrieve all activities
async function getAllActivities() {
  try {
    const activities = await Activity.find()
    return activities
  } catch (error) {
    console.error('Error fetching activities:', error)
  }
}

// Connect to MongoDB
// mongodb+srv://1207888735:<password>@cluster0.1o7e993.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
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
    // createActivity('Science Fair', new Date('2024-03-15T09:00:00'), new Date('2024-03-15T17:00:00'), 'Annual science fair showcasing student projects.', 'The science fair is a great opportunity for students to demonstrate their scientific knowledge and creativity.', ['Excellent event!', 'Really enjoyed the projects.']);
    // getAllActivities();
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err))

module.exports = {
  getAllActivities,
  createActivity
}
