import time
from flask import Flask
from flask import render_template

from src.spider import spider
from src.dataType import houseInfoType

app = Flask(__name__)
spi = spider()
lastUpdateTime = ''
l = []

def initData():
    global l, lastUpdateTime
    try:
        with open('houseData.txt', 'r', encoding = 'UTF-8') as f:
            lastUpdateTime = f.readline()[:-1]
            l.extend([houseInfoType(x[:-1].split(',')) for x in f.readlines()])
    except Exception as e:
        print(e)

@app.route('/')
def hello_world():
    return render_template("1.html")

@app.route('/database')
def test():
    return render_template('database.html', infoList = l, lastUpdateTime = lastUpdateTime, size = len(l))

initData()
if __name__ == '__main__':
    app.run(host = '0.0.0.0', port = 5000)