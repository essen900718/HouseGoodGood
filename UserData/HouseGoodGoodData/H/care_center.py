class CareCenterDataType:
    name = ''
    address = ''


class CareCenterData:
    def __init__(self) -> None:
        self.address = []
        with open('日間照顧中心.csv', 'r', encoding="utf-8") as self.infile:
            #data = self.infile
            point = []
            while True:
                line = self.infile.readline()
                if not line:
                    break
                temp = CareCenterDataType()
                for Word in range(len(line)):
                    if line[Word] == ',':
                        point.append(Word)
                temp.name = line[point[0]+1:point[1]]
                temp.address = line[point[1]+1:point[2]]
                self.address.append(temp)

    def GetAddress(self):
        return self.address


Test = CareCenterData()
Data = Test.GetAddress()
print(Data[0].address)
