class CareCenterData:
    def __init__(self) -> None:
        self.address = []
        with open('UserData\H\日間照顧中心.csv', 'r', encoding="utf-8") as self.infile:
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
                self.address.append(line[point2+1:point3])

    def GetAddress(self):
        return self.address

# T = CareCenterData()
# print(T.GetAddress())