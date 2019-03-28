var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const cors = require('cors')
var async = require('async')
var multer = require('multer')({
  dest: 'd:/pic/'
});
const fs = require('fs');
var path = require('path');
app.use(cors())
let options = {
  setHeaders: function (res, path, stat) {
    res.set('Access-Control-Allow-Origin', '*')
  }
}
app.use(express.static('public', options))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//跨域支持
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', function (req, res) {
  res.send('hello')
})


// 登录接口
app.post('/login', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  var uname = req.body.uname;
  var password = req.body.password;
  connection.connect();
  var sql = `SELECT * FROM user where uname="${uname}" and password="${password}"`;
  connection.query(sql, function (err, result) {
    if (err) {
      res.send({ code: -1, msg: '登录失败' });
    } else {
      if (result.length == 0) {
        res.send({ code: 1, msg: '用户名或者密码错误' });
      } else {
        res.send({ code: 2, msg: '登录成功', uname: uname });
      }
    }
  });
})

// 注册接口
app.post('/register', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  var uname = req.body.uname;
  var password = req.body.password;
  connection.connect();
  var sql = `SELECT * FROM user where uname="${uname}"`;
  connection.query(sql, function (err, result) {
    if (err) {
      res.send({ code: -1, msg: '查询数据库失败' });
    } else {
      if (result.length > 0) {
        res.send({ code: 1, msg: '用户名已存在' });
      } else {
        var sql1 = `insert into user (uname,password) VALUES("${uname}","${password}")`;
        connection.query(sql1, function (err, result) {
          if (err) {
            res.send({ code: -1, msg: '插入失败' });
          } else {
            res.send({ code: 2, msg: '插入成功', uname: uname });
          }
        });
      }
    }
  });
});

// 查询分类接口(蛋糕，果汁，甜甜圈，冰淇淋)
app.post('/category', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  var type = req.body.type;
  connection.connect();
  var sql = `SELECT * FROM product where type="${type}"`;
  connection.query(sql, function (err, result) {
    if (err) {
      res.send({ code: -1, msg: '查询失败' });
    } else {
      res.send({ code: 2, msg: '查询成功', result });
    }
  });
})

//查询全部商品信息接口
app.post('/all', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  connection.connect();
  var sql = `SELECT * FROM product`;
  connection.query(sql, function (err, result) {
    if (err) {
      res.send({ code: -1, msg: '查询失败' });
    } else {
      res.send({ code: 2, msg: '查询成功', result });
    }
  });
})

// 查询label（新品或推荐）接口
app.post('/label', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  var label = req.body.label;
  connection.connect();
  var sql = `SELECT * FROM product where label="${label}"`;
  connection.query(sql, function (err, result) {
    if (err) {
      res.send({ code: -1, msg: '查询失败' });
    } else {
      res.send({ code: 2, msg: '查询成功', result });
    }
  });
})

// 查询某个id商品接口
app.post('/pro', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  var id = req.body.id;
  connection.connect();
  var sql = `SELECT * FROM product where id="${id}"`;
  connection.query(sql, function (err, result) {
    if (err) {
      res.send({ code: -1, msg: '查询失败' });
    } else {
      res.send({ code: 2, msg: '查询成功', result });
    }
  });
})

// 插入购物车信息接口
app.post('/addCar', function (req, res) {
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
  connection.query(sql, function (err, result) {
    if (err) {
      res.send({ code: -1, msg: '查询失败' });
    } else {
      if (result.length === 0) {
        var quantity = 1;
        var sql1 = `insert into cart (user_name,product_id,quantity,spec,unit_price) VALUES("${username}","${productid}","${quantity}","${spec}","${price}")`;
        connection.query(sql1, function (err, result) {
          if (err) {
            res.send({ code: -1, msg: '插入失败' });
          } else {
            res.send({ code: 2, msg: '插入成功' });
          }
        });
      } else {
        quantity = parseInt(result[0].quantity) + 1
        var sql1 = `update cart set quantity=${quantity} where user_name="${username}" and product_id="${productid}"`;
        connection.query(sql1, function (err, result) {
          if (err) {
            res.send({ code: -1, msg: '插入失败' });
          } else {
            res.send({ code: 2, msg: '插入成功' });
          }
        });
      }
    }
  });
});

// 查询购物车表格的数据接口
app.post('/carInfo', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  let uname = req.body.uname
  connection.connect();
  var sql = `select a.title,a.pro_img,b.* from product a,cart b where a.id = b.product_id and user_name = '${uname}'`;
  connection.query(sql, function (err, result) {
    if (err) {
      res.send({ code: -1, msg: '查询失败' });
    } else {
      res.send({ code: 2, msg: '查询成功', result });
    }
  });
});

// 修改某个商品数量的接口（加一或减一）
app.post('/updatePro', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  let quantity = req.body.quantity
  let id = req.body.id
  connection.connect();
  var sql = `update cart set quantity=${quantity} where id="${id}"`;
  connection.query(sql, function (err, result) {
    if (err) {
      res.send({ code: -1, msg: '修改失败' });
    } else {
      res.send({ code: 2, msg: '修改成功', result });
    }
  });
});

// 确认订单页面的查询数据接口
app.post('/checkOrder', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  let proList = JSON.parse(req.body.proList)
  connection.connect();
  var sql = `SELECT t1.quantity,t1.spec,t1.unit_price,t2.title,t2.pro_img FROM (SELECT * FROM cart WHERE cart.id in (${proList}))as t1,product t2 WHERE t1.product_id = t2.id`;
  connection.query(sql, function (err, result) {
    if (err) {
      res.send({ code: -1, msg: '查询失败' });
    } else {
      res.send({ code: 2, msg: '查询成功', result });
    }
  });
});

