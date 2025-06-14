const express = require("express");
const router = express.Router();
const { auth, adminOnly } = require("../middlewares/auth");
const pool = require("../config/db");

// Get overview statistics
router.get("/overview", auth, adminOnly, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        COUNT(DISTINCT a.id) as total_activities,
        COUNT(DISTINCT ar.user_id) as total_participants,
        COUNT(DISTINCT CASE WHEN ar.response_type = 'attend' THEN ar.user_id END) as total_attendees,
        AVG(aa.completion_rate) as avg_completion_rate
      FROM activities a
      LEFT JOIN activity_responses ar ON a.id = ar.activity_id
      LEFT JOIN activity_analytics aa ON a.id = aa.activity_id
    `);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get monthly statistics
router.get("/monthly", auth, adminOnly, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        DATE_TRUNC('month', a.date) as month,
        COUNT(DISTINCT a.id) as activities_count,
        COUNT(DISTINCT ar.user_id) as participants_count,
        COUNT(DISTINCT CASE WHEN ar.response_type = 'attend' THEN ar.user_id END) as attendees_count
      FROM activities a
      LEFT JOIN activity_responses ar ON a.id = ar.activity_id
      GROUP BY DATE_TRUNC('month', a.date)
      ORDER BY month DESC
      LIMIT 12
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get category distribution
router.get("/categories", auth, adminOnly, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        a.category,
        COUNT(DISTINCT a.id) as activities_count,
        COUNT(DISTINCT ar.user_id) as participants_count,
        COUNT(DISTINCT CASE WHEN ar.response_type = 'attend' THEN ar.user_id END) as attendees_count,
        AVG(aa.completion_rate) as avg_completion_rate
      FROM activities a
      LEFT JOIN activity_responses ar ON a.id = ar.activity_id
      LEFT JOIN activity_analytics aa ON a.id = aa.activity_id
      GROUP BY a.category
      ORDER BY activities_count DESC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get top performing activities
router.get("/top-activities", auth, adminOnly, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        a.id,
        a.title,
        a.category,
        a.date,
        aa.attendee_count,
        aa.registration_count,
        aa.completion_rate
      FROM activities a
      JOIN activity_analytics aa ON a.id = aa.activity_id
      ORDER BY aa.attendee_count DESC
      LIMIT 10
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/recent-registrations", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        ar.user_id,
        u.name AS student_name,
        a.title AS activity_title,
        ar.created_at
      FROM activity_responses ar
      JOIN users u ON u.id = ar.user_id
      JOIN activities a ON a.id = ar.activity_id
      WHERE u.type = 'student'
      ORDER BY ar.created_at DESC
      LIMIT 5
    `);

    const recent = result.rows.map((row) => ({
      student: row.student_name,
      activity: row.activity_title,
      time: row.created_at,
    }));

    res.json({ data: recent });
  } catch (error) {
    console.error("❌ Error in recent-registrations:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/popular-activities", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        a.title,
        ac.title AS category_title,
        ac.description AS category_description,
        COUNT(ar.id) AS registrations
      FROM activities a
      LEFT JOIN activity_responses ar ON a.id = ar.activity_id
      LEFT JOIN activity_categories ac ON a.category = ac.id
      GROUP BY a.id, ac.title, ac.description
      ORDER BY registrations DESC
      LIMIT 5
    `);

    const popular = result.rows.map((row) => ({
      title: row.title,
      registrations: parseInt(row.registrations, 10),
      category_title: row.category_title,
      category_description: row.category_description,
    }));

    res.json({ data: popular });
  } catch (error) {
    console.error("❌ Error in popular-activities:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /analytics/monthly
router.get("/monthly", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        TO_CHAR(date, 'Mon') AS month,
        COUNT(DISTINCT user_id) AS registrations,
        COUNT(DISTINCT id) AS activities
      FROM activity_responses
      JOIN activities ON activity_responses.activity_id = activities.id
      GROUP BY TO_CHAR(date, 'Mon'), EXTRACT(MONTH FROM date)
      ORDER BY EXTRACT(MONTH FROM date)
    `);

    res.json(result.rows);
  } catch (err) {
    console.log("❌ Error in monthly analytics:", err.message);
    res.status(500).json({ error: "Failed to fetch monthly data" });
  }
});

