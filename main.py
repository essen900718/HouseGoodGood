# main.py
from src.spider import spider
from src.dataType import houseInfoType
from flask import Flask
from flask import render_template

app = Flask(__name__)
spi = spider()
l = spi.getDataFromSinyiByPage(1, 5)

@app.route('/')
def hello_world():
    return render_template("1.html")

@app.route('/test')
def test():
    return render_template('test.html', infoList = l)

if __name__ == '__main__':
    app.run(host = '0.0.0.0', port = 5000, debug = True)