import time
import requests
import urllib.parse
import json
from typing import Sized
from flask import Flask
from flask import render_template
from requests.api import get
from UserData.AddressData import Taipei
from src.spider import spider
from src.dataType import houseInfoType
app = Flask(__name__, static_url_path='/static')
spi = spider()
lastUpdateTime = ''
l = []
Hospital = []
HospLatLng = []

def get_latitude_longtitude(address,list,name):
    # decode url
    address = urllib.parse.quote(address)
    url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address +"&key=AIzaSyAui41PhiDPXFDiZcWUbp3h6mMCJ5Bjx6Q"
    while True:
        res = requests.get(url)
        js = json.loads(res.text)

        if js["status"] != "OVER_QUERY_LIMIT":
            time.sleep(1)
            break
    result = js["results"][0]["geometry"]["location"]
    temp = {'name': name , 'lat': float(result["lat"]), 'lng': float(result["lng"])}
    list.append(temp)
    


def initData():
    global l, lastUpdateTime
    try:
        with open('houseData.txt', 'r', encoding = 'UTF-8') as f:
            lastUpdateTime = f.readline()[:-1]
            l.extend([houseInfoType(x[:-1].split(',')) for x in f.readlines()])
    except Exception as e:
        print(e)

##醫院資料
temp = Taipei().hospital()
for i in range(0,len(temp)):
    Hospital.append(temp[i].address)
    get_latitude_longtitude(Hospital[0],HospLatLng,temp[i].name)
    print(HospLatLng[i] , '\n')
    
##充電站
ChargeStation = Taipei().EF()
##社區大學
College = Taipei().college()


@app.route('/')
def home():
    return render_template("home.html" , infoList = l, size = len(l), hospital = Hospital, chargestation = ChargeStation, college = College)

@app.route('/main')
def main():
    return render_template("main.html" , infoList = l, size = len(l), hospital = Hospital, chargestation = ChargeStation, college = College)

@app.route('/about')
def about():
    return render_template("about.html" , infoList = l, size = len(l), hospital = Hospital, chargestation = ChargeStation, college = College)

@app.route('/database')
def test():
    return render_template('database.html', infoList = l, lastUpdateTime = lastUpdateTime, size = len(l))

initData()
if __name__ == '__main__':
    app.run()