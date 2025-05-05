from db_utils import get_db_connection
from datetime import datetime, timezone
import base64


class Group:
    @classmethod
    def insert(cls, name, created_by_id, description="", banner=None):
        conn = get_db_connection()
        cursor = conn.cursor()
        created_at = datetime.now(timezone.utc)

        cursor.execute(
            "INSERT INTO groups(name, description, banner, created_at, created_by_id) VALUES (?, ?, ?, ?, ?)",
            (name, description, banner, created_at, created_by_id),
        )

        group_id = cursor.lastrowid

        cursor.execute(
            "INSERT INTO group_members (user_id, group_id) VALUES (?, ?)",
            (created_by_id, group_id),
        )

        conn.commit()
        conn.close()

        return group_id

    @classmethod
    def get_by_id(cls, user_id, group_id):
        conn = get_db_connection()
        group = conn.execute(
            """SELECT groups.*
          FROM group_members
          JOIN groups ON group_members.group_id = groups.id
          WHERE group_members.user_id = ? AND group_members.group_id = ?""",
            (user_id, group_id),
        ).fetchone()

        conn.close()

        if group is None:
            raise Exception("Group not found")

        return dict(group)

    @classmethod
    def get_all(cls, user_id):
        conn = get_db_connection()
        groups = conn.execute(
            """SELECT groups.*
        FROM group_members
        JOIN groups ON group_members.group_id = groups.id
        WHERE group_members.user_id = ?""",
            (user_id,),
        ).fetchall()

        conn.close()
        result = []
        for group in groups:
            # Convert BLOB data to Base64
            banner_blob = group["banner"]
            banner_base64 = (
                base64.b64encode(banner_blob).decode("utf-8") if banner_blob else None
            )
            group_data = {
                "id": group["id"],
                "name": group["name"],
                "description": group["description"],
                "banner": banner_base64,
                "created_at": group["created_at"],
                "created_by_id": group["created_by_id"],
                "mime-type": group["banner_mime_type"],
            }
            result.append(group_data)

        return result

    @classmethod
    def delete(cls, group_id):
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("DELETE FROM groups WHERE id = ?", (group_id,))

        conn.commit()
        conn.close()

        if cursor.rowcount == 0:
            conn.close()
            raise Exception("Group not found")

        conn.close()
        return {"id": group_id}

    @classmethod
    def update(cls, group_id, name, description="", banner=None, mime_type=None):
        conn = get_db_connection()
        cursor = conn.cursor()

        if banner is not None:
            cursor.execute(
                "UPDATE groups SET name = ?, description = ?, banner = ?, banner_mime_type = ? WHERE id = ?",
                (name, description, banner, mime_type, group_id),
            )
        else:
            cursor.execute(
                "UPDATE groups SET name = ?, description = ?WHERE id = ?",
                (name, description, group_id),
            )

        conn.commit()
        conn.close()

        if cursor.rowcount == 0:
            raise Exception("Group not found")

        return {"message": "Updated group"}

    @classmethod
    def invite(cls, email, group_id):
        conn = get_db_connection()
        cursor = conn.cursor()

        result = cursor.execute(
            "SELECT id FROM users WHERE email = ?", (email,)
        ).fetchone()

        if not result:
            raise Exception("User not found")

        user_id = result[0]

        is_member = cursor.execute(
            "SELECT 1 from group_members WHERE user_id = ? AND group_id = ?",
            (user_id, group_id),
        ).fetchone()

        if is_member:
            conn.close()
            raise Exception("User is already a member of the group")

        cursor.execute(
            "INSERT INTO group_members (user_id, group_id) VALUES (?, ?)",
            (user_id, group_id),
        )

        conn.commit()
        conn.close()

        return {"message": "User added to group"}

    @classmethod
    def get_members(cls, group_id):
        conn = get_db_connection()
        cursor = conn.cursor()
        users = cursor.execute(
            """
        SELECT users.id, users.name, users.email
        FROM group_members
        JOIN users ON group_members.user_id = users.id
        WHERE group_members.group_id = ?
        LIMIT 8
        """,
            (group_id,),
        ).fetchall()

        result = []
        for user in users:
            user_data = {
                "id": user["id"],
                "name": user["name"],
                "email": user["email"],
            }
            result.append(user_data)

        conn.close()

        return result
