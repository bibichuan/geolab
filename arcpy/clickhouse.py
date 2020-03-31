from clickhouse_driver import Client
import pymysql
 
warnings.filterwarnings('ignore')
pos1 = pymysql.connect(host='192.168.1.235',port=3306,user='root',password='123456',db='0001790455_pos',charset="utf8")
pos = pos1.cursor()
 
client = Client(host='192.168.1.231',database='test6',user='default',password='')
 