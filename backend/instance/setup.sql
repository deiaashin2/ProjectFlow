PRAGMA foreign_keys = ON; -- Enable Foreign key support in SQLite

DROP TABLE IF EXISTS group_members;
DROP TABLE IF EXISTS groups;

CREATE TABLE groups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  banner BLOB,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by_id INTEGER NOT NULL,
  FOREIGN KEY (created_by_id) REFERENCES user(id)
);

CREATE TABLE group_members (
  user_id INTEGER NOT NULL,
  group_id INTEGER NOT NULL,
  joined_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, group_id),
  FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES user(id)
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
