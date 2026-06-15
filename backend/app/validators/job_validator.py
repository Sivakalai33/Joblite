import re

def validate_job(data):

    if not data:
        return "Request body missing"

    # Job Title
    if not data.get("job_title"):
        return "Job title required"

    # Company Name
    if not data.get("company_name"):
        return "Company name required"

    # Location
    if not data.get("location"):
        return "Location required"

    # Salary
    if not data.get("salary"):
        return "Salary required"

    # Job Type
    if not data.get("job_type"):
        return "Job type required"

    # Description
    if not data.get("description"):
        return "Description required"

    # Experience Validation
    exper = data.get("experience")

    if not exper:
        return "Experience required"

    # Skills
    if not data.get("skills"):
        return "Skills required"
    
   
    return None