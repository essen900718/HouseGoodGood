from 醫療.Hospital import Hospital
from 醫療.care_center import CareCenterData
from 教育.college import College
from 治安.Robber import RobberData
from 治安.SecurityCamera import SecurityCameraData
from 交通.MRT import MRT
from 交通.rubbish_truck import RubbishTruckData
from 環保.SelectData import SelectData


class Taipei:
    def __init__(self) -> None:
        self.Hospital = Hospital()
        self.care_center = CareCenterData()
        self.college_ = College()
        self.robber_ = RobberData()
        self.camera_ = SecurityCameraData()
        self.mrt_ = MRT()
        self.truck = RubbishTruckData()
        self.S = SelectData()

    def hospital(self):
        return self.Hospital.GetData()
        # self.Hospital.GetData()[i].name
        # self.Hospital.GetData()[i].address

    def careCenter(self):
        return self.care_center.GetAddress()
        # self.care_center.GetAddress()[i]#List

    def college(self):
        return self.college_.GetAddress()
        # self.college_.GetAddress()[i]

    def robber(self):
        return self.robber_.GetAddress()
        # self.robber_.GetAddress()[i]

    def camera(self):
        return self.robber_.GetAddress()
        # self.robber_.GetAddress()[].station
        # self.robber_.GetAddress()[].address

    def mrt(self):
        return self.mrt_.GetAddress()
        # self.mrt_.GetAddress()[i].X
        # self.mrt_.GetAddress()[i].Y

    def rubbishTruckData(slef):
        return slef.truck.GetAddress()
        # slef.truck.GetAddress()[i].X
        # slef.truck.GetAddress()[i].Y

    def EF(self):
        return self.S.GetAddress()
        # self.S.GetAddress()[i]
