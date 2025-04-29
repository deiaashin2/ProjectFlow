from flask import Blueprint, request, jsonify
from models.group import Group


group_bp = Blueprint("group_bp", __name__, url_prefix="/api/groups")


@group_bp.route("/", methods=["GET"])
def get_all_groups():
    user_id = 1
    try:
        groups = Group.get_all(user_id)
        return jsonify({"groups": groups}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@group_bp.route("/<int:group_id>", methods=["GET"])
def get_group(group_id):
    user_id = 1
    try:
        groups = Group.get_by_id(user_id, group_id)
        return jsonify({"groups": groups}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@group_bp.route("/", methods=["POST"])
def create_group():
    data = request.get_json()
    name = data.get("name")
    description = data.get("description")
    created_by_id = data.get("created_by_id")

    try:
        new_group = Group.insert(name, created_by_id, description)
        return jsonify({"group": new_group})
    except Exception as e:
        return jsonify({"message": str(e)}), 500
