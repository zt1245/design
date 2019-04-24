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
  var phone = req.body.phone;
  connection.connect();
  var sql = `SELECT * FROM user where uname="${uname}"`;
  connection.query(sql, function (err, result) {
    if (err) {
      res.send({ code: -1, msg: '查询数据库失败' });
    } else {
      if (result.length > 0) {
        res.send({ code: 1, msg: '用户名已存在' });
      } else {
        var sql1 = `insert into user (uname,password,phone) VALUES("${uname}","${password}","${phone}")`;
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
    console.log(err)
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
  let order_no = req.body.orderNo
  connection.connect();
  var sql = `SELECT * FROM orderList WHERE order_no="${order_no}"`;
  connection.query(sql, function (err, result) {
    console.log(err)
    if (err) {
      res.send({ code: -1, msg: '查询失败' });
    } else {
      res.send({ code: 2, msg: '查询成功', result })
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
  var sql = `SELECT * FROM address where user_name="${uname}"`;
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
  let addr = req.body.addr
  let name = req.body.name
  let tel = req.body.tel
  let username = req.body.username
  let add_ahead = req.body.add
  connection.connect();
  var sql = `insert into address (user_name,name,phone,addr,addr_ahead) VALUES("${username}","${name}","${tel}","${addr}","${add_ahead}")`;
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
  let proTitle = req.body.titleStr
  let proImg = req.body.imgStr
  connection.connect();
  console.log(idList)
  var sql = `select * from cart WHERE product_id in (${idList})`;
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
      var sql1 = `insert into orderList (order_no,user_name,product_id,status,begin_time,spec,unit_price,quantity,total_price,proTitle,proImg) VALUES("${order_no}","${user_name}","${product_id}","${status}","${begin_time}","${spec}","${unit_price}","${quantity}","${totalPrice}",'${proTitle}','${proImg}')`;
      connection.query(sql1, function (err, result) {
        console.log(err)
        if (err) {
          res.send({ code: -1, msg: '插入失败' });
        } else {
          var sql2 = `delete from  cart  where product_id in (${idList})`;
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

// 查询所选中的商品的信息
app.post('/idselect', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  let idList = req.body.idList
  connection.connect();
  var sql = `select * from product WHERE id in (${idList})`;
  connection.query(sql, function (err, result) {
    console.log(err)
    if (err) {
      console.log(err)
      res.send({ code: -1, msg: '查询失败' });
    } else {
      res.send({ code: 2, msg: '查询成功', data: result });
    }
  });
});

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

// 删除某个订单
app.post('/delOrder', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  let order_no = req.body.orderNo
  connection.connect();
  var sql = `DELETE FROM orderList WHERE order_no="${order_no}"`;
  connection.query(sql, function (err, result) {
    console.log(err)
    if (err) {
      console.log(err)
      res.send({ code: -1, msg: '删除失败' });
    } else {
      res.send({ code: 2, msg: '删除成功' });
    }
  });
});

// 查询所有订单的接口
app.post('/allor', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  let uname = req.body.uname
  let pageSize = parseInt(req.body.pagesize)
  let page = parseInt(req.body.currentPage);
  let startPage = (page - 1) * pageSize
  let endPage = pageSize
  connection.connect();
  async.parallel([
    function (callback) {
      var sql = `SELECT * FROM orderList where user_name="${uname}" limit ${startPage},${pageSize}`;
      connection.query(sql, function (err, result) {
        if (err) {
          console.log(err)
          callback({ code: -1, msg: '查询数据库失败' })
        } else {
          callback(null, result)
        }
      })
    },
    function (callback) {
      var sql1 = 'SELECT COUNT(*) as count FROM orderList';
      connection.query(sql1,function (err,result) {
        if (err) {
          console.log(err)
          callback({ code: -1, msg: '查询数据库失败' });
        } else {
          callback(null, result[0].count)
        }
      })
    }
  ],function(err,result){
    if(err) {
      console.log(err)
      res.send({code:-1,msg:'数据库查询失败'})
    }else {
      if (Math.ceil(result[1] / page) < pageSize) {
        res.send({
          code: -1,
          message: '暂无更多数据'
        })
      } else {
        res.send({
          code: 2,
          data: result[0],
          count: result[1]
        })
      }
    }
  })
});

// 查询某个状态的所有订单的接口
app.post('/statusorder', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  let uname = req.body.uname
  let pageSize = parseInt(req.body.pagesize)
  let page = parseInt(req.body.currentPage);
  let status = req.body.status
  let startPage = (page - 1) * pageSize
  let endPage = pageSize
  connection.connect();
  async.parallel([
    function (callback) {
      var sql = `SELECT * FROM orderList where user_name="${uname}" and status="${status}" limit ${startPage},${pageSize}`;
      connection.query(sql, function (err, result) {
        if (err) {
          console.log(err)
          callback({ code: -1, msg: '查询数据库失败' })
        } else {
          callback(null, result)
        }
      })
    },
    function (callback) {
      var sql1 = `SELECT COUNT(*) as count FROM orderList where status="${status}"`;
      connection.query(sql1,function (err,result) {
        if (err) {
          console.log(err)
          callback({ code: -1, msg: '查询数据库失败' });
        } else {
          callback(null, result[0].count)
        }
      })
    }
  ],function(err,result){
    if(err) {
      console.log(err)
      res.send({code:-1,msg:'数据库查询失败'})
    }else {
      if (Math.ceil(result[1] / page) < pageSize) {
        res.send({
          code: -1,
          message: '暂无更多数据'
        })
      } else {
        res.send({
          code: 2,
          data: result[0],
          count: result[1]
        })
      }
    }
  })
});

// 查询某个状态的订单接口
app.post('/orderStatus', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  let status = req.body.status
  let uname = req.body.uname
  connection.connect();
  var sql = `SELECT order_no  FROM orderList WHERE status="${status}" and user_name="${uname}"`;
  connection.query(sql, function (err, result) {
    console.log(err)
    if (err) {
      console.log(err)
      res.send({ code: -1, msg: '删除失败' });
    } else {
      res.send({ code: 2, msg: '删除成功', data: result });
    }
  });
});

// 删除某个地址的信息
app.post('/delAdd', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  let id = req.body.id
  connection.connect();
  var sql = `DELETE FROM address WHERE id="${id}"`;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err)
      res.send({ code: -1, msg: '删除失败' });
    } else {
      res.send({ code: 2, msg: '删除成功', data: result });
    }
  });
});

