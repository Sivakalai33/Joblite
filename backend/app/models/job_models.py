from app.database import Database


class JobModel:
    def __init__(self):
        self.db = Database()

    # Create Job (with user_auth like your doctor system)
    def create_job(self, job):
        conn = self.db.get_connection()
        cursor = conn.cursor()

        try:
            

            cursor.execute(
                """INSERT INTO jobs
                (job_title, company_name, location, salary, job_type,experience,skills, description)
                VALUES ( %s, %s, %s, %s, %s,%s,%s, %s)""",
                (
                    
                    job['job_title'],
                    job['company_name'],
                    job['location'],
                    job['salary'],
                    job['job_type'],
                    job['experience'],
                    job['skills'],
                    job['description']
                )
            )

            conn.commit()
            

        except Exception as e:
            conn.rollback()
            print("ERROR:", str(e))
            raise e

        finally:
            conn.close()

    # List all jobs
    def job_list(self):
        conn = self.db.get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT job_id,job_title,company_name,location,salary FROM jobs")
        jobs = cursor.fetchall()

        conn.close()
        return jobs
    
     # One job full details
    def joballdetail(self,job_id):
        conn = self.db.get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM jobs where job_id = %s",(job_id,))
        jobs = cursor.fetchone()

        conn.close()
        return jobs

    # Get single job
    def get_job(self, job_id):
        conn = self.db.get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM jobs WHERE job_id=%s", (job_id,))
        job = cursor.fetchone()

        conn.close()
        return job

    # Duplicate check (title + company)
    def get_job_by_title_and_company(self, title, company):
        conn = self.db.get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute(
            "SELECT * FROM jobs WHERE LOWER(job_title)=LOWER(%s) AND LOWER(company_name)=LOWER(%s)",
            (title, company)
        )

        job = cursor.fetchone()
        conn.close()
        return job

    """
    def save_job(self, user_id, job_id):
        conn = self.db.get_connection()
        cursor = conn.cursor()

        cursor.execute(
        "INSERT INTO saved_jobs (user_id, job_id) VALUES (%s, %s)",
        (user_id, job_id)
        )

        conn.commit()
        conn.close()

        return {"user_id": user_id, "job_id": job_id}"""
    
    def apply_job(self, user_id, job_id):
        conn = self.db.get_connection()
        cursor = conn.cursor()

        cursor.execute(
            "INSERT INTO applied_jobs (user_id, job_id) VALUES (%s, %s)",
            (user_id, job_id)
        )

        conn.commit()
        conn.close()

        return {"user_id": user_id, "job_id": job_id}
    
    def check_applied_job(self, user_id, job_id):
        conn = self.db.get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute(
        "SELECT * FROM applied_jobs WHERE user_id=%s AND job_id=%s",
        (user_id, job_id)
        )

        result = cursor.fetchone()
        conn.close()

        return result
    
    def create_user(self, user):
        conn = self.db.get_connection()
        cursor = conn.cursor()

        cursor.execute(
        "INSERT INTO users (username, email, password,l_role) VALUES (%s, %s, %s, %s)",
        (user["username"], user["email"], user["password"], user["l_role"])
        )

        conn.commit()
        conn.close()

        return True
    
    def login_user(self, email, password,l_role):
        conn = self.db.get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute(
        "SELECT * FROM users WHERE email=%s AND password=%s AND l_role=%s",
        (email, password,l_role)
        )

        user = cursor.fetchone()
        conn.close()
        print(user)
        return user