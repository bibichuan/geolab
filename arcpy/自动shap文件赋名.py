
# -*- coding: utf-8 -*

## 使用方式:
## 1.打开本代码，修改变量toolboxpath路径，指向自己的ArcGIS安装路径，比如我这里安装在了D:盘,soft文件夹下
## 默认的文件路径："C:/Program Files (x86)/ArcGIS/ArcToolbox/Toolboxes/Data Management Tools.tbx"
## 2.打开命令行工具，可以使用Windows+R键，打开运行窗口，然后输入cmd
## 3.命令行中输入：python 自动shap文件赋名.py "shp文件所在路径"，
## 比如我这里写成：python 自动shap文件赋名.py "D:\可删除测试数据\shp"
## 4.确定即可


import sys, string, os, arcgisscripting
# Create the Geoprocessor object
gp = arcgisscripting.create()
 
 
# Load required toolboxes...
# toolboxpath="D:/soft/ArcGIS/Desktop10.7/ArcToolbox/Toolboxes/Data Management Tools.tbx"
toolboxpath="C:/Program Files (x86)/ArcGIS/ArcToolbox/Toolboxes/Data Management Tools.tbx"
gp.AddToolbox(toolboxpath)
gp.OverWriteOutput = 1
 
# Local variables...
inputWorkspace=sys.argv[1]
gp.workspace=inputWorkspace
feaclasses=gp.ListFeatureClasses()
fea=feaclasses.Next()
i=0
while fea:
	try:
		gp.AddField_management(fea, "NAME", "TEXT", "", "", "", "", "NON_NULLABLE", "NON_REQUIRED", "")
		fileName=os.path.split(fea)[1]
		gp.CalculateField_management(fea, "NAME", "\""+fileName[0:-4] +"\"", "VB", "")
		i=i+1
		gp.AddMessage("第"+str(i)+"个文件:"+fea+"操作成功")
		fea=feaclasses.Next()
	except:	
		gp.AddMessage(fea+"操作失败")
del fea
del	feaclasses