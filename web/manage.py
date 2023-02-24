from flask.cli import FlaskGroup
from werkzeug.security import generate_password_hash
from app import app, db
from app.models.contact import Contact 
from app.models.blogentry import BlogEntry
from app.models.authuser import AuthUser

from app.models.authuser import AuthUser, PrivateContact

cli = FlaskGroup(app)

@cli.command("create_db")
def create_db():
    db.drop_all()
    db.create_all()
    db.session.commit()

@cli.command("seed_db")
def seed_db():
    db.session.add(AuthUser(email="a@a", name='Just An Ape',
                            password=generate_password_hash('a',
                                                            method='sha256'),
                            avatar_url='https://ui-avatars.com/api/?name=APES&background=83ee03&color=fff'))
    
    db.session.add(
       PrivateContact(firstname='ส้มโอ', lastname='โอเค',
                      phone='081-111-1112', owner_id=1))

    db.session.add(
        BlogEntry(name='Just An Ape', message='วานรไม่ชอบปัญญาประดิษฐ์', email='วานรไม่มีอีเมล'))
    db.session.commit()

if __name__ == "__main__":
    cli()
