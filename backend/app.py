from flask import Flask, request, jsonify, session, make_response
from flask_cors import CORS
from models.user import User
from routes.group_routes import group_bp
from datetime import timedelta
import re

app = Flask(__name__)
app.secret_key = "secret"
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=7)
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config['SESSION_COOKIE_SECURE'] = False 

CORS(app, resources={r"/api/*": {"origins": ["http://localhost:5173", "http://localhost:5000"]}}, supports_credentials=True)

app.register_blueprint(group_bp)

@app.before_request
def make_session_permanent():
    session.permanent = True

def is_valid_password(password):
    if len(password) < 8:
        return "Password must be at least 8 characters long."
    if not re.search(r"[A-Z]", password):
        return "Password must contain at least one uppercase letter."
    if not re.search(r"[a-z]", password):
        return "Password must contain at least one lowercase letter."
    if not re.search(r"\d", password):
        return "Password must contain at least one digit."
    if not re.search(r"[!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?]", password):
        return "Password must contain at least one special character."
    return None

@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    name = data.get("name", "")

    if not email or not password:
        return jsonify({"success": False, "message": "Email and password required."}), 400

    error_message = is_valid_password(password)
    if error_message:
        return jsonify({"success": False, "message": error_message}), 400

    try:
        user_id = User.create(email, password, name)
        return jsonify({"success": True, "message": "Account created!", "user_id": user_id}), 201
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 409

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"success": False, "message": "Email and password required."}), 400

    user = User.get_by_email_and_password(email, password)

    if user:
        session["user_id"] = user["id"]
        return jsonify({"success": True, "message": "Login successful.", "user_id": user["id"]}), 200
    else:
        return jsonify({"success": False, "message": "Invalid credentials."}), 401

@app.route("/api/signout", methods=["POST"])
def signout():
    session.clear()
    return jsonify({"success": True}), 200

@app.route("/api/auth", methods=["GET"])
def auth_status():
    user_id = session.get("user_id")
    if user_id is None:
        return jsonify({"isAuthenticated" : False, "user": None}), 200
    
    user = User.get_by_id(user_id)

    if user:
        return jsonify({"isAuthenticated" : True, "user": {
              "id": user["id"],
              "name": user["name"],
              "email": user["email"]
        }}), 200
    else:
        return jsonify({"isAuthenticated": False, "user": None }), 200

@app.route('/debug')
def debug_session():
    return jsonify(dict(session))

if __name__ == "__main__":
    app.run(debug=True)