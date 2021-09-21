class LAL:
    X = ''
    Y = ''


class RubbishTruckData:
    def __init__(self) -> None:
        self.address = []
        with open('垃圾車清運點位.csv', 'r', encoding="utf-8") as self.infile:
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
                temp.X = line[point1+1:point2]
                temp.Y = line[point2+1:point3]
                self.address.append(temp)

    def GetAddress(self):
        return self.address
