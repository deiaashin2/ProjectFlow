PRAGMA foreign_keys = ON; -- Enable Foreign key support in SQLite

CREATE TABLE IF NOT EXISTS groups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  banner BLOB,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by_id INTEGER NOT NULL,
  FOREIGN KEY (created_by_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS group_members (
  user_id INTEGER NOT NULL,
  group_id INTEGER NOT NULL,
  joined_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (group_id) REFERENCES groups(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);