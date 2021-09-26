import pandas as pd


class LAL:
    X = ''
    Y = ''


class MRT:
    def __init__(self) -> None:
        self.address = []
        with open('C:/Users/88690/Desktop/比賽/HouseGoodGood/UserData/交通/臺北捷運車站出入口座標.txt', 'r', encoding="utf-8") as self.infile:
            #data = self.infile
            point1 = 0
            point2 = 0
            point3 = 0
            line = self.infile.readline()
            while True:
                line = self.infile.readline()
                if not line:
                    break
                for Word in range(len(line)):
                    if line[Word] == ',':
                        point1 = point2
                        point2 = point3
                        point3 = Word
                temp = LAL()
                temp.X = line[point2+1:point3]
                temp.Y = line[point3+1:len(line)-1]
                self.address.append(temp)

    def GetAddress(self):
        return self.address


# T = MRT()
# print(T.GetAddress()[0].Y)
