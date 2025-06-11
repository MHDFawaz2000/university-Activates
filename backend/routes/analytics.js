const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middlewares/auth');
const pool = require('../config/db');

// Get overview statistics
router.get('/overview', auth, adminOnly, async (req, res) => {
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
    res.status(500).json({ error: 'Server error' });
  }
});

// Get monthly statistics
router.get('/monthly', auth, adminOnly, async (req, res) => {
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
    res.status(500).json({ error: 'Server error' });
  }
});

// Get category distribution
router.get('/categories', auth, adminOnly, async (req, res) => {
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
    res.status(500).json({ error: 'Server error' });
  }
});

// Get top performing activities
router.get('/top-activities', auth, adminOnly, async (req, res) => {
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
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 