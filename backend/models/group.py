from db_utils import get_db_connection
from datetime import datetime, timezone


class Group:
    @classmethod
    def insert(cls, name, created_by_id, description="", banner=None):
        conn = get_db_connection()
        cursor = conn.cursor()
        created_at = datetime.now(timezone.utc)

        cursor.execute(
            """INSERT INTO groups(name, description, banner, created_at, created_by_id)
                   VALUES (?, ?, ?, ?, ?)""",
            (name, description, banner, created_at, created_by_id),
        )

        group_id = cursor.lastrowid
        cursor.execute(
            """
        INSERT INTO group_members (user_id, group_id)
        VALUES (?, ?)
        """,
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
            """SELECT group_members.*, groups.*
        FROM group_members
        JOIN groups ON group_members.group_id = groups.id
        WHERE group_members.user_id = ?""",
            (user_id,),
        ).fetchall()

        if not groups:
            raise Exception("No groups found for user")

        conn.close()
        print(groups)
        result = []
        for group in groups:
            group_data = {
                "group_id": group["group_id"],
                "user_id": group["user_id"],
                "name": group["name"],
                "description": group["description"],
                "banner": group["banner"],
                "created_at": group["created_at"],
            }
            result.append(group_data)

        return result
