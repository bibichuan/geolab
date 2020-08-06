# -*- coding: utf-8 -*-

import asyncio
from aiochclient import ChClient
from aiohttp import ClientSession

async def main():
    print("dddsd")
    async with ClientSession() as s:
        client = ChClient(s,url='http://192.168.1.90:8123/',user='xxx',password='xxx',database='xxx')
        alive= await client.is_alive()  # returns True if connection is Ok
        print(alive)
        print("{{{0}}}:{1}".format("Name",12))
        sql='INSERT INTO phalgorithm.pipeHeatAnalyse(id,calcTable) values (4,\'{{"pp":"dsf"}}\')'

        await client.execute(sql)
    
if __name__ == '__main__':
    asyncio.run(main())