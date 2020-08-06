# -*- coding: utf-8 -*-
'''
from clickhouse_driver import Client
client = Client(host='192.168.1.90',database='phalgorithm',user='algorithmrw',password='phkj_^.7860')
str1 = "INSERT INTO phalgorithm.pipeHeatAnalyse(id,calcTable) values(6,['{'12':4}']);"
client.execute(str1)
'''

import sys
## 导入当前目录包
sys.path.append('.')

import asyncio
import testConn

str1 = '("pipe":{"jj":7},"Diameter":[1,2,3,4])'

asyncio.run(testConn.main(str1))