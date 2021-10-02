class CollegeDataType:
    name = ''
    address = ''


class College:
    def __init__(self) -> None:
        self.address = []
        with open('110年社區大學聯絡資訊1100412.txt', 'r', encoding='utf-8') as self.infile:
            #data = self.infile
            point = []
            line = self.infile.readline()
            while True:
                line = self.infile.readline()
                if not line:
                    break
                temp = CollegeDataType()
                for Word in range(len(line)):
                    if line[Word] == '\t':
                        point.append(Word)
                temp.name = line[0:point[0]]
                temp.address = line[point[1]+1:len(line)-1]
                self.address.append(temp)
                # print(self.address)

    def GetAddress(self):
        return self.address


# Test = College()
# Data = Test.GetAddress()
# print(Data[0].address)
