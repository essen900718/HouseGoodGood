class houseInfoType:
    def __init__(self, L):
        self.name = L[0]
        self.link = L[1]
        self.addr = L[2]
        self.year = L[3]
        self.houseType = L[4]
        self.price = L[5] if len(L) == 6 else L[5] + ',' + L[6]
    def string(self):
        return self.name + ',' + self.link + ',' + self.addr + ',' + self.year + ',' \
                + self.houseType + ',' + self.price