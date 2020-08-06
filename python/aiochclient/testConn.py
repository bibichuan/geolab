# -*- coding: utf-8 -*-

import asyncio
from aiochclient import ChClient
from aiohttp import ClientSession
# from clickhouse_driver import Client


async def main(calcTable):
   async with ClientSession() as s:
    client = ChClient(s,url='http://192.168.1.90:8123/',user='algorithmrw',password='phkj_^.7860',database='phalgorithm')
    alive = await client.is_alive() 
    #print(alive) #验证数据库是否连接成功
    #选择当前数据库中最大的id号
    all_rows = await client.fetch("SELECT max(id) FROM phalgorithm.pipeHeatAnalyse")
    dataId = all_rows[0][0]
    if dataId == None:
      dataId = 0
    dataId = dataId + 1
    await asyncio.gather(writeData(client,dataId,calcTable))
    

async def writeData(client,dataId,calcTable):
  dataId = str(dataId)
  str1 = "INSERT INTO phalgorithm.pipeHeatAnalyse(id,calcTable) values"
  str1 = str1 + "("+dataId+",'"+calcTable+"'),"
  str1 = str1[0:len(str1)-1]
  await client.execute(str1)





  
    
    





