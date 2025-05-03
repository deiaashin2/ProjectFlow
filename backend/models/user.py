import sqlite3
import os

def get_db_connection():
    db_path = os.path.join(os.path.dirname(__file__), '..', 'instance', 'database.db')
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn

class User:
    @classmethod
    def create(cls, email, password, name=""):
        conn = get_db_connection()
        cursor = conn.cursor()

        existing = cursor.execute(
            "SELECT * FROM users WHERE email = ?", (email,)
        ).fetchone()

        if existing:
            conn.close()
            raise Exception("Email already exists.")

        cursor.execute(
            "INSERT INTO users (email, password, name) VALUES (?, ?, ?)",
            (email, password, name),
        )
        conn.commit()
        user_id = cursor.lastrowid
        conn.close()
        return user_id

    @classmethod
    def get_by_email_and_password(cls, email, password):
        conn = get_db_connection()
        cursor = conn.cursor()
        user = cursor.execute(
            "SELECT * FROM users WHERE email = ? AND password = ?",
            (email, password),
        ).fetchone()
        conn.close()
        return dict(user) if user else None

    @classmethod
    def get_by_email(cls, email):
        conn = get_db_connection()
        cursor = conn.cursor()
        user = cursor.execute(
            "SELECT * FROM users WHERE email = ?", (email,)
        ).fetchone()
        conn.close()
        return dict(user) if user else None
    
    @classmethod
    def get_by_id(cls, id):
        conn = get_db_connection()
        cursor = conn.cursor()
        user = cursor.execute(
            "SELECT id, name, email FROM users WHERE id = ?", (id,)
        ).fetchone()
        conn.close()

        if user:
          return dict(user)
        else:
          return None
    