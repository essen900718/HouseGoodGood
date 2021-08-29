import concurrent.futures
import time
import os
from src.spider import spider

l = []
cnt = 0
spi = spider()
lastUpdateTime = ''

def updateData():
    curr = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    print(f'[INFO] {curr}: Start to update data, it may takes a few minutes and every hour update.')
    while True:
        t = time.time()
        global lastUpdateTime
        lastIdx = spi.getLastIndexFromSinyi()
        crawler([i for i in range(1, lastIdx + 1)])
        lastUpdateTime = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
        print(f'[INFO] {lastUpdateTime}: Data updated.')
        writeToFile()
        pushToHeroku()
        curr = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
        print(f'[INFO] {curr}: It took {int(time.time() - t)} seconds to update this time.')
        time.sleep(60 * 60)

def crawler(page):
    global l
    # multithread
    with concurrent.futures.ThreadPoolExecutor(max_workers = 50) as executor:
        tmp = executor.map(spi.getDataFromSinyi, page)
    l = [y for x in tmp if x for y in x]

def writeToFile():
    global cnt
    try:
        with open('houseData.txt', 'r', encoding = 'UTF-8') as f:
            fileUpdateTime = f.readline()
        if lastUpdateTime > fileUpdateTime:
            with open('houseData.txt', 'w', encoding = 'UTF-8') as f:
                f.write(lastUpdateTime)
                f.writelines(['\n' + x.string() for x in l])
        cnt += 1
        curr = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
        print(f'[INFO] {curr}: "houseData.txt" already updated {cnt}' + ('times.' if cnt > 1 else 'time.'))
    except Exception as e:
        print(e)

def pushToHeroku():
    os.system('push.bat>pushLog.txt')
    curr = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    print(f'[INFO] {curr}: "houseData.txt" pushed to heroku.')

if __name__ == '__main__':
    updateData()