// 查询某个地址的信息
app.post('/selectA', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  let id = req.body.id
  connection.connect();
  var sql = `SELECT * FROM address WHERE id="${id}"`;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err)
      res.send({ code: -1, msg: '查询失败' });
    } else {
      res.send({ code: 2, msg: '查询成功', data: result });
    }
  });
});

// 查询手机号
app.post('/selPhone', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  let uname = req.body.uname
  connection.connect();
  var sql = `SELECT phone FROM user WHERE uname="${uname}"`;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err)
      res.send({ code: -1, msg: '查询失败' });
    } else {
      res.send({ code: 2, msg: '查询成功', data: result });
    }
  });
});

// 修改密码
app.post('/uppwd', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  let password = req.body.pwd
  let uname = req.body.uname
  connection.connect();
  var sql = `update user set password="${password}" WHERE uname="${uname}"`;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err)
      res.send({ code: -1, msg: '修改失败' });
    } else {
      res.send({ code: 2, msg: '修改成功'});
    }
  });
});

// 修改地址
app.post('/upaddress', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  let addr = req.body.addr
  let name = req.body.name
  let tel = req.body.tel
  let id = req.body.id
  let add = req.body.add
  connection.connect();
  console.log(tel)
  var sql = `update address set addr="${addr}",name="${name}",phone="${tel}",addr_ahead="${add}" WHERE id="${id}"`;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err)
      res.send({ code: -1, msg: '修改失败' });
    } else {
      res.send({ code: 2, msg: '修改成功'});
    }
  });
});

// 查询用户信息的接口（后台管理系统）
app.post('/userinfo', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  connection.connect();
  var sql = `SELECT * FROM user`;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err)
      res.send({ code: -1, msg: '查询失败' });
    } else {
      res.send({ code: 2, msg: '查询成功', data: result });
    }
  });
});

//图片管理
app.post('/addImage', multer.single('file'),function (req, res) {
  fs.readFile(req.file.path, function (err, data) {
    if(err) {
    }else {
      var fileName = new Date().getTime() + '_' + req.file.originalname;
      var des_file = path.resolve(__dirname, 'public/images', fileName);
      fs.writeFile(des_file,data,function (err) {
        if(err) {
        }else {
          res.send({
            code:200,
            data: fileName
          })
        }
      })
    }
  })
})

// 查询商品的数据接口（分页查询）
app.post('/paging', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  let pageSize = parseInt(req.body.pagesize)
  let page = parseInt(req.body.currentPage);
  let startPage = (page - 1) * pageSize
  let endPage = pageSize
  connection.connect();
  async.parallel([
    function (callback) {
      var sql = `SELECT * FROM product limit ${startPage},${pageSize}`;
      connection.query(sql, function (err, result) {
        if (err) {
          console.log(err)
          callback({ code: -1, msg: '查询数据库失败' })
        } else {
          callback(null, result)
        }
      })
    },
    function (callback) {
      var sql1 = 'SELECT COUNT(*) as count FROM product';
      connection.query(sql1,function (err,result) {
        if (err) {
          console.log(err)
          callback({ code: -1, msg: '查询数据库失败' });
        } else {
          callback(null, result[0].count)
        }
      })
    }
  ],function(err,result){
    if(err) {
      console.log(err)
      res.send({code:-1,msg:'数据库查询失败'})
    }else {
      if (Math.ceil(result[1] / page) < pageSize) {
        res.send({
          code: -1,
          message: '暂无更多数据'
        })
      } else {
        res.send({
          code: 2,
          data: result[0],
          count: result[1]
        })
      }
    }
  })
})

