from app.models.job_models import JobModel
class JobService:
    def __init__(self):
        self.model = JobModel()

    #  Create Job
    def create_job(self, job):
        return self.model.create_job(job)

    #  List all jobs
    def list_all_jobs(self):
        return self.model.job_list()
    
    #  List one job all detail
    def alljobdetail(self,job_id):
        return self.model.joballdetail(job_id)

    # Get single job
    def get_one_job(self, job_id):
        return self.model.get_job(job_id)

    # duplicate check (job_title + company_name)
    def get_job_by_title_and_company(self, title, company):
        return self.model.get_job_by_title_and_company(title, company)
    
    
    def apply_job(self, user_id, job_id):
        return self.model.apply_job(user_id, job_id)


    def check_applied_job(self, user_id, job_id):
        return self.model.check_applied_job(user_id, job_id)
    
    # Register user
    def create_user(self, user):
        return self.model.create_user(user)
    
    # Login user
    def login_user(self, email, password,l_role):
        return self.model.login_user(email, password,l_role)

 