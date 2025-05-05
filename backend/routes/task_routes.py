from flask import Blueprint, request, jsonify
from models.task import Task

task_bp = Blueprint("task_routes", __name__)

@task_bp.route("/api/groups/<int:group_id>/tasks", methods=["GET"])
def list_tasks(group_id):
    return jsonify(Task.get_all_by_group(group_id))

@task_bp.route("/api/groups/<int:group_id>/tasks", methods=["POST"])
def create_task(group_id):
    data = request.get_json()
    name = data.get("name")
    due_date = data.get("due_date")
    detail = data.get("detail", "")
    status = data.get("status", "Pending")
    task_id = Task.create(group_id, name, due_date, detail, status)
    return jsonify({"success": True, "id": task_id})

@task_bp.route("/api/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    data = request.get_json()
    Task.update(task_id, data["name"], data["due_date"], data.get("detail", ""), data["status"])
    return jsonify({"success": True})

@task_bp.route("/api/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    Task.delete(task_id)
    return jsonify({"success": True})

@task_bp.route("/api/tasks/<int:task_id>", methods=["GET"])
def get_task(task_id):
    task = Task.get_by_id(task_id)
    if task:
        return jsonify({"success": True, "task": task})
    return jsonify({"success": False, "error": "Task not found"}), 404
