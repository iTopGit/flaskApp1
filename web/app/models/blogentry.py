from app import db
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timedelta

class BlogEntry(db.Model, SerializerMixin):
    __tablename__ = "blog_entries"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    avatar_url = db.Column(db.String(100))
    message = db.Column(db.String(280))
    email = db.Column(db.String(50))
    date_created = db.Column(db.DateTime)
    date_updated = db.Column(db.DateTime)
    
    def __init__(self, name, avatar_url, message, email):
        self.name = name
        self.avatar_url = avatar_url
        self.message = message
        self.email = email
        self.date_created = datetime.now() + timedelta(hours=7)
        self.date_updated = datetime.now() + timedelta(hours=7)

    def update(self, name, avatar_url, message, email):
        self.name = name
        self.avatar_url = avatar_url
        self.message = message
        self.email = email
        self.date_updated = datetime.now() + timedelta(hours=7)