class hospitalInfo:
    def __init__(self, L):
        self.name = L[0]
        self.addr = L[1]
        self.lat = L[2]
        self.lng = L[3]
    def string(self):
        return self.name + ',' + self.addr + ','  \
                + self.lat + ',' + self.lng