import serial
from time import sleep
import pynmea2

import sqlite3
from datetime import datetime
import random

RESET = '\033[0m'
GREEN = '\033[92m'
LOGGER_DELAY = 2


def getCurrentCords():
    looping = True
    lat = None
    lng = None
    while looping:
        try:
            port = "/dev/ttyAMA0"
            ser = serial.Serial(port, baudrate=9600, timeout=5)
            newdata = ser.readline().decode()
            if newdata[0:6] == '$GPRMC':
                newmsg = pynmea2.parse(newdata)
                lat = newmsg.latitude
                lng = newmsg.longitude
                if (lat == 0 or lng == 0):
                    raise Exception("Either Latitude or Longitude is zero.")
                looping = False
        except Exception as e:
            print(e)
    return {"lat": lat, "lng": lng}


def Logger():
    con = sqlite3.connect("database.db")
    c = con.cursor()
    c.execute(
        '''CREATE TABLE IF NOT EXISTS logs(
            [time] timestamp,
            [lat] REAL,
            [lon] REAL
        );'''
    )
    c.execute(
        '''
            CREATE TABLE IF NOT EXISTS entries(
                [id] TEXT,
                [time] timestamp,
                [completed] INTEGER default 0
            );'''
    )

    print('[+] Logger instantiated')

    while True:
        current = datetime.now()

        # Due to unstable GPS Module, we were forced to hardcode GPS Coordinate of WRC
        # Uncomment the line below and comment out the line below that to use GPS Module
        #cords = getCurrentCords()
        cords = {'lat': '28.255031'+str(random.randint(10000000,99999999)), 'lng':'83.976183'+str(random.randint(10000000, 99999999))}
        
        # To reduce number of agents using database
        # Store and use latest coordinates from a temporary file
        # Server will use this file to send its latest GPS Coordinates
        with open("/tmp/latestlocation", "w") as f:
            f.write(str(cords['lat']) + "," + str(cords['lng']) + "," + str(current))

        query = """INSERT INTO logs('lat', 'lon', 'time')VALUES (?, ?, ?);"""
        c.execute(query, [cords['lat'], cords['lng'], current])
        con.commit()

        print(GREEN + '[+]', current, 'Logged', cords, RESET)
        sleep(LOGGER_DELAY)

if __name__ == "__main__":
    Logger()
