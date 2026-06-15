## JobLite – Job Portal System (React + Flask Backend)

## Overview

JobLite is a web-based job portal system that allows users to apply for jobs, while admins can manage job postings.

The system supports role-based authentication (Admin & User) and provides a simple job browsing and application workflow.


## Main Functionalities

### Authentication System
User Login
Admin Login
Role-based access control

### Admin Features

Create Job Posts
View All Jobs


### User Features
View Job Listings
View Full Job Details
Apply for Jobs



## Tech Stack
Frontend
React.js
Vite
React Router DOM
Axios
HTML
CSS

## Backend 
Flask
REST APIs

## Database 
MySQL

## Project Structure
```
Frontend Structure
frontend/
│
├── public/
│
├── src/
│   ├── components/       # Navbar, JobCard, etc.
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Jobs.jsx
│   │   ├── JobDetails.jsx
│   │
│   ├── services/        # Axios API calls
│   ├── context/         # Auth context (if used)
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
│
└── package.json
```

## Backend Structure 
```
backend/
│
├── routes/
│   ├── job_routes.py          # All API routes (single or main routing file)
│
├── services/
│   ├── job_services.py       # Business logic + database queries
│
├── models/
│   ├── job_model.py          # Data structure / schema definitions
│
├── utils/
│   ├── response.py           # Standard API response format (success/error)
│   ├── error_handler.py      # Global error handling functions
│
├── database.py               # MySQL connection setup
├── config.py                 # Configuration (DB credentials, secret key)
├── run.py                    # Entry point (start Flask server)
└── requirements.txt          # Python dependencies
```
---

## Application Flow (Important)

1. Login Flow
User/Admin logs in
System checks role
Redirect based on role

2. Job Listing Flow
After login → Jobs page opens
API fetches job list

3. Jobs displayed as cards:
Company
Location
Salary

Click View Details
Navigate to /job/:id
Show full job description

4. Apply Job Flow
Click Apply Job

5. System stores
userId
jobId
status = "applied"

---

## Database Design (Simple Version)

### Registration Table

```

CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    l_role VARCHAR(50) NOT NULL
);
```

### Job details table

```

CREATE TABLE jobs (
    job_id INT PRIMARY KEY AUTO_INCREMENT,
    job_title VARCHAR(150) NOT NULL,
    company_name VARCHAR(150) NOT NULL,
    location VARCHAR(100),
    salary VARCHAR(50),
    job_type VARCHAR(50),
    experience VARCHAR(50),
    skills TEXT,
    description TEXT,
    posted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP   
);

```
---

### Job_Applied table

```

CREATE TABLE applied_jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    job_id INT,
    status VARCHAR(50) DEFAULT 'Applied',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

---

##  Route Flow
/ → Login Page
/login → Login Page
/jobs → Job Listing Page
/job/:id → Job Details Page


## Key Features Summary

✔ Login system (Admin/User)
✔ Job listing page
✔ Job detail page
✔ Apply job functionality
✔ Role-based access
✔ Clean UI with React



## Author

Developed by: Kalaiselvi M
