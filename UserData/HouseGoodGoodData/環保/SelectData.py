class SelectDataType:
    name = ''
    address = ''


class SelectData:
    def __init__(self) -> None:
        self.address = []

        with open('110年臺北市電動機車充電地點(406).csv', 'r', encoding="utf-8") as self.infile:
            #data = self.infile
            line = self.infile.readline()
            for line in self.infile:
                point = []
                temp = SelectDataType()
                for Word in range(len(line)):
                    if line[Word] == ',':
                        point.append(Word)
                temp.name = line[point[0]+1:point[1]]
                temp.address = line[point[2]+1:point[3]]
                self.address.append(temp)

    def GetAddress(self):
        return self.address


Test = SelectData()
Data = Test.GetAddress()
print(Data[0].address)
