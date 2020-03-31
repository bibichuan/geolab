#!/usr/bin/python
# -*- coding: UTF-8 -*-

import os
import arcpy


shp = r'D:\zlc\hdxs\geodata\pipeline_20190827_0819_返回线段指定距离的点.shp'
# ## 第一种方法，就是先对线段进行增密，然后在折点处分割
# ## 先对线进行增密，也就是每一面增加一个点
# arcpy.Densify_edit(shp, "DISTANCE", "1 Meters") 
# ## 然后再折点处对线进行分割
# arcpy.SplitLine_management(shp, r"D:\zlc\test.shp")
# print "done"

## 第二种方式，使用Polyline的Polyline的positionAlongLine方法，先计算线段总长度，然后将第二个参数设为true，用1米去除线段总长度，用百分比的方式获取线段上的点
split_point=r"D:\zlc\hdxs\geodata\split_point_20190827_0821.shp"

# cursor = arcpy.da.SearchCursor(shp,["Number","Length","SHAPE@"])

# rows = arcpy.InsertCursor(split_point)

# # Iterate through the rows in the cursor
# for row in cursor:
#     number=row[0]
#     length=row[1]
#     polyline=row[2]
#     pointCount=int(length)
#     print pointCount
#     for i in range(1,pointCount):
#         point=polyline.positionAlongLine(1*i/length,True)
#         pointRow = rows.newRow()
#         pointRow.shape=point
#         rows.insertRow(pointRow)

# del cursor, row,rows


## 在点处分割线段
inFeatures = r"D:\zlc\hdxs\geodata\pipeline_20190828_1733从点打断线.shp"
outFeatureclass = r"D:\zlc\splitline_out.shp"
arcpy.SplitLineAtPoint_management(inFeatures, split_point, outFeatureclass)

print "done"