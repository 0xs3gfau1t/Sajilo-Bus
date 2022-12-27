from flask import Flask
from flask_cors import CORS
from mfrc522 import SimpleMFRC522
import RPi.GPIO as GPIO
from time import sleep
import requests as r

reader = SimpleMFRC522()
app = Flask(__name__)
CORS(app)

IP = ''
PORT = ''

@app.route('/')
def getCords():
    f = open("/tmp/latestlocation", "r")
    content = f.read()
    f.close()

    content = content.split(",")

    return {"lat": content[0], "lng": content[1], "time": content[2]}

@app.route('/checkBalance')
def checkBalance():
    print("Gimme your card!")
    _id, uid = reader.read()
    try:
        res = r.get("http://"+IP+":"+PORT+"/api/cars/balance?id="+uid)

        if res.status_code != 200:
            raise Exception("Server Error")

        return res.json() 
    except Exception as e:
        print(e)
        return "Server Error"

@app.route('/card')
def getCard():
    print("Gimme your card!")
    _id, uid = reader.read()

    return {'uid':uid}


if __name__ == "__main__":
    app.run(host="0.0.0.0")

