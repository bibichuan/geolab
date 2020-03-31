#!/usr/bin/python
# -*- coding: UTF-8 -*-
import img2pdf
import os

extion=['.jpg']
if __name__=="__main__":
    a4inpt = (img2pdf.mm_to_pt(210),img2pdf.mm_to_pt(297))
    layout_fun = img2pdf.get_layout_fun(a4inpt)

    path = "img" #文件夹目录
    files= os.listdir(path) #得到文件夹下的所有文件名称

    s = []
    #遍历文件夹
    for file in files: 
        #判断是否是文件夹，不是文件夹才打开
        if not os.path.isdir(file):
            filename=os.path.splitext(file)[0]
            fileextion=os.path.splitext(file)[-1]
            if fileextion in extion:
                print(filename)
                with open(filename+'.pdf','wb') as f:
                    print(path+'/'+file)
                    f.write(img2pdf.convert([path+'/'+file],layout_fun=layout_fun))
    print("done")