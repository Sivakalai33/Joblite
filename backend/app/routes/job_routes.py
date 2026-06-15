"""
from datetime import datetime

import mysql.connector"""

from flask import Blueprint, request, jsonify

from app.services.job_services import JobService
from app.utils.response import success_response, error_response

from app.validators.job_validator import validate_job

job_bp = Blueprint("Job", __name__)
service = JobService()


# Add Job
@job_bp.route("/api/add_job", methods=["POST"])
def add_job():
    try:
        data = request.get_json()
        print(data)
        # validation
        error = validate_job(data)
        if error:
            return error_response(error, 400)

        # optional: duplicate check (example by title + company)
        existing_job = service.get_job_by_title_and_company(
            data.get("job_title", "").strip().lower(),
            data.get("company_name", "").strip().lower()
        )

        if existing_job:
            return error_response("Job already exists", 409)

        res = service.create_job(data)
        return success_response(res, "Job added successfully", 201)

    except Exception as e:
        return error_response(str(e), 500)


# Get All Jobs
@job_bp.route("/api/jobs", methods=["GET"])
def list_jobs():
    try:
        jobs = service.list_all_jobs()
        return success_response(jobs, "Jobs fetched successfully", 200)
    except Exception as e:
        return error_response(str(e), 500)


# Get One Job full details
@job_bp.route("/api/joballdetail/<job_id>", methods=["GET"])
def alljobdetail(job_id):
    try:
        jobs = service.alljobdetail(job_id)
        return success_response(jobs, "Jobs fetched successfully", 200)
    except Exception as e:
        return error_response(str(e), 500)
        


@job_bp.route("/api/apply_job/<job_id>", methods=["POST"])
def apply_job(job_id):
    try:
        data = request.get_json()
        user_id = data.get("user_id")

        if not user_id:
            return error_response("User ID required", 400)

        # check duplicate apply (optional but good)
        existing = service.check_applied_job(user_id, job_id)
        if existing:
            return error_response("Already applied", 409)

        res = service.apply_job(user_id, job_id)

        return success_response(res, "Job applied successfully", 201)

    except Exception as e:
        print("ERROR:", e)
        return error_response("Internal server error", 500)
    

@job_bp.route("/api/register", methods=["POST"])
def register():
    try:
        data = request.get_json()

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")
        l_role = data.get("l_role")

        if not username or not email or not password or  not l_role:
            return error_response("All fields required", 400)

        res = service.create_user(data)

        return success_response(res, "User registered successfully", 201)

    except Exception as e:
        return error_response(str(e), 500)

@job_bp.route("/api/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        print(data)
        email = data.get("email")
        password = data.get("password")
        l_role = data.get("l_role")

        if not email or not password or  not l_role:
            return error_response("Email and password required", 400)

        user = service.login_user(email, password,l_role)

        if not user:
            return error_response("Invalid credentials", 401)

        return success_response(user, "Login successful", 200)

    except Exception as e:
        return error_response(str(e), 500)