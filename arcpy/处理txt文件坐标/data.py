#!/usr/bin/python
#conding=utf8  
import os


# workspace="/mnt/bibichuan/三年预审/三年预审"
workspace="/Users/bibichuan/bibichuan/projects/三年预审/三年预审"
# dataspace=workspace+"/19年(2)"
dataspace=workspace+"/20年(3)"
# dataspace=workspace+"/21年(3)"

## 递归遍历文件及其文件夹
def traverse(filepath,datafile,logfile):
    #遍历filepath下所有文件，包括子目录
    files = os.listdir(filepath)
    for fi in files:
        fi_d = os.path.join(filepath,fi)
        ## 如果是文件夹，进行递归            
        if os.path.isdir(fi_d):
            traverse(fi_d,datafile,logfile)
        ## 否则进行文件处理                 
        else:
            ## 文件路径
            fipath=fi_d
            if fipath.endswith(".txt"):
                print('正在处理的文件:'+fipath)
                filename=os.path.basename(fipath)
                ## 标志是否新行
                newGroup=False
                ## 分组编号
                groupNumber=1
                # 读取txt文件
                with open(fipath, "r",encoding="gbk") as f:
                    try:
                        ## 行号
                        cycleLineNumber=-1
                        preLinuNumber=-1

                        for line in f.readlines():
                            line = line.strip('\n')  #去掉列表中每一个元素的换行符
                            ## 分割字符串
                            lines=line.split(',')
                            ## 获取j内容,有些文件可能没有j
                            if len(lines) > 3:
                                jcontent=lines[3]
                                jsubcontent=int(jcontent[1:])

                                ## 上一行
                                ## 当遇到新的1,判断是否已经初始化了上一行的行号，如果有，则将当前行号增加1，然后重新归零
                                if jsubcontent==1 and cycleLineNumber !=-1 :
                                    preLinuNumber=preLinuNumber+1
                                    cycleLineNumber=-1
                                    ## 下一行为新行
                                    newGroup=True
                                else :
                                    preLinuNumber=jsubcontent
                                    cycleLineNumber=jsubcontent
                                
                                ## 写入文件
                                # print(jcontent,preLinuNumber,cycleLineNumber)
                                newline=filename+","+str(preLinuNumber)+","+filename+"_"+str(groupNumber)+","+line+"\n"
                                ## 写入文件
                                datafile.write(newline)

                                ## 判断是否是新行的开始,重置
                                if newGroup :
                                    groupNumber+=1
                                    newGroup=False
                            else:
                                print('文件格式不正确:'+fipath)
                                logfile.write('文件处理失败:'+fipath+"\n")
                            # print(line)
                    except:
                        logfile.write('文件处理失败:'+fipath+"\n")
                        print('文件处理失败:'+fipath)
                        

## 打开文件
workspacename=os.path.basename(dataspace)
with open(workspace+'/'+workspacename+'_data.txt','a+') as datafile,open(workspace+'/'+workspacename+'_log.txt','a+') as logfile:
    #递归遍历 目录下所有文件
    traverse(dataspace,datafile,logfile)