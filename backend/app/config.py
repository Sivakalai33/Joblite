import configparser

class Config:
    def __init__(self,file_path="config.ini"):
        parser=configparser.ConfigParser()
        parser.read(file_path)

        self.mysql={
            "host":parser.get("mysql","host"),
            "port":parser.getint("mysql","port"),
            "user":parser.get("mysql","user"),
            "password":parser.get("mysql","password"),
            "database":parser.get("mysql","database"),
        }

        self.app={
            "debug":parser.getboolean("app","debug"),
            "secret_key":parser.get("app","secret_key"),
        }
        #if not parser.read(file_path):
            #raise FileNotFoundError(f"{file_path} not found")

        