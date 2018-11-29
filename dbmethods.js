var mysql = require('mysql')

var con = mysql.createConnection({
    host:'localhost',
        user:'root',
        password:'root',
        database :'mydb'

})

function insert(values,callback){
    var sql = "INSERT INTO register(Name,Password,email,gender) VALUES ?";
    con.query(sql,[values],function(err,result){
        if (err) throw err
    callback(null,result)

})
}
function validate(values,callback){
    var sql = "select * from register where Name = 'name' and Password = 'pswd' ";
    con.query(sql,function(err,data){
        if (err) throw err
        callback(null,result)
    })
}
module.exports={insert,validate};

