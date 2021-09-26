
class SelectData:
    def __init__(self) -> None:
        self.address = []

        with open('UserData/環保/110年臺北市電動機車充電地點(406).csv', 'r', encoding="utf-8") as self.infile:
            #data = self.infile
            line = self.infile.readline()
            for line in self.infile:
                point1 = 0
                point2 = 0
                for Word in range(len(line)):
                    if line[Word] == ',':
                        point1 = point2
                        point2 = Word
                self.address.append(line[point1+1:point2])

    def GetAddress(self):
        return self.address


# Test = SelectData()
# Data = Test.GetAddress()
# print(Data[0])
