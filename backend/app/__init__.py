from flask import Flask
from app.routes.job_routes import job_bp
from  flask_cors import CORS
from app.config import Config
from app.utils.error_handler import register_error_handlers

config=Config()
def create_app():
    app=Flask(__name__)

    app.config['SECRET_KEY'] = config.app['secret_key'] # secret_key connecting to flask for session usage
    CORS(app,supports_credentials=True,origins=[
        "http://localhost:3000",
        ]) 

    app.register_blueprint(job_bp)
    register_error_handlers(app)
    return app

""" 
resources={r"/*": {"origins": "*"}}
"""