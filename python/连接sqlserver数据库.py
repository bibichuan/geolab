
# -*- coding: utf-8 -*-
"""
Created on Mon Dec  2 15:11:35 2019

@author: ph
"""

import pymssql

import sys
import io
import os
reload(sys)
print sys.getdefaultencoding()
sys.setdefaultencoding('utf8')


os.environ['NLS_LANG'] = 'SIMPLIFIED CHINESE_CHINA.UTF8'

# import codecs
# sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())


# def setup_io():
#     sys.stdout = sys.__stdout__ = io.TextIOWrapper(sys.stdout.detach(), encoding='utf-8', line_buffering=True)
#     sys.stderr = sys.__stderr__ = io.TextIOWrapper(sys.stderr.detach(), encoding='utf-8', line_buffering=True)
    
# setup_io()


class LinkDB():
	def linkdb(self):
		## database=u'\u534E\u7535\u4E0B\u6C99'
		database="ztzn"
		print(database)
		#数据库远程连接
		## conn = pymssql.connect(host="127.0.0.1",user="admin",password="1q2w3e4r.",database="test",charset="utf8")
		conn = pymssql.connect(host="120.199.181.229",user="PhEmsPh_donglu",password="9q-3W*4&8",database=database,charset="utf8")

		# # 使用cursor()方法获取操作游标
		cursor = conn.cursor()
		#查询语句
		# sql = "SELECT * FROM [dbo].[test]"
		sql="SELECT * FROM [dbo].[V_client]"
		try:
			cursor.execute(sql)  #游标
			result = cursor.fetchone() #查询
			print(result)
		except:
			print("error")
         
        #cursor.close()
		#关闭数据库连接
		conn.close()   
			
if __name__ == '__main__':
	link=LinkDB()
	link.linkdb()
