const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { auth, adminOnly } = require("../middlewares/auth");
const pool = require("../config/db");

// Get all activities with filters
router.get("/", async (req, res) => {
  try {
    const { category, date, search } = req.query;
    let query = "SELECT * FROM activities WHERE 1=1";
    const params = [];
    let paramCount = 1;

    if (category) {
      query += ` AND category = $${paramCount}`;
      params.push(category);
      paramCount++;
    }

    if (date) {
      query += ` AND date = $${paramCount}`;
      params.push(date);
      paramCount++;
    }

    if (search) {
      query += ` AND (title ILIKE $${paramCount} OR description ILIKE $${paramCount})`;
      params.push(`%${search}%`);
      paramCount++;
    }

    query += " ORDER BY date DESC, time ASC";
    const result = await pool.query(query, params);
    console.log(result.rows);

    res.json(result.rows);
  } catch (error) {
    console.log("Error fetching activities:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get activities by category
router.get("/category/:category", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM activities WHERE category = $1 ORDER BY date DESC, time ASC",
      [req.params.category]
    );
    res.json(result.rows);
  } catch (error) {
    console.log("Error fetching activities by category:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get activities for a specific category by ID
router.get("/category/:categoryId/details", auth, async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const result = await pool.query(
      `
      SELECT 
        a.*,
        ac.title AS category_title,
        COUNT(DISTINCT CASE WHEN ar.response_type = 'attend' THEN ar.user_id END) as attendee_count,
        COUNT(DISTINCT CASE WHEN ar.response_type = 'register' THEN ar.user_id END) as registered_count,
        ar2.response_type AS user_response
      FROM activities a
      JOIN activity_categories ac ON a.category = ac.id
      LEFT JOIN activity_responses ar ON a.id = ar.activity_id
      LEFT JOIN activity_responses ar2 ON a.id = ar2.activity_id AND ar2.user_id = $2
      WHERE a.category = $1
      GROUP BY a.id, ac.title, ar2.response_type
      ORDER BY a.date DESC, a.time ASC
    `,
      [categoryId, req.user.id]
    );

    const activities = result.rows.map((row) => ({
      ...row,
      attendeeCount: parseInt(row.attendee_count),
      registeredCount: parseInt(row.registered_count),
      userResponse: row.user_response,
      category: row.category_title,
    }));

    res.json(activities);
  } catch (error) {
    console.error("❌ Error fetching activities by category:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all activity categories
router.get("/categories", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, title FROM activity_categories"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching categories:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Create new activity (admin only)
router.post(
  "/",
  auth,
  adminOnly,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("category").notEmpty().withMessage("Category is required"),
    body("date").isDate().withMessage("Valid date is required"),
    body("time")
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .withMessage("Valid time is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        title,
        description,
        category,
        date,
        time,
        location,
        duration,
        image,
      } = req.body;

      const result = await pool.query(
        `INSERT INTO activities 
        (title, description, category, date, time, location, duration, image, created_by)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *`,
        [
          title,
          description,
          category,
          date,
          time,
          location,
          duration,
          image,
          req.user.id,
        ]
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.log("Error creating activity:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Update activity (admin only)
router.put(
  "/:id",
  auth,
  adminOnly,
  [
    body("title").optional().notEmpty().withMessage("Title cannot be empty"),
    body("category")
      .optional()
      .notEmpty()
      .withMessage("Category cannot be empty"),
    body("date").optional().isDate().withMessage("Valid date is required"),
    body("time")
      .optional()
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .withMessage("Valid time is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const updates = req.body;
      const allowedUpdates = [
        "title",
        "description",
        "category",
        "date",
        "time",
        "location",
        "duration",
        "image",
      ];
      const validUpdates = Object.keys(updates).filter((key) =>
        allowedUpdates.includes(key)
      );

      if (validUpdates.length === 0) {
        return res.status(400).json({ error: "No valid updates provided" });
      }

      const setClause = validUpdates
        .map((key, index) => `${key} = $${index + 1}`)
        .join(", ");
      const values = validUpdates.map((key) => updates[key]);
      values.push(id);

      const result = await pool.query(
        `UPDATE activities 
        SET ${setClause}, updated_at = NOW()
        WHERE id = $${values.length}
        RETURNING *`,
        values
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Activity not found" });
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.log("Error updating activity:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Delete activity (admin only)
router.delete("/:id", auth, adminOnly, async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM activities WHERE id = $1 RETURNING *",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Activity not found" });
    }

    res.json({ message: "Activity deleted successfully" });
  } catch (error) {
    console.log("Error deleting activity:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Submit activity response
router.post(
  "/:id/responses",
  auth,
  [
    body("response_type")
      .isIn(["attend", "not_attend", "time_conflict"])
      .withMessage("Valid response type required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const { response_type } = req.body;

      // Check if activity exists
      const activityResult = await pool.query(
        "SELECT * FROM activities WHERE id = $1",
        [id]
      );

      if (activityResult.rows.length === 0) {
        return res.status(404).json({ error: "Activity not found" });
      }

      // Insert or update response
      const result = await pool.query(
        `INSERT INTO activity_responses (activity_id, user_id, response_type)
        VALUES ($1, $2, $3)
        ON CONFLICT (activity_id, user_id)
        DO UPDATE SET response_type = $3, updated_at = NOW()
        RETURNING *`,
        [id, req.user.id, response_type]
      );

      // Update analytics
      await pool.query(
        `INSERT INTO activity_analytics (activity_id, attendee_count, registration_count)
        SELECT 
          $1,
          COUNT(CASE WHEN response_type = 'attend' THEN 1 END),
          COUNT(*)
        FROM activity_responses
        WHERE activity_id = $1
        ON CONFLICT (activity_id)
        DO UPDATE SET
          attendee_count = EXCLUDED.attendee_count,
          registration_count = EXCLUDED.registration_count,
          completion_rate = (EXCLUDED.attendee_count::float / NULLIF(EXCLUDED.registration_count, 0)) * 100,
          last_calculated = NOW()`,
        [id]
      );

      res.json(result.rows[0]);
    } catch (error) {
      console.log("Error submitting activity response:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Get activity responses (admin only)
router.get("/:id/responses", auth, adminOnly, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT ar.*, u.name, u.student_id
      FROM activity_responses ar
      JOIN users u ON ar.user_id = u.id
      WHERE ar.activity_id = $1
      ORDER BY ar.created_at DESC`,
      [req.params.id]
    );
    res.json(result.rows);
  } catch (error) {
    console.log("Error fetching activity responses:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get activity by ID
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM activities WHERE id = $1", [
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Activity not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.log("Error fetching activity:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
