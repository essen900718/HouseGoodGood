import requests
import time
from src.dataType import houseInfoType
from bs4 import BeautifulSoup

class spider:
    def __init__(self):
        self.baseUrl = 'https://www.sinyi.com.tw'
        self.url = 'https://www.sinyi.com.tw/buy/list/Taipei-city/Taipei-R-mrtline/03-mrt/default-desc/'
        self.UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36' }

    def getDataFromSinyi(self, page):
        l = []
        req = requests.get(self.url + str(page), headers = self.UA)
        soup = BeautifulSoup(req.text, 'lxml')      
        
        houseNames = []
        links = []
        prices = []
        
        for a in soup.find_all('div', class_ = 'LongInfoCard_Type_Name'):
            if a.string:
                houseNames.append(a.string)
        
        for item in soup.find_all('div', class_ = 'buy-list-item'):
            for tmp in item.select('a'):
                if tmp['href'].find('breadcrumb') > -1:
                    links.append(self.baseUrl + tmp['href'])
                    break

        rightInfos = soup.find_all('div', class_ = 'LongInfoCard_Type_Right')
        # 資料取得完畢
        if not len(rightInfos): return

        # 切出房價
        for tmp in rightInfos:
            qq = str(tmp).split('#dd2525">')[1]
            prices.append(qq[:qq.find('</span>')])
            
        houseInfos = soup.find_all('div', class_ = 'LongInfoCard_Type_Address')
        # 移除垃圾
        for tmp in houseInfos:
            if len(tmp) < 3: houseInfos.remove(tmp)

        for name, info, price, link in zip(houseNames, houseInfos, prices, links):
            infoList = str(info).split('<span>')
            addr = infoList[1][:-7]
            year = infoList[2][:-7]
            houseType = infoList[3][:-13]
            l.append(houseInfoType([name, link, addr, year, houseType, price + '萬']))
        curr = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
        print(f'[INFO] {curr}: Get {page} page.')
        return l
    
    def getLastIndexFromSinyi(self):
        req = requests.get(self.url, headers = self.UA)
        soup = BeautifulSoup(req.text, 'lxml')
        node = soup.find('li', class_ = 'nextClassName')
        return int(node.find_previous_sibling().text)

if __name__ == '__main__':
    spi = spider()
    l = spi.getDataFromSinyi(1)
    print(l)