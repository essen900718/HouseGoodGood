import concurrent.futures
import time
import threading
import atexit
from flask import Flask
from flask import render_template

from src.spider import spider
from src.dataType import houseInfoType

app = Flask(__name__)
spi = spider()
lastUpdateTime = ''
l = []

@atexit.register
def runBeforeExit():
    try:
        with open('houseData.txt', 'r', encoding = 'UTF-8') as f:
            fileUpdateTime = f.readline()
        if lastUpdateTime > fileUpdateTime:
            with open('houseData.txt', 'w', encoding = 'UTF-8') as f:
                f.write(lastUpdateTime)
                f.writelines(['\n' + x.string() for x in l])
        print('[INFO]' + time.strftime("%Y-%m-%d %H:%M:%S", time.localtime() + ': "houseData.txt" updated.'))
    except Exception as e:
        print(e)

def initData():
    global l, lastUpdateTime
    try:
        with open('houseData.txt', 'r', encoding = 'UTF-8') as f:
            lastUpdateTime = f.readline()[:-1]
            l.extend([houseInfoType(x[:-1].split(',')) for x in f.readlines()])
    except Exception as e:
        print(e)

def updateData():
    while True:
        global lastUpdateTime
        lastIdx = spi.getLastIndexFromSinyi()
        crawler([i for i in range(1, lastIdx + 1)])
        lastUpdateTime = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
        print(f'[INFO] {lastUpdateTime}: Data updated.')
        time.sleep(40 * 60)

def crawler(page):
    global l
    # multithread
    with concurrent.futures.ThreadPoolExecutor(max_workers = 100) as executor:
        tmp = executor.map(spi.getDataFromSinyi, page)
    l = [y for x in tmp if x for y in x]

@app.route('/')
def hello_world():
    return render_template("1.html")

@app.route('/database')
def test():
    return render_template('database.html', infoList = l, lastUpdateTime = lastUpdateTime, size = len(l))

if __name__ == '__main__':
    initData()
    threading.Thread(target = updateData, daemon = True).start()
    app.run(host = '0.0.0.0', port = 5000)