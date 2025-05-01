PRAGMA foreign_keys = ON; -- Enable Foreign key support in SQLite

DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS task_statuses;
DROP TABLE IF EXISTS announcements;
DROP TABLE IF EXISTS group_members;
DROP TABLE IF EXISTS groups;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  PASSWORD TEXT NOT NULL
);

CREATE TABLE groups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  banner BLOB,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by_id INTEGER NOT NULL,
  FOREIGN KEY (created_by_id) REFERENCES users(id)
);

CREATE TABLE group_members (
  user_id INTEGER NOT NULL,
  group_id INTEGER NOT NULL,
  joined_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, group_id),
  FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE announcements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  group_id INTEGER NOT NULL,
  created_by_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  details TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN (group_id) REFERENCES groups(id),
  FOREIGN (created_by_id) REFERENCES users(id) 
)

CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  group_id INTEGER NOT NULL,
  user_id INTEGER,
  name TEXT NOT NULL,
  details TEXT,
  status_id INTEGER,
  due_date DATETIME,
  FOREIGN KEY (group_id) REFERENCES groups(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (status_id) REFERENCES task_statuses(id)
);

CREATE TABLE task_statuses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
);

CREAT TABLE messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  from_user_id INTEGER NOT NULL,
  contents TEXT,
  sent_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  seen_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (from_user_id) REFERENCES users(id)
);


-- Seed script
INSERT INTO groups (name, description, banner, created_by_id)
VALUES 
  ('First Group', 'Hello world.', NULL, 3),
  ('Programming', 'A group for programming.', NULL, 3),
  ('Team', 'Team project', NULL, 3);

INSERT INTO group_members (user_id, group_id)
VALUES 
  (3, 1),
  (3, 2),  
  (3, 3);
