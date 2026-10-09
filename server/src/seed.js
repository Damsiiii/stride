require("dotenv").config();
const mongoose = require("mongoose");
const GalleryItem = require("./models/GalleryItem");

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not set.");
  process.exit(1);
}

const seedGallery = [
  {
    src: "/images/gallery/sensory-running.jpg",
    alt: "Runner on a scenic natural trail taking a mindful stride",
    caption: "A Sensory Journey",
    location: "Mindful Running",
    aspect: "aspect-[3/4]",
    order: 1,
    isActive: true,
  },
  {
    src: "/images/gallery/walk-run-intervals.jpg",
    alt: "Runner enjoying early morning run-walk intervals in sunrise light",
    caption: "Walk Before You Run",
    location: "Pacing & Adaptation",
    aspect: "aspect-[4/3]",
    order: 2,
    isActive: true,
  },
  {
    src: "/images/gallery/talk-test-pace.jpg",
    alt: "Runners pacing comfortably side-by-side in natural conversation",
    caption: "The 'Talk Test'",
    location: "Aerobic Base",
    aspect: "aspect-square",
    order: 3,
    isActive: true,
  },
  {
    src: "/images/gallery/posture-form.jpg",
    alt: "Athletic runner demonstrating tall posture and relaxed arm carriage",
    caption: "Run Tall & Relaxed",
    location: "Form & Biomechanics",
    aspect: "aspect-[3/4]",
    order: 4,
    isActive: true,
  },
  {
    src: "/images/gallery/ten-percent-rule.jpg",
    alt: "Running shoes on pavement prepared for a disciplined training progression",
    caption: "The 10% Rule",
    location: "Injury Prevention",
    aspect: "aspect-[4/3]",
    order: 5,
    isActive: true,
  },
  {
    src: "/images/gallery/active-recovery.jpg",
    alt: "Runner doing restorative mobility and mindful stretching after a run",
    caption: "Rest Is Part of Training",
    location: "Rest & Recovery",
    aspect: "aspect-square",
    order: 6,
    isActive: true,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB Atlas");
    await GalleryItem.deleteMany({});
    console.log("Cleared existing gallery items");
    await GalleryItem.insertMany(seedGallery);
    console.log("Seeded 6 running tips items from Oax Sport guide!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seed();
