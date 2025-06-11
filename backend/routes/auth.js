const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const { auth } = require("../middlewares/auth");
const pool = require("../config/db");
//"/student/register"
router.post(
  "/student/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("student_id")
      .isLength({ min: 9, max: 9 })
      .withMessage("Student ID must be 9 digits")
      .matches(/^\d+$/)
      .withMessage("Student ID must contain only numbers"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name, student_id, email, password } = req.body;

    try {
      const exists = await pool.query(
        "SELECT 1 FROM users WHERE student_id = $1 OR email = $2",
        [student_id, email]
      );
      if (exists.rowCount > 0)
        return res
          .status(400)
          .json({ error: "Student ID or Email already registered" });

      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await pool.query(
        `INSERT INTO users (name, student_id, email, password, type)
         VALUES ($1, $2, $3, $4, 'student')
         RETURNING id, name, type`,
        [name, student_id, email, hashedPassword]
      );

      const user = result.rows[0];
      const token = jwt.sign(
        { id: user.id, type: user.type },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.status(201).json({ message: "Student registered", token, user });
    } catch (err) {
      console.error("Registration error:", err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Student login
router.post(
  "/student/login",
  body("student_id")
    .isLength({ min: 9, max: 9 })
    .withMessage("Student ID must be 9 characters"),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { student_id } = req.body;
      const result = await pool.query(
        "SELECT * FROM users WHERE student_id = $1 AND type = $2",
        [student_id, "student"]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({ error: "Invalid student ID" });
      }

      const user = result.rows[0];
      const token = jwt.sign(
        { id: user.id, type: user.type },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.json({
        token,
        user: { id: user.id, name: user.name, type: user.type },
      });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Admin login
router.post(
  "/admin/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      const result = await pool.query(
        "SELECT * FROM users WHERE email = $1 AND type = $2",
        [email, "admin"]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const user = result.rows[0];
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id, type: user.type },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.json({
        token,
        user: { id: user.id, name: user.name, type: user.type },
      });
    } catch (error) {
      console.error("❌ Login error:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Get current user
router.get("/me", auth, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, student_id, type FROM users WHERE id = $1",
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Logout (client-side token removal)
router.post("/logout", auth, (req, res) => {
  res.json({ message: "Logged out successfully" });
});

// Admin registration route
router.post(
  "/admin/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password } = req.body;

      // Check if email already exists
      const existing = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      if (existing.rows.length > 0) {
        return res.status(409).json({ error: "Email already in use" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert into DB
      const result = await pool.query(
        `INSERT INTO users (type, name, email, password) 
         VALUES ($1, $2, $3, $4) RETURNING id, name, type`,
        ["admin", name, email, hashedPassword]
      );

      res.status(201).json({
        message: "Admin registered successfully",
        user: result.rows[0],
      });
    } catch (error) {
      console.error("❌ Error registering admin:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;
