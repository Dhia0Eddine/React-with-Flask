from flask import Flask
from flask_migrate import Migrate
from .config.config import Config
from .models import db
from .routes import main
import os
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)

    migrate.init_app(app, db)
    app.register_blueprint(main)
    app.config['UPLOAD_FOLDER'] = os.path.join(os.getcwd(), 'uploads')

    return app
