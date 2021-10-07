class houseInfoType:
    def __init__(self, L):
        self.name = L[0]
        self.link = L[1]
        self.addr = L[2]
        self.year = L[3]
        self.houseType = L[4]
        if len(L) == 8:
            self.price = L[5]
            self.lat = L[6] 
            self.lng = L[7] 
        else:
            self.price = L[5] + ',' + L[6]
            self.lat = L[7] 
            self.lng = L[8] 
    def string(self):
        return self.name + ',' + self.link + ',' + self.addr + ',' + self.year + ',' \
                + self.houseType + ',' + self.price + ',' + self.lat + ',' + self.lng