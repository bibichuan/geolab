#!/usr/bin/python
# -*- coding: UTF-8 -*-

import os
import arcpy

shp = r"D:\zlc\郑\JSZH.gdb\JSZH"
numberList=[]
## 获取全部的线段编号
with arcpy.da.SearchCursor(shp,["ZHLX"]) as cursor:
    for uniquerow in cursor:
        if uniquerow[0] not in numberList:
            numberList.append(uniquerow[0])
## 遍历每个线段编号，然后为子线段进行编号
fields = ['ZHLX', 'test','BSM']
for number in numberList:
    count=0
    with arcpy.da.UpdateCursor(shp, fields) as cursor_line:
        for row_line in cursor_line:
            if(row_line[0]==number):
                count=count+1
                row_line[1]=number+"-"+str(count).zfill(4)
                cursor_line.updateRow(row_line)
print 'done'