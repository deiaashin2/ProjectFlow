from flask import Blueprint, request, jsonify, session
from models.group import Group


group_bp = Blueprint("group_bp", __name__, url_prefix="/api/groups")


@group_bp.route("/", methods=["GET"])
def get_all_groups():
    user_id = session.get("user_id")
    print("user_id: ", user_id)
    try:
        groups = Group.get_all(user_id)
        return jsonify(groups), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@group_bp.route("/<int:group_id>", methods=["GET"])
def get_group(group_id):
    user_id = session.get("user_id")
    try:
        group = Group.get_by_id(user_id, group_id)
        return jsonify(group), 200
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


@group_bp.route("/<int:group_id>", methods=["DELETE"])
def delete_group(group_id):
    try:
        result = Group.delete(group_id)
        return jsonify(result)
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@group_bp.route("/<int:group_id>/invite", methods=["POST"])
def invite_member(group_id):
    data = request.get_json()
    user_id = data.get("user_id")

    if not user_id:
        return jsonify({"message": "Invalid user"}), 500

    try:
        result = Group.invite(user_id, group_id)
        return jsonify(result), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400
