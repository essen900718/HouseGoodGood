import time
from typing import Sized
from flask import Flask
from flask import render_template
from UserData.AddressData import Taipei
from src.spider import spider
from src.dataType import houseInfoType

app = Flask(__name__, static_url_path='/static')
spi = spider()
lastUpdateTime = ''
l = []
Hospital = []
##醫院資料
temp = Taipei().hospital()
for i in range(0,len(temp)):
    Hospital.append(temp[i].address)
##充電站
ChargeStation = Taipei().EF()
##社區大學
College = Taipei().college()


def initData():
    global l, lastUpdateTime
    try:
        with open('houseData.txt', 'r', encoding = 'UTF-8') as f:
            lastUpdateTime = f.readline()[:-1]
            l.extend([houseInfoType(x[:-1].split(',')) for x in f.readlines()])
    except Exception as e:
        print(e)

@app.route('/')
def home():
    return render_template("1.html" , infoList = l, size = len(l), hospital = Hospital, chargestation = ChargeStation, college = College)

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