// 删除某个商品的接口
app.post('/delete', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  let id = req.body.idNum
  let uname = req.body.username
  connection.connect();
  var sql = `DELETE FROM cart WHERE id='${id}' and user_name='${uname}'`;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err)
      res.send({ code: -1, msg: '删除失败' });
    } else {
      res.send({ code: 2, msg: '删除成功' });
    }
  });
});

// 清空某个用户的购物车接口
app.post('/empty', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  let uname = req.body.username
  connection.connect();
  var sql = `DELETE FROM cart WHERE user_name='${uname}'`;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err)
      res.send({ code: -1, msg: '删除失败' });
    } else {
      res.send({ code: 2, msg: '删除成功' });
    }
  });
});

// 查询某个用户的地址信息接口
app.post('/selAdd', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  let uname = req.body.uname
  connection.connect();
  var sql = `SELECT * FROM address where user_id="${uname}"`;
  connection.query(sql, function (err, result) {
    console.log(err)
    if (err) {
      res.send({ code: -1, msg: '查询失败' });
    } else {
      res.send({ code: 2, msg: '查询成功', result });
    }
  });
});

//添加某个用户的地址接口
app.post('/addAddr', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  let area = req.body.area
  let addr = req.body.addr
  let name = req.body.name
  let tel = req.body.tel
  let username = req.body.username
  let province = req.body.province
  let city = req.body.city
  connection.connect();
  var sql = `insert into address (user_id,name,phone,area,addr,city,province) VALUES("${username}","${name}","${tel}","${area}","${addr}","${city}","${province}")`;
  connection.query(sql, function (err, result) {
    console.log(err)
    if (err) {
      res.send({ code: -1, msg: '插入失败' });
    } else {
      res.send({ code: 2, msg: '插入成功', result });
    }
  });
});

// 将选中的商品拼接成字符串插入到orderList订单中并将cart表中相对应的商品的接口
app.post('/IdList', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  // 选中的id的数组
  let idList = req.body.idList
  // 订单号
  let order_no = req.body.outTradeNo
  // 订单开始时间（生成订单的时间）
  let begin_time = req.body.currentdate
  // 订单状态
  let status = req.body.status
  // 总价格
  let totalPrice = req.body.totalPrice
  // 用户名字
  let user_name = req.body.uname
  connection.connect();
  var sql = `select * from cart WHERE id in (${idList})`;
  connection.query(sql, function (err, result) {
    console.log(err)
    if (err) {
      res.send({ code: -1, msg: '查询失败' });
    } else {
      console.log(result)
      // 商品id
      let product_id = ''
      // 商品规格
      let spec = ''
      // 商品单价
      let unit_price = ''
      // 商品数量
      let quantity = ''
      for (var i = 0; i < result.length; i++) {
        product_id += result[i].product_id + ","
        spec += result[i].spec + ","
        unit_price += result[i].unit_price + ","
        quantity += result[i].quantity + ","
      }
      if (product_id.length > 0) {
        product_id = product_id.substr(0, product_id.length - 1);
      }
      if (spec.length > 0) {
        spec = spec.substr(0, spec.length - 1);
      }
      if (unit_price.length > 0) {
        unit_price = unit_price.substr(0, unit_price.length - 1);
      }
      if (quantity.length > 0) {
        quantity = quantity.substr(0, quantity.length - 1);
      }
      console.log(product_id, spec, unit_price, quantity, order_no)
      var sql1 = `insert into orderList (order_no,user_name,product_id,status,begin_time,spec,unit_price,quantity,total_price) VALUES("${order_no}","${user_name}","${product_id}","${status}","${begin_time}","${spec}","${unit_price}","${quantity}","${totalPrice}")`;
      connection.query(sql1, function (err, result) {
        console.log(err)
        if (err) {
          res.send({ code: -1, msg: '插入失败' });
        } else {
          var sql2 = `delete from  cart  where id in (${idList})`;
          connection.query(sql2, function (err, result) {
            console.log(err)
            if (err) {
              res.send({ code: -1, msg: '删除失败' });
            } else {
              res.send({ code: 2, msg: '删除成功', result });
            }
          })
        }
      })
    }
  })
})

// 取消订单的接口
app.post('/updateStatus', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  let order_no = req.body.orderNo
  let status = req.body.status
  let close_time = req.body.cancledate
  let add_id = req.body.addId
  let delivery_time = req.body.deliveryTime
  let delivery_date = req.body.deliveryDate
  let message = req.body.message
  connection.connect();
  var sql = `update orderList set status="${status}",close_time="${close_time}",add_id="${add_id}",delivery_time="${delivery_time}",delivery_date="${delivery_date}",message="${message}" where order_no="${order_no}"`;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err)
      res.send({ code: -1, msg: '取消失败' });
    } else {
      res.send({ code: 2, msg: '取消成功' });
    }
  });
});

// 修改订单状态
app.post('/Status', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  let order_no = req.body.orderNo
  let status = req.body.status
  let payment_time = req.body.paytime
  connection.connect();
  var sql = `update orderList set status="${status}",payment_time="${payment_time}" where order_no="${order_no}"`;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err)
      res.send({ code: -1, msg: '修改失败' });
    } else {
      res.send({ code: 2, msg: '修改成功' });
    }
  });
});

app.listen(3001, () => {
  console.log('success', function () {
    console.log('服务器启动成功,且地址是', 'http://localhost:3001')
  })
})
