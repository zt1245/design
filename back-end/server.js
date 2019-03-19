var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//跨域支持
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', function(req, res) {
  res.send('hello')
})


// 登录接口
app.post('/login',function(req,res){
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  var uname = req.body.uname;
  var password = req.body.password;
  connection.connect();
  var  sql = `SELECT * FROM user where uname="${uname}" and password="${password}"`;
  connection.query(sql,function (err, result) {
    if(err){
      res.send({code:-1,msg:'登录失败'});
    }else{
      if(result.length==0){
        res.send({code:1,msg:'用户名或者密码错误'});
      }else{
        res.send({code:2,msg:'登录成功',uname: uname});
      }
    }
  });
})

// 注册接口
app.post('/register',function(req,res){
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  var uname = req.body.uname;
  var password = req.body.password;
  connection.connect();
  var  sql = `SELECT * FROM user where uname="${uname}"`;
  connection.query(sql,function (err, result) {
    if(err){
      res.send({code:-1,msg:'查询数据库失败'});
    }else{
      if(result.length>0){
        res.send({code:1,msg:'用户名已存在'});
      }else{
        var  sql1 = `insert into user (uname,password) VALUES("${uname}","${password}")`;
        connection.query(sql1,function (err, result) {
          if(err){
            res.send({code:-1,msg:'插入失败'});
          }else{
            res.send({code:2,msg:'插入成功',uname:uname});
          }
        });
      }
    }
  });
});

// 查询分类接口(蛋糕，果汁，甜甜圈，冰淇淋)
app.post('/category',function(req,res){
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  var type = req.body.type;
  connection.connect();
  var  sql = `SELECT * FROM product where type="${type}"`;
  connection.query(sql,function (err, result) {
    if(err){
      res.send({code:-1,msg:'查询失败'});
    }else{
      res.send({code:2,msg:'查询成功',result});
    }
  });
})

//查询全部商品信息接口
app.post('/all',function(req,res){
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  connection.connect();
  var  sql = `SELECT * FROM product`;
  connection.query(sql,function (err, result) {
    if(err){
      res.send({code:-1,msg:'查询失败'});
    }else{
      res.send({code:2,msg:'查询成功',result});
    }
  });
})

// 查询label（新品或推荐）接口
app.post('/label',function(req,res){
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  var label = req.body.label;
  connection.connect();
  var  sql = `SELECT * FROM product where label="${label}"`;
  connection.query(sql,function (err, result) {
    if(err){
      res.send({code:-1,msg:'查询失败'});
    }else{
      res.send({code:2,msg:'查询成功',result});
    }
  });
})

// 查询某个id商品接口
app.post('/pro',function(req,res){
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  var id = req.body.id;
  connection.connect();
  var  sql = `SELECT * FROM product where id="${id}"`;
  connection.query(sql,function (err, result) {
    if(err){
      res.send({code:-1,msg:'查询失败'});
    }else{
      res.send({code:2,msg:'查询成功',result});
    }
  });
})

// 插入购物车信息接口
app.post('/addCar',function(req,res){
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  var username = req.body.username;
  var productid = req.body.productid;
  var price = req.body.price;
  var spec = req.body.spec;
  connection.connect();
  var sql = `SELECT * FROM cart where user_name="${username}" and product_id="${productid}" and spec="${spec}"`;
  connection.query(sql,function (err, result) {
    if(err){
      res.send({code:-1,msg:'查询失败'});
    }else{
      if (result.length === 0) {
        var quantity = 1;
        var sql1 = `insert into cart (user_name,product_id,quantity,spec,unit_price) VALUES("${username}","${productid}","${quantity}","${spec}","${price}")`;
        connection.query(sql1,function (err, result) {
          if(err){
            res.send({code:-1,msg:'插入失败'});
          }else{
            res.send({code:2,msg:'插入成功'});
          }
        });
      } else {
        quantity = parseInt(result[0].quantity) + 1
        var sql1 = `update cart set quantity=${quantity} where user_name="${username}" and product_id="${productid}"`;
        connection.query(sql1,function (err, result) {
          if(err){
            res.send({code:-1,msg:'插入失败'});
          }else{
            res.send({code:2,msg:'插入成功'});
          }
        });
      }
    }
  });
});

// 查询购物车表格的数据接口
app.post('/carInfo',function(req,res){
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  connection.connect();
  var sql = `select a.title,a.pro_img,b.* from product a,cart b where a.id = b.product_id`;
  connection.query(sql,function (err, result) {
    if(err){
      console.log(err)
      res.send({code:-1,msg:'查询失败'});
    }else{
      console.log(result)
      res.send({code:2,msg:'查询成功',result});
    }
  });
});

app.listen(3001,()=>{
  console.log('success',function(){
    console.log('服务器启动成功,且地址是','http://localhost:3001')
  })
})
