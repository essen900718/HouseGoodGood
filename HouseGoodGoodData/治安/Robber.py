class RobberData:
    def __init__(self) -> None:
        self.address = []
        self.time = []
        with open('臺北市街頭隨機強盜案件點位資訊.csv', 'r', encoding="utf-8") as self.infile:
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
                self.time.append(line[4:point1])
                self.address.append(line[point2+1:point3])

    def GetAddress(self):
        # for i in range(10):
        #     print(i, self.address[i].address)
        return self.address

    def GetTime(self):
        return self.time


# Test = RobberData()
# temp = Test.GetAddress()
# # for i in range(10):
# #     print(i, temp[i].address)
# print(len(temp))
