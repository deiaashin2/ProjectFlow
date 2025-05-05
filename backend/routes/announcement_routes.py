from flask import Blueprint, request, jsonify, session
from models.announcement import Announcement


announcement_bp = Blueprint("announcement_bp", __name__, url_prefix="/api/announcements")


@announcement_bp.route("/<int:group_id>", methods=["GET"])
def get_all_announcements(group_id):
    try:
        announcements = Announcement.get_all(group_id)
        return jsonify(announcements), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@announcement_bp.route("/<int:group_id>/<int:announcement_id>", methods=["GET"])
def get_group(announcement_id):
    try:
        announcement = Announcement.get_by_id(announcement_id)
        return jsonify(announcement), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@announcement_bp.route("/", methods=["POST"])
def create_announcement():
    data = request.get_json()
    group_id = data.get("group_id")
    created_by_id = session.get("user_id")
    title = data.get("title")
    details = data.get("details")

    try:
        new_announcement = Announcement.insert(group_id, created_by_id, title, details)
        return jsonify({"Announcement": new_announcement})
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@announcement_bp.route("/<int:announcement_id>", methods=["DELETE"])
def delete_announcement(id):
    try:
        result = Announcement.delete(id)
        return jsonify(result)
    except Exception as e:
        return jsonify({"message": str(e)}), 500

