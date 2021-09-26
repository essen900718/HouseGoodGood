class SecurityCameraDataType:
    station = ''
    address = ''


class SecurityCameraData:
    def __init__(self) -> None:
        self.address = []

        with open('C:/Users/88690/Desktop/比賽/HouseGoodGood/UserData/治安/109年上半年臺北市政府警察局錄影監視系統設置區位.csv', 'r', encoding="utf-8") as self.infile:
            #data = self.infile
            line = self.infile.readline()

            for line in self.infile:
                point1 = 0
                point2 = 0
                point3 = 0
                for Word in range(len(line)):
                    if line[Word] == ',':
                        point1 = point2
                        point2 = point3
                        point3 = Word

                # class SecurityCameraDataType:
                #     station = ''
                #     address = ''
                temp = SecurityCameraDataType()
                temp.station = line[point1+1:point2]
                temp.address = line[point2+1:point3]
                self.address.append(temp)

    def GetAddress(self):
        return self.address


# Test = SecurityCameraData()
# print(Test.address[0].station)
