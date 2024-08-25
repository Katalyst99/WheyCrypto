// backend/models/user.js
const db = require('../config/db');

class User {
    static async create({ username, email, password_hash }) {
      const query = 'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)';
      const [result] = await db.promise().execute(query, [username, email, password_hash]);

      // Fetch the newly created user with all fields including timestamps
      const newUserQuery = 'SELECT user_id, username, email, created_at, updated_at FROM users WHERE user_id = ?';
      const [newUser] = await db.promise().execute(newUserQuery, [result.insertId]);
      return newUser[0];
    }

    static async findByEmail(email) {
      const query = 'SELECT * FROM users WHERE email = ?';
      const [rows] = await db.promise().execute(query, [email]);
      return rows[0];
    }

    static async findById(user_id) {
      const query = 'SELECT * FROM users WHERE user_id = ?';
      const [rows] = await db.promise().execute(query, [user_id]);
      return rows[0];
    }

    static async deleteAll() {
      const query = 'DELETE FROM users';
      await db.promise().execute(query);
  }
}

module.exports = User;
