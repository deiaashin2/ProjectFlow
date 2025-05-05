from flask import Blueprint, request, jsonify, session
from models.group import Group


group_bp = Blueprint("group_bp", __name__, url_prefix="/api/groups")


@group_bp.route("/", methods=["GET"])
def get_all_groups():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"message": "Invalid user"}), 401

    try:
        groups = Group.get_all(user_id)
        return jsonify(groups), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@group_bp.route("/<int:group_id>/", methods=["GET"])
def get_group(group_id):
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"message": "Invalid user"}), 401

    try:
        group = Group.get_by_id(user_id, group_id)
        return jsonify(group), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@group_bp.route("/", methods=["POST"])
def create_group():
    data = request.get_json()
    name = data.get("name")
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"message": "Invalid user"}), 401

    if not name:
        return jsonify({"message": "Name is required"}), 400

    try:
        new_group = Group.insert(name, user_id)
        return jsonify({"group": new_group})
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@group_bp.route("/<int:group_id>/", methods=["DELETE"])
def delete_group(group_id):
    try:
        result = Group.delete(group_id)
        return jsonify(result)
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@group_bp.route("/<int:group_id>/", methods=["PUT"])
def update_group(group_id):
    name = request.form.get("name")
    description = request.form.get("description")
    banner = request.files.get("banner")

    banner_data = None
    mime_type = None
    if banner:
        banner_data = banner.read()
        mime_type = banner.mimetype

    if not name:
        return jsonify({"message": "Name is required"}), 400

    try:
        result = Group.update(group_id, name, description, banner_data, mime_type)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@group_bp.route("/<int:group_id>/invite/", methods=["POST"])
def invite_member(group_id):
    data = request.get_json()
    email = data.get("email")  # Explicity pass the user id through post body

    if not email:
        return jsonify({"message": "Invalid user"}), 400

    try:
        result = Group.invite(email, group_id)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 400


@group_bp.route("/<int:group_id>/members/", methods=["GET"])
def get_members(group_id):
    try:
        members = Group.get_members(group_id)
        return jsonify(members), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500
