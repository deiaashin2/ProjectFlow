from db_utils import get_db_connection
from datetime import datetime, timezone


class Announcement:
    @classmethod
    def insert(cls, group_id, created_by_id, title, details):
        conn = get_db_connection()
        cursor = conn.cursor()
        created_at = datetime.now(timezone.utc)

        cursor.execute(
            """
            INSERT INTO announcements(group_id, created_by_id, title, details, created_at)
                VALUES (?, ?, ?, ?, ?)
            """,
            (group_id, created_by_id, title, details, created_at),
        )

        conn.commit()
        conn.close()

        return group_id

    @classmethod
    def get_by_id(cls, id):
        conn = get_db_connection()
        announcement = conn.execute(
            """
            SELECT created_by_id, title, details, created_at
            FROM announcements
            WHERE id = ?
            """,
            ([id]),
        ).fetchone()

        conn.close()

        if announcement is None:
            raise Exception("Announcement not found")

        return dict(announcement)

    @classmethod
    def get_all(cls, group_id):
        conn = get_db_connection()
        announcements = conn.execute(
            """
            SELECT announcements.id, announcements.created_by_id, users.name, announcements.title, announcements.details, announcements.created_at
            FROM announcements
            JOIN users ON announcements.created_by_id = users.id
            WHERE announcements.group_id = ?
            """,
            ([group_id])
        ).fetchall()

        conn.close()
        result = []
        for announcement in announcements:
            announcement_data = {
                "id": announcement["id"],
                "created_by": announcement["name"],
                "title": announcement["title"],
                "details": announcement["details"],
                "created_at": announcement["created_at"],
            }
            result.append(announcement_data)

        return result

    @classmethod
    def delete(cls, id):
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("DELETE FROM announcements WHERE id = ?", (id))

        conn.commit()
        conn.close()

        if cursor.rowcount == 0:
            conn.close()
            raise Exception("Announcement not found")

        conn.close()
        return {"id": id}
