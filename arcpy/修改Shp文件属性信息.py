#!/usr/bin/python
# -*- coding: UTF-8 -*-

import os
import arcpy

shp = r"D:\zlc\test.shp"
numberList=[]
## 获取全部的线段编号
with arcpy.da.SearchCursor(shp,["Number"]) as cursor:
    for uniquerow in cursor:
        if uniquerow[0] not in numberList:
            numberList.append(uniquerow[0])
## 遍历每个线段编号，然后为子线段进行编号
for number in numberList:
    query='"Number"='+str(number)
    count=0
    cursor_line = arcpy.UpdateCursor(shp, query, "", "SubNumber", "Number")
    for row_line in cursor_line:
        count+=1
        row_line.setValue("SubNumber", count)
        cursor_line.updateRow(row_line)
    del row_line
    del cursor_line
print 'done'