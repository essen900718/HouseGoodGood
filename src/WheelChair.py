class wheelchairInfo:
    def __init__(self, L):
        L[2] = L[2].replace('\t', '')
        print(len(L))
        self.name = L[0]
        self.lng = L[1]
        self.lat = L[2]
    def string(self):
        return self.name  + ','  + self.lat + ',' + self.lng