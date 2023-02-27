from flask_login import UserMixin
from sqlalchemy_serializer import SerializerMixin
from app import db

from .contact import Contact
from .blogentry import BlogEntry

class AuthUser(db.Model, UserMixin):
    __tablename__ = "auth_users"
    # primary keys are required by SQLAlchemy
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    name = db.Column(db.String(1000))
    password = db.Column(db.String(100))
    avatar_url = db.Column(db.String(100))

    def __init__(self, email, name, password, avatar_url):
        self.email = email
        self.name = name
        self.password = password
        self.avatar_url = avatar_url

    def update(self, email, name, avatar_url):
        self.email = email
        self.name = name
        self.avatar_url = avatar_url

class PrivateContact(Contact, UserMixin, SerializerMixin):
    owner_id = db.Column(db.Integer, db.ForeignKey('auth_users.id'))

    def __init__(self, firstname, lastname, phone, owner_id):
        super().__init__(firstname, lastname, phone)
        self.owner_id = owner_id

class UserTweet(BlogEntry, UserMixin, SerializerMixin):
    owner_id = db.Column(db.Integer, db.ForeignKey('auth_users.id'))

    def __init__(self, name, avatar_url, message, email, owner_id):
        super().__init__(name, avatar_url, message, email)
        self.owner_id = owner_id
