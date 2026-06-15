import mysql.connector
from app.config import Config

config=Config()
class Database:
    def get_connection(self):
        return mysql.connector.connect(**config.mysql)