//存进商品表格的数据
app.post('/save', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  connection.connect();
  let list = req.body.form
  let pImg = req.body.pImg
  let mList = JSON.stringify(req.body.mList)
  let dList = JSON.stringify(req.body.dList)
  let time = req.body.cancledate
  let title = list.name
  let detail = list.detail
  let describe = list.describe
  let unit_price = list.price
  let type = list.type.split(' ')[0]
  if (list.tab === '新品') {
    var label = 1
  } else if (list.tab === '热卖') {
    var label = 0
  } else {
    var label = ''
  }
  if (list.sweet === 1) {
    var sweet = '1,0,0,0,0'
  } else if (list.sweet === 2) {
    var sweet = '1,1,0,0,0'
  } else if (list.sweet === 3) {
    var sweet = '1,1,1,0,0'
  } else if (list.sweet === 4) {
    var sweet = '1,1,1,1,0'
  } else if (list.sweet === 5) {
    var sweet = '1,1,1,1,1'
  }
  var sql = `insert into product (title,detail,des,unit_price,sweet,type,label,maynifier_img,detail_img,pro_img,time) VALUES("${title}","${detail}","${describe}","${unit_price}","${sweet}","${type}","${label}",'${mList}','${dList}',"${pImg}","${time}")`;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err)
      res.send({ code: -1, msg: '插入失败' });
    } else {
      res.send({ code: 2, msg: '插入成功'});
    }
  });
});

// 删除商品
app.post('/delPro', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  connection.connect();
  let id = req.body.num;
  var sql = `DELETE FROM product WHERE id='${id}'`;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err)
      res.send({ code: -1, msg: '删除失败' });
    } else {
      res.send({ code: 2, msg: '删除成功'});
    }
  });
});

// 修改商品
app.post('/upPro', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  connection.connect();
  let list = req.body.form
  let pImg = req.body.pImg
  let mList = JSON.stringify(req.body.mList)
  let dList = JSON.stringify(req.body.dList)
  let time = req.body.cancledate
  let title = list.name
  let detail = list.detail
  let describe = list.describe
  let unit_price = list.price
  let type = list.type.split(' ')[0]
  let id = req.body.id
  if (list.tab === '新品') {
    var label = 1
  } else if (list.tab === '热卖') {
    var label = 0
  } else {
    var label = ''
  }
  if (list.sweet === 1) {
    var sweet = '1,0,0,0,0'
  } else if (list.sweet === 2) {
    var sweet = '1,1,0,0,0'
  } else if (list.sweet === 3) {
    var sweet = '1,1,1,0,0'
  } else if (list.sweet === 4) {
    var sweet = '1,1,1,1,0'
  } else if (list.sweet === 5) {
    var sweet = '1,1,1,1,1'
  }
  var sql = `update product set title="${title}",detail="${detail}",des="${describe}",unit_price="${unit_price}",sweet="${sweet}",type="${type}",label="${label}",maynifier_img='${mList}',detail_img='${dList}',pro_img="${pImg}",time="${time}" where id="${id}"`;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err)
      res.send({ code: -1, msg: '修改失败' });
    } else {
      res.send({ code: 2, msg: '修改成功'});
    }
  });
});

// 查询所有订单的接口（所有用户的）
app.post('/allList', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  let pageSize = parseInt(req.body.pagesize)
  let page = parseInt(req.body.currentPage);
  let startPage = (page - 1) * pageSize
  let endPage = pageSize
  connection.connect();
  async.parallel([
    function (callback) {
      var sql = `SELECT * FROM orderList limit ${startPage},${pageSize}`;
      connection.query(sql, function (err, result) {
        if (err) {
          console.log(err)
          callback({ code: -1, msg: '查询数据库失败' })
        } else {
          callback(null, result)
        }
      })
    },
    function (callback) {
      var sql1 = 'SELECT COUNT(*) as count FROM orderList';
      connection.query(sql1,function (err,result) {
        if (err) {
          console.log(err)
          callback({ code: -1, msg: '查询数据库失败' });
        } else {
          callback(null, result[0].count)
        }
      })
    }
  ],function(err,result){
    if(err) {
      console.log(err)
      res.send({code:-1,msg:'数据库查询失败'})
    }else {
      if (Math.ceil(result[1] / page) < pageSize) {
        res.send({
          code: -1,
          message: '暂无更多数据'
        })
      } else {
        res.send({
          code: 2,
          data: result[0],
          count: result[1]
        })
      }
    }
  })
});

