from . import db
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone

class EventRegistration(db.Model):
       __tablename__ = 'attendees'
       id = db.Column(db.Integer, primary_key=True)
       first_name = db.Column(db.String(100), nullable=False)
       last_name = db.Column(db.String(100), nullable=False)
       email = db.Column(db.String(100), unique=True, nullable=False)
       phone = db.Column(db.String(100), nullable=False)
       job_title = db.Column(db.String(100), nullable=False)
       company_name = db.Column(db.String(100), nullable=False)
       company_size = db.Column(db.String(50), nullable=False)
       subject = db.Column(db.String(250), nullable=False)

       def format(self):
              return {
                     'id': self.id,
                     'first_name': self.first_name,
                     'last_name': self.last_name,
                     'email': self.email,
                     'phone': self.phone,
                     'job_title': self.job_title,
                     'company_name': self.company_name,
                     'company_size': self.company_size,
                     'subject': self.subject
              }

class Speaker(db.Model):
       __tablename__ = 'speakers'
       id = db.Column(db.Integer, primary_key=True)
       name = db.Column(db.String(100), nullable=False)
       email = db.Column(db.String(100), unique=True, nullable=False)
       position = db.Column(db.String(100), nullable=True)
       bio = db.Column(db.String(100), nullable=False)
       company = db.Column(db.String(100), nullable=False)
       speaker_avatar = db.Column(db.String(250), nullable=False)
       created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
       updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

       # Relationship: one speaker has many events
       events = db.relationship('Event', backref='speaker', lazy=True)

       def __repr__(self):
              return f'<Speaker {self.name}>'

       def format(self):
              return {
                     'id': self.id,
                     'name': self.name,
                     'email': self.email,
                     'position': self.position,
                     'bio': self.bio,
                     'company': self.company,
                     'speaker_avatar': self.speaker_avatar,
                     # 'created_at': self.created_at.isoformat(),
                     # 'updated_at': self.updated_at.isoformat()
              }

class Event(db.Model):
       __tablename__ = 'events'
       id = db.Column(db.Integer, primary_key=True)
       title = db.Column(db.String(200), nullable=False)
       description = db.Column(db.Text, nullable=True)
       date = db.Column(db.DateTime, nullable=False)
       location = db.Column(db.String(200), nullable=True)
       speaker_id = db.Column(db.Integer, db.ForeignKey('speakers.id'), nullable=False)

       def format(self):
              return {
                     'id': self.id,
                     'title': self.title,
                     'description': self.description,
                     'date': self.date.isoformat() if self.date else None,
                     'location': self.location,
                     'speaker_id': self.speaker_id
              }