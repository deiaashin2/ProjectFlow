import sqlite3
from datetime import datetime

def get_db_connection():
    conn = sqlite3.connect("instance/database.db")
    conn.row_factory = sqlite3.Row
    return conn

class Task:
    @classmethod
    def create(cls, group_id, name, due_date, detail, status):
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO tasks (group_id, name, due_date, detail, status, created_at) VALUES (?, ?, ?, ?, ?, ?)",
            (group_id, name, due_date, detail, status, datetime.utcnow())
        )
        conn.commit()
        task_id = cur.lastrowid
        conn.close()
        return task_id

    @classmethod
    def get_all_by_group(cls, group_id):
        conn = get_db_connection()
        tasks = conn.execute(
            "SELECT * FROM tasks WHERE group_id = ?", (group_id,)
        ).fetchall()
        conn.close()
        return [dict(task) for task in tasks]

    @classmethod
    def update(cls, task_id, name, due_date, detail, status):
        conn = get_db_connection()
        conn.execute(
            "UPDATE tasks SET name=?, due_date=?, detail=?, status=? WHERE id=?",
            (name, due_date, detail, status, task_id)
        )
        conn.commit()
        conn.close()

    @classmethod
    def delete(cls, task_id):
        conn = get_db_connection()
        conn.execute("DELETE FROM tasks WHERE id=?", (task_id,))
        conn.commit()
        conn.close()

    @classmethod
    def get_by_id(cls, task_id):
        conn = get_db_connection()
        task = conn.execute(
            "SELECT * FROM tasks WHERE id=?", (task_id,)
        ).fetchone()
        conn.close()
        return dict(task) if task else None  