// 删除某个订单
app.post('/delo', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  let id = req.body.id
  connection.connect();
  var sql = `DELETE FROM orderList WHERE id="${id}"`;
  connection.query(sql, function (err, result) {
    console.log(err)
    if (err) {
      console.log(err)
      res.send({ code: -1, msg: '删除失败' });
    } else {
      res.send({ code: 2, msg: '删除成功' });
    }
  });
});

// 新增新闻
app.post('/addNews', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  connection.connect();
  let list = req.body.form
  let pImg = req.body.pImg
  let time = req.body.cancledate
  let title = list.title
  let content = list.content
  let recommend = req.body.recommend
  var sql = `insert into news (title,time,imgSrc,recommend,content) VALUES("${title}","${time}","${pImg}","${recommend}",'${content}')`;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err)
      res.send({ code: -1, msg: '插入失败' });
    } else {
      res.send({ code: 2, msg: '插入成功'});
    }
  });
});

// 查询新闻分页
app.post('/Newpaging', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  let pageSize = parseInt(req.body.pagesize)
  let page = parseInt(req.body.currentPage);
  let startPage = (page - 1) * pageSize
  let endPage = pageSize
  connection.connect();
  async.parallel([
    function (callback) {
      var sql = `SELECT * FROM news limit ${startPage},${pageSize}`;
      connection.query(sql, function (err, result) {
        if (err) {
          console.log(err)
          callback({ code: -1, msg: '查询数据库失败' })
        } else {
          callback(null, result)
        }
      })
    },
    function (callback) {
      var sql1 = 'SELECT COUNT(*) as count FROM news';
      connection.query(sql1,function (err,result) {
        if (err) {
          console.log(err)
          callback({ code: -1, msg: '查询数据库失败' });
        } else {
          callback(null, result[0].count)
        }
      })
    }
  ],function(err,result){
    if(err) {
      console.log(err)
      res.send({code:-1,msg:'数据库查询失败'})
    }else {
      if (Math.ceil(result[1] / page) < pageSize) {
        res.send({
          code: -1,
          message: '暂无更多数据'
        })
      } else {
        res.send({
          code: 2,
          data: result[0],
          count: result[1]
        })
      }
    }
  })
});

// 修改新闻
app.post('/upNew', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  connection.connect();
  let list = req.body.form
  let pImg = req.body.pImg
  let time = req.body.cancledate
  let recommend = req.body.recommend
  let title = list.title
  let content = list.content
  let id = req.body.id
  var sql = `update news set title="${title}",time="${time}",imgSrc="${pImg}",content='${content}',recommend="${recommend}" where id="${id}"`;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err)
      res.send({ code: -1, msg: '修改失败' });
    } else {
      res.send({ code: 2, msg: '修改成功'});
    }
  });
});

// 删除新闻
app.post('/delNew', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  let id = req.body.num
  connection.connect();
  var sql = `DELETE FROM news WHERE id="${id}"`;
  connection.query(sql, function (err, result) {
    console.log(err)
    if (err) {
      console.log(err)
      res.send({ code: -1, msg: '删除失败' });
    } else {
      res.send({ code: 2, msg: '删除成功' });
    }
  });
});

// 查询推荐的新闻标题
app.post('/reNew', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  let recommend = req.body.recommend
  connection.connect();
  var sql = `SELECT title,id FROM news where recommend='${recommend}'`;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err)
      res.send({ code: -1, msg: '查询失败' });
    } else {
      res.send({ code: 2, msg: '查询成功', data: result });
    }
  });
});

// 查询所有的新闻
app.post('/allnew', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  connection.connect();
  var sql = `SELECT * FROM news`;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err)
      res.send({ code: -1, msg: '查询失败' });
    } else {
      res.send({ code: 2, msg: '查询成功', data: result });
    }
  });
});

// 查询某条的新闻
app.post('/onenew', function (req, res) {
  var connection = mysql.createConnection({//连接数据库需要放在这里面来处理
    host: 'rm-bp157xr7h34ogq9g4no.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'ZT1245com',
    database: 'design'
  });
  let id = req.body.id
  connection.connect();
  var sql = `SELECT * FROM news where id="${id}"`;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err)
      res.send({ code: -1, msg: '查询失败' });
    } else {
      res.send({ code: 2, msg: '查询成功', data: result });
    }
  });
});

app.listen(3001, () => {
  console.log('success', function () {
    console.log('服务器启动成功,且地址是', 'http://localhost:3001')
  })
})
