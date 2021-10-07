import time
import requests
import urllib.parse
import json
from typing import Sized
from flask import Flask
from flask import render_template
from requests.api import get
from src.spider import spider
from src.dataType import houseInfoType
from src.market import MarketInfo
from src.hospital import hospitalInfo
from src.charge import chargeInfo
from src.WheelChair import wheelchairInfo
from src.senior import seniorInfo
from src.care import careInfo
app = Flask(__name__, static_url_path='/static')
spi = spider()
lastUpdateTime = ''
l = []

house = []
marketinfo = []
hospitalinfo = []
chargeinfo = []
seniorinfo = []
careinfo = []
Wheelchairinfo=[]
collegeinfo =[]

def initData():
    global l, lastUpdateTime
    try:
        with open('UserData/temp.txt', 'r', encoding = 'UTF-8') as f:
            l.extend([houseInfoType(x[:-1].split(',')) for x in f.readlines()])
    except Exception as e:
        print(e)

#房子
with open('UserData/temp.txt', 'r', encoding = 'UTF-8') as f:
     house.extend([houseInfoType(x[:-1].split(',')) for x in f.readlines()])
#市場
with open('UserData/Market.txt', 'r', encoding = 'UTF-8') as m:
     marketinfo.extend([MarketInfo(x[:-1].split(',')) for x in m.readlines()])

with open('UserData/wheelchair.txt', 'r', encoding = 'UTF-8') as m:
     Wheelchairinfo.extend([wheelchairInfo(x[:-1].split(',')) for x in m.readlines()])

#醫院
with open('UserData/Hospital.txt', 'r', encoding = 'UTF-8') as m:
     hospitalinfo.extend([hospitalInfo(x[:-1].split(',')) for x in m.readlines()])
#電動車
with open('UserData/電動車.txt', 'r', encoding = 'UTF-8') as m:
    chargeinfo.extend([chargeInfo(x[:-1].split(',')) for x in m.readlines()])
#學校
with open('UserData/senior.txt', 'r', encoding = 'UTF-8') as m:
    seniorinfo.extend([seniorInfo(x[:-1].split(',')) for x in m.readlines()])

with open('UserData/college.txt', 'r', encoding = 'UTF-8') as m:
    collegeinfo.extend([seniorInfo(x[:-1].split(',')) for x in m.readlines()])

#照護
with open('UserData/日間照顧.txt', 'r', encoding = 'UTF-8') as m:
    careinfo.extend([careInfo(x[:-1].split(',')) for x in m.readlines()])

with open('UserData/長期照護.txt', 'r', encoding = 'UTF-8') as m:
    careinfo.extend([careInfo(x[:-1].split(',')) for x in m.readlines()])

print(chargeinfo[0].lat)

@app.route('/')
def home():
    return render_template("home.html" , infoList = l, size = len(l))

@app.route('/main')
def main():
    return render_template("main.html" , infoList = house , marketlist = marketinfo , hospitallist = hospitalinfo, chargelist = chargeinfo ,
                          seniorlist = seniorinfo , collegelist = collegeinfo , carelist = careinfo , wheellist = Wheelchairinfo)

@app.route('/about')
def about():
    return render_template("about.html" , infoList = l, size = len(l))

@app.route('/database')
def test():
    return render_template('database.html', infoList = l, lastUpdateTime = lastUpdateTime, size = len(l))

initData()
if __name__ == '__main__':
    app.run(threaded=True)