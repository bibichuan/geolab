var rf=require("fs");
var front_matter=require("hexo-front-matter");
var grey_matter=require("gray-matter");
var moment=require("moment");
rf.readFile("Git和GitHub.md",'utf-8',function(err,data){
    if(err){
        console.log(err);
    }else{
        var obj=grey_matter(data);
        var titleObj=obj.data;
        titleObj.tags="k";
        console.log(titleObj.date);
        // var d=moment(titleObj.date).format('YYYY-MM-DD hh:mm:ss');
        // console.log(d);
        // titleObj.date=""+d;

        rf.writeFile("test.md", obj.stringify(), function(error){
            if(err){
                console.log(error);
            }else{
                console.log('写文件操作成功');
            } 
        })
    }
});