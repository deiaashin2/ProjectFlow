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
  password TEXT NOT NULL
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
  FOREIGN KEY (group_id) REFERENCES groups(id),
  FOREIGN KEY (created_by_id) REFERENCES users(id) 
);

CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  group_id INTEGER NOT NULL,
  user_id INTEGER,
  name TEXT NOT NULL,
  detail TEXT,
  status TEXT,
  due_date TEXT,
  created_at TEXT,
  FOREIGN KEY (group_id) REFERENCES groups(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE task_statuses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
);

CREATE TABLE messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  from_user_id INTEGER NOT NULL,
  contents TEXT,
  sent_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  seen_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (from_user_id) REFERENCES users(id)
);


-- Seed script
INSERT INTO users (name, email, password)
VALUES
  ('Andreia', 'deiaashin@gmail.com', 'Shin123'),
  ('Marlene', 'marlenelee1267@gmaill.com', 'Ma12345'),
  ('Test', 'test@test.com', 'test1234');

INSERT INTO groups (name, description, banner, created_by_id)
VALUES 
  ('First Group', 'Hello world.', NULL, 1),
  ('Programming', 'A group for programming.', NULL, 1),
  ('Team', 'Team project', NULL, 2);

INSERT INTO group_members (user_id, group_id)
VALUES 
  (1, 1),
  (1, 2),  
  (2, 3);

INSERT INTO announcements (
  group_id,
  created_by_id,
  title,
  details
)
VALUES
  (
    1,
    1,
    "Test announcement!",
    NULL
  ),
  (
    2,
    3,
    "Test announcement!",
    NULL
  );

INSERT INTO task_statuses (name)
VALUES 
  ('Inactive'),
  ('Pending'),
  ('Done'),
  ('Late'),
  ('Canceled');

INSERT INTO tasks (
  group_id,
  user_id,
  name,
  details,
  status_id,
  due_date
)
VALUES
  (
    1,
    1,
    "Use this data in the frontend",
    "Fetch this data and display it in the front end",
    1,
    NULL
  );

INSERT INTO messages (
  user_id,
  from_user_id,
  contents
)
VALUES
  (
    1,
    2,
    "Psst. Here's a message within our group."
  ),
  (
    3,
    2,
    "Hey, I'm not in a group with you! I think. Is this allowed?"
  );