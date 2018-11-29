var http = require('http')
var fs = require('fs')
var url = require('url')
var mysql = require('mysql')
var db = require('./dbmethods')

http.createServer(function(req,resp){
    var con = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'root',
        database :'mydb'
    
    })
    var adr = req.url
   
    var q =url.parse(adr,true)
   
    if(q.pathname=='/home.html'){
        fs.readFile('.'+q.pathname,function(err,data){
            if (err) throw err
            resp.writeHead(200);
            return resp.end(data.toString('utf8'));
          
        })
    }
    if(q.pathname=='/login.html'){
        fs.readFile('.'+q.pathname,function(err,data){
            if (err) throw err
            resp.writeHead(200);
            var qdata = q.query
            var name = qdata.uname;
            console.log(name)
            var pswd = qdata.pswd
            console.log(pswd)
            resp.write(data)

            return resp.end(data.toString('utf8'));
            
           
        })
    }
    if(q.pathname=='/register.html'){
        fs.readFile('.'+q.pathname,function(err,data){
            if (err) throw err
            resp.writeHead(200);
            
            return resp.end(data.toString('utf8'));
           

        })
    }
    if(q.pathname=="/hello"){
        var adr1 = req.url
            var p =url.parse(adr1,true)
            var qdata = p.query
         
            var name = qdata.uname
            console.log(name)
            var pswd = qdata.pswd
            var email = qdata.email
            var gender = qdata.gender
            var values = [[name,pswd,email,gender]]
           
            db.insert(values,function(err,data){
                if (err) throw err
                resp.end('updated 1 row')
                
            })


    }
    if(q.pathname=='/hello1'){
        var adr2 = req.url
        var p = url.parse(adr2,true)
        var qdata = p.query
        var name = qdata.uname
        var pswd = qdata.pswd

        con.connect(function(err,result){
            if (err) throw err
            console.log('connected')
            var sql = "select * from register where Name = '?' ";
            //var values = [[name,pswd,email,gender ]]
            Name = [[name]]
            con.query(sql,[Name],function(err,result){
                if (err) throw err
               // console.log()
               
              

                resp.writeHead(200, {'Content-Type': 'application/json'});
                resp.write(JSON.stringify(result));
                resp.write('loggedin successfully')
                console.log('successfullogin')
            })
        })

    }
}).listen(3201)