// GET /analytics/category-distribution
router.get("/category-distribution", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        category AS name,
        COUNT(*) AS value,
        SUM((SELECT COUNT(*) FROM activity_responses WHERE activity_id = a.id)) AS registrations
      FROM activities a
      GROUP BY category
    `);

    res.json(result.rows);
  } catch (err) {
    console.log("❌ Error in category-distribution:", err.message);
    res.status(500).json({ error: "Failed to fetch category distribution" });
  }
});

// GET /analytics/top-activities
router.get("/top-activities", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT a.title AS name,
             COUNT(ar.id) AS registrations,
             ROUND(
               100.0 * COUNT(ar.attended) FILTER (WHERE ar.attended = true) / NULLIF(COUNT(ar.id), 0)
             ) AS completion
      FROM activities a
      LEFT JOIN activity_responses ar ON ar.activity_id = a.id
      GROUP BY a.id
      ORDER BY registrations DESC
      LIMIT 5
    `);

    res.json(result.rows);
  } catch (err) {
    console.log("❌ Error in top-activities:", err.message);
    res.status(500).json({ error: "Failed to fetch top activities" });
  }
});

// Get student statistics
router.get("/student-stats", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT 
        COUNT(DISTINCT CASE WHEN ar.response_type = 'attend' THEN ar.activity_id END) as activities_attended,
        COUNT(DISTINCT CASE WHEN ar.response_type = 'register' THEN ar.activity_id END) as registered_events,
        COALESCE(SUM(CASE WHEN ar.response_type = 'attend' THEN a.points ELSE 0 END), 0) as points_earned
      FROM activity_responses ar
      LEFT JOIN activities a ON ar.activity_id = a.id
      WHERE ar.user_id = $1
    `,
      [userId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error in student-stats:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Get activity statistics by category
router.get("/category-stats", auth, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        ac.id,
        ac.title,
        ac.description,
        COUNT(DISTINCT a.id) as total_activities,
        COUNT(DISTINCT CASE WHEN ar.response_type = 'register' THEN ar.activity_id END) as registered_activities,
        COUNT(DISTINCT CASE WHEN ar.response_type = 'attend' THEN ar.activity_id END) as attended_activities,
        COUNT(DISTINCT CASE WHEN a.date > CURRENT_DATE THEN a.id END) as upcoming_activities
      FROM activity_categories ac
      LEFT JOIN activities a ON a.category = ac.id
      LEFT JOIN activity_responses ar ON a.id = ar.activity_id
      GROUP BY ac.id, ac.title, ac.description
    `);

    const categoryStats = result.rows.map((row) => ({
      id: row.title?.toLowerCase(), // ← لتحطيم المفتاح مع الـ icons والألوان
      title: row.title,
      description: row.description,
      count: parseInt(row.total_activities),
      registered: parseInt(row.registered_activities),
      attended: parseInt(row.attended_activities),
      upcoming: parseInt(row.upcoming_activities),
    }));

    res.json(categoryStats);
  } catch (error) {
    console.error("❌ Error in category-stats:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Get recent student activities
router.get("/recent-student-activities", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT 
        a.title as activity,
        ac.title as section,
        a.image,
        a.description,
        ar.response_type as status,
        ar.created_at,
        CASE 
          WHEN ar.created_at > NOW() - INTERVAL '1 day' THEN '1 day ago'
          WHEN ar.created_at > NOW() - INTERVAL '7 days' THEN '1 week ago'
          WHEN ar.created_at > NOW() - INTERVAL '14 days' THEN '2 weeks ago'
          ELSE TO_CHAR(ar.created_at, 'DD/MM/YYYY')
        END as time_ago
      FROM activity_responses ar
      JOIN activities a ON ar.activity_id = a.id
      JOIN activity_categories ac ON a.category = ac.id
      WHERE ar.user_id = $1
      ORDER BY ar.created_at DESC
      LIMIT 5
    `,
      [userId]
    );

    const activities = result.rows.map((row) => ({
      activity: row.activity,
      section: row.section,
      status: row.status,
      image: row.image,
      description: row.description,
      date: row.time_ago,
    }));

    res.json(activities);
  } catch (error) {
    console.error("❌ Error in recent-student-activities:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
