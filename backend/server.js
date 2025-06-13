require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { Pool } = require("pg");

// Initialize express app
const app = express();

// Database configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/activities", require("./routes/activities"));
app.use("/api/analytics", require("./routes/analytics"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
      status: err.status || 500,
    },
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const seedCategories = async () => {
//   const categories = [
//     { title: 'Sports', description: 'Sports-related activities' },
//     { title: 'Cultural', description: 'Cultural programs and events' },
//     { title: 'Scientific', description: 'Science and research activities' },
//     { title: 'Extracurricular', description: 'Other student activities' }
//   ];

//   for (const { title, description } of categories) {
//     const exists = await pool.query(
//       'SELECT 1 FROM activity_categories WHERE title = $1',
//       [title]
//     );

//     if (exists.rowCount === 0) {
//       await pool.query(
//         `INSERT INTO activity_categories (title, description)
//          VALUES ($1, $2)`,
//         [title, description]
//       );
//       console.log(`✅ Inserted category: ${title}`);
//     } else {
//       console.log(`ℹ️ Category already exists: ${title}`);
//     }
//   }

//   console.log('🎉 Seeding categories done.');
// };

// seedCategories()
//   .then(() => process.exit(0))
//   .catch((err) => {
//     console.error('❌ Error during seeding:', err.message);
//     process.exit(1);
//   });
