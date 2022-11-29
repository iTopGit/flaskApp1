from app import app
  
@app.route('/')
def home():
    return "Natthakrit says 'Hello world!'"
