class College:
    def __init__(self) -> None:
        self.address = []
        with open('C:/Users/88690/Desktop/比賽/HouseGoodGood/UserData/教育/110年社區大學聯絡資訊1100412.txt', 'r', encoding='utf-8') as self.infile:
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
                    if line[Word] == '\t':
                        point1 = point2
                        point2 = point3
                        point3 = Word
                self.address.append(line[point3+1:len(line)-1])
                # print(self.address)

    def GetAddress(self):
        return self.address


#T = College()
