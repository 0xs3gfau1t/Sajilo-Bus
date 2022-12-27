import sqlite3
import math
from datetime import datetime
from mfrc522 import SimpleMFRC522
import RPi.GPIO as GPIO
from time import sleep
import requests

# BACKEND IP
IP = ""
# BACKEND PORT
PORT = ""
# BUS NUMBER
BUS_NUMBER = ""

reader = SimpleMFRC522()

con = sqlite3.connect('database.db')
c = con.cursor()
c.execute('''
        CREATE TABLE IF NOT EXISTS logs(
            [time] timestamp,
            [lat] REAL,
            [lon] REAL
        );
    ''')
c.execute('''
        CREATE TABLE IF NOT EXISTS entries(
            [id] TEXT,
            [time] timestamp,
            [completed] INTEGER default 0
        );
    ''')

GPIO.setmode(GPIO.BOARD)
GPIO_PIN = 8
GPIO.setup(GPIO_PIN, GPIO.OUT, initial=GPIO.LOW)


def distance(lat1, lon1, lat2, lon2):
    p = 0.017453292519943295
    c = math.cos
    z = c((lat2 - lat1) * p) / 2
    y = c(lat1 * p)
    x = c(lat2 * p)
    w = (1-c((lon2 - lon1) * p))
    f = 0.5 - z + (y * x * w) / 2
    return 12742 * math.asin(math.sqrt(f))


def success():
    GPIO.output(GPIO_PIN, GPIO.HIGH)
    sleep(0.1)
    GPIO.output(GPIO_PIN, GPIO.LOW)
    sleep(0.05)
    GPIO.output(GPIO_PIN, GPIO.HIGH)
    sleep(0.3)
    GPIO.output(GPIO_PIN, GPIO.LOW)


def rejected():
    GPIO.output(GPIO_PIN, GPIO.HIGH)
    sleep(2)
    GPIO.output(GPIO_PIN, GPIO.LOW)


def fulfilled():
    GPIO.output(GPIO_PIN, GPIO.HIGH)
    sleep(0.1)
    GPIO.output(GPIO_PIN, GPIO.LOW)
    sleep(0.05)
    GPIO.output(GPIO_PIN, GPIO.HIGH)
    sleep(0.3)
    GPIO.output(GPIO_PIN, GPIO.LOW)
    sleep(0.05)
    GPIO.output(GPIO_PIN, GPIO.HIGH)
    sleep(0.5)
    GPIO.output(GPIO_PIN, GPIO.LOW)


def addEntry(uid):

    print("Adding entry")
     
    query = """INSERT INTO 'entries'('id', 'time')VALUES (?, ?);"""
    try:
        r = requests.get("http://"+IP+":"+PORT+"/api/card/balance?id="+uid)
        if r.status_code != 200:
            raise Exception("Invalid request")

        if r.json().get('balance') < 2000:
            raise Exception("Low balance")
        
        c.execute(query, [uid, datetime.now()])
        con.commit()
        success()
    except Exception as e:
        print(e)
        rejected()


def calculateDistance(cardId):
    query = """SELECT time from entries WHERE id=? AND completed=0"""
    c.execute(query, [cardId])
    response = c.fetchone()
    if (not response):
        print("Card has not entered yet.")
        return {'success': False}

    entry_time = response[0]
    currentDate = datetime.now()
    query = """SELECT lat, lon from logs WHERE time >= ? AND time <= ?;"""
    c.execute(query, [entry_time, currentDate])
    response = c.fetchall()

    total = 0
    for i in range(len(response)-1):
        total += distance(lat1=response[i][0],
                          lon1=response[i][1],
                          lat2=response[i+1][0],
                          lon2=response[i+1][1])
    print("Total distance travelled: ", total, " KM")
    return {
        'success': True,
        'sum': total,
        'src_time': entry_time,
        'dest_time': str(currentDate),
        'dest_lon': response[-1][1],
        'dest_lat': response[-1][0],
        'src_lon': response[0][1],
        'src_lat': response[0][0]
    }


def fulfillEntry(uid):
    print("Fulfill entry")
    query = """UPDATE 'entries' set completed=1 where id=?"""
    try:
        dist = calculateDistance(uid)
        if (not dist['success']):
            raise Exception("Card not entered yet")

        url = "http://"+IP+":"+PORT+"/api/card/trip"
        headers = {'Content-Type': 'application/json'}
        data = {
            'src_lon': dist['src_lon'],
            'src_lat': dist['src_lat'],
            'dest_lon': dist['dest_lon'],
            'dest_lat': dist['dest_lat'],
            'source_time': dist['src_time'],
            'dest_time': dist['dest_time'],
            'cardId': uid,
            'Bus_number': BUS_NUMBER,
            'distance': dist['sum']
        }

        res = requests.post(url, json=data, headers=headers)

        if res.status_code != 200:
            raise Exception("Check your internet and try again")

        c.execute(query, [uid])
        con.commit()
        fulfilled()
    except Exception as e:
        print(e)
        rejected()


def updateEntry(uid):
    u_find = """SELECT * from entries where id=? and completed=0"""
    c.execute(u_find, [uid])
    res = c.fetchone()
    if (not res):
        addEntry(uid)
    else:
        fulfillEntry(uid)


while True:
    print("Gimme your card!")
    try:
        _id, uid = reader.read()
        print("Card Detected...\nCard Id: ", _id, "\nUser Id: ", uid)
        updateEntry(uid.strip())
    except Exception as e:
        print(e)
    sleep(1)    
