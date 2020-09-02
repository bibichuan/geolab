#!/usr/bin/python
# -*- coding: UTF-8 -*-

## 程序作用 
# 1.pdf统一改部分名
# 2.根据pdf生成文件夹

from shutil import copy
from sys import exit


import os  
g = os.walk('./file')  
  
for path,d,filelist in g:
    for filename in filelist:  

        ## 获取文件名称
        (file, ext) = os.path.splitext(filename)

        ## 判断路径是否存在

        targetFilename=filename.replace("[","〔")
        targetFilename=targetFilename.replace("]","〕")

        targetPath=path+"\\"+targetFilename
        ## 创建文件夹
        isExists=os.path.exists(targetPath)
        if not isExists:
            # 如果不存在则创建目录,创建目录操作函数
            '''
            os.mkdir(path)与os.makedirs(path)的区别是,当父目录不存在的时候os.mkdir(path)不会创建，os.makedirs(path)则会创建父目录
            '''
            #此处路径最好使用utf-8解码，否则在磁盘中可能会出现乱码的情况
            os.makedirs(targetPath) 
            print(targetPath+' create success')
        
        ## 复制文件
        source=os.path.abspath(path+"\\"+filename)

        target = targetPath+"\\"+targetFilename

        target=os.path.abspath(target)
        print (target)
        print (source)

        # adding exception handling
        try:
            copy(source, target)
        except IOError as e:
            print("Unable to copy file. %s" % e)
        except:
            print("Unexpected error:", sys.exc_info())