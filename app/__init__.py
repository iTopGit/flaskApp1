from flask import Flask
 
app = Flask(__name__, static_folder='static')

app.config['DEBUG'] = True
app.config['SECRET_KEY'] = 'b558460ca9bdea24768a68a32f833639bc785ef8eb125ff6' 
from app import views  # noqa
