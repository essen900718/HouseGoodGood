import pandas as pd


class HospitalDataType:
    name = ''
    address = ''


class Hospital:
    def __init__(self) -> None:
        self.Data = []
        Temp_ = pd.read_csv('臺北市公私立醫院.csv')
        Temp = Temp_.values.tolist()
        for i in range(len(Temp)):
            L = HospitalDataType()
            L.name = Temp[i][0]
            L.address = Temp[i][1]
            self.Data.append(L)

    def GetData(self):
        return self.Data


# T = Hospital()
# temp = T.GetData()
# print(temp[0].address)
