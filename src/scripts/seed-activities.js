const mongoose = require("mongoose");
const Activity = require("../models/activity.model");
require("dotenv").config();

const activities = [
  {
    title: "Morning Yoga Session",
    description:
      "Start your day with a refreshing yoga session. Perfect for beginners and intermediate practitioners.",
    location: "Central Park, New York",
    dateTime: new Date(Date.now() + 86400000), // Tomorrow
    capacity: 20,
    currentBookings: 0,
  },
  {
    title: "Coding Workshop: React Basics",
    description:
      "Learn the fundamentals of React.js in this hands-on workshop. Bring your laptop!",
    location: "Tech Hub, San Francisco",
    dateTime: new Date(Date.now() + 172800000), // Day after tomorrow
    capacity: 15,
    currentBookings: 0,
  },
  {
    title: "Photography Walk",
    description:
      "Explore urban photography techniques while walking through the city's most photogenic spots.",
    location: "Downtown District",
    dateTime: new Date(Date.now() + 259200000),
    capacity: 10,
    currentBookings: 0,
  },
  {
    title: "Cooking Class: Italian Cuisine",
    description:
      "Learn to make authentic Italian pasta and sauces from a professional chef.",
    location: "Culinary Arts Center",
    dateTime: new Date(Date.now() + 345600000),
    capacity: 12,
    currentBookings: 0,
  },
  {
    title: "Hiking Adventure",
    description:
      "Moderate difficulty hike with stunning views. Bring water and proper footwear.",
    location: "Mountain Trail Park",
    dateTime: new Date(Date.now() + 432000000),
    capacity: 25,
    currentBookings: 0,
  },
  {
    title: "Public Speaking Workshop",
    description: "Improve your presentation skills and overcome stage fright.",
    location: "Community Center",
    dateTime: new Date(Date.now() + 518400000),
    capacity: 15,
    currentBookings: 0,
  },
  {
    title: "Chess Tournament",
    description:
      "Friendly chess tournament for all skill levels. Prizes for winners!",
    location: "Game Cafe",
    dateTime: new Date(Date.now() + 604800000),
    capacity: 16,
    currentBookings: 0,
  },
  {
    title: "Wine Tasting Evening",
    description:
      "Sample wines from different regions and learn about wine pairing.",
    location: "Vineyard Tasting Room",
    dateTime: new Date(Date.now() + 691200000),
    capacity: 20,
    currentBookings: 0,
  },
  {
    title: "Dance Class: Salsa",
    description:
      "Learn basic salsa steps and moves in this beginner-friendly class.",
    location: "Dance Studio",
    dateTime: new Date(Date.now() + 777600000),
    capacity: 18,
    currentBookings: 0,
  },
  {
    title: "Startup Networking Event",
    description:
      "Connect with entrepreneurs and investors in the tech industry.",
    location: "Innovation Hub",
    dateTime: new Date(Date.now() + 864000000),
    capacity: 30,
    currentBookings: 0,
  },
  {
    title: "Meditation Session",
    description: "Guided meditation for stress relief and mindfulness.",
    location: "Wellness Center",
    dateTime: new Date(Date.now() + 950400000),
    capacity: 15,
    currentBookings: 0,
  },
  {
    title: "Book Club Meeting",
    description:
      "Discussion of this month's selected book: 'The Midnight Library'",
    location: "Public Library",
    dateTime: new Date(Date.now() + 1036800000),
    capacity: 20,
    currentBookings: 0,
  },
  {
    title: "Basketball Tournament",
    description: "3v3 basketball tournament. Teams of 3-4 players welcome.",
    location: "Sports Complex",
    dateTime: new Date(Date.now() + 1123200000),
    capacity: 24,
    currentBookings: 0,
  },
  {
    title: "Art Workshop: Watercolor",
    description: "Learn watercolor techniques and create your own masterpiece.",
    location: "Art Studio",
    dateTime: new Date(Date.now() + 1209600000),
    capacity: 12,
    currentBookings: 0,
  },
  {
    title: "Language Exchange",
    description: "Practice different languages with native speakers.",
    location: "International Cafe",
    dateTime: new Date(Date.now() + 1296000000),
    capacity: 25,
    currentBookings: 0,
  },
  {
    title: "Cycling Tour",
    description: "Guided cycling tour through scenic routes. Bikes provided.",
    location: "City Park",
    dateTime: new Date(Date.now() + 1382400000),
    capacity: 15,
    currentBookings: 0,
  },
  {
    title: "Poetry Reading",
    description:
      "Share your poems or listen to others in a supportive environment.",
    location: "Coffee House",
    dateTime: new Date(Date.now() + 1468800000),
    capacity: 20,
    currentBookings: 0,
  },
  {
    title: "Gardening Workshop",
    description: "Learn about urban gardening and sustainable practices.",
    location: "Community Garden",
    dateTime: new Date(Date.now() + 1555200000),
    capacity: 15,
    currentBookings: 0,
  },
  {
    title: "Tech Talk: AI Trends",
    description:
      "Discussion about current trends and future of artificial intelligence.",
    location: "Tech Conference Room",
    dateTime: new Date(Date.now() + 1641600000),
    capacity: 30,
    currentBookings: 0,
  },
  {
    title: "Music Jam Session",
    description: "Bring your instrument and join our casual music jam session.",
    location: "Music Studio",
    dateTime: new Date(Date.now() + 1728000000),
    capacity: 20,
    currentBookings: 0,
  },
];

const seedActivities = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing activities
    await Activity.deleteMany({});
    console.log("Cleared existing activities");

    // Insert new activities
    await Activity.insertMany(activities);
    console.log("Successfully seeded 20 activities");

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error seeding activities:", error);
    process.exit(1);
  }
};

seedActivities();
