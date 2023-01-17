from ast import Constant
from re import X


for X in range(1,6):
    with open("./Num"+str(X)+".txt", "r+") as f:
        Num = f.read()
        NumArray = Num.split("\n")
        RGBArray = NumArray[len(NumArray)-2].replace("rgb(","").replace(")","").split(",")
        NewRGBString = "\n"
        Index = int(RGBArray[2])+1
        while Index <= 255:
            NewRGBString = "rgb("+RGBArray[0]+","+RGBArray[1]+","+str(X)+")\n"
            print(NewRGBString)
            Index+=15








