'use strict'

var path = require('path')
var _ = require('lodash')
var fs = require('fs')

var all = {
  env: process.env.NODE_ENV,
  root: path.normalize(__dirname + '/../..'),
  port: process.env.PORT || 9000,
  //mongodb配置
  mongo: {
    options: {
      useMongoClient: true,
      // user: process.env.MONGO_USERNAME || '', 
      // pass: process.env.MONGO_PASSWORD || ''
    }
  },
  //redis 配置
  redis: {
    host: process.env.REDIS_PORT_6379_TCP_ADDR || '127.0.0.1',
    port: process.env.REDIS_PORT_6379_TCP_PORT || 6379,
    password: process.env.REDIS_PASSWORD || ''
  },
  //是否初始化数据
  seedDB: process.env.INITDATA || false,
  session:{
    secrets: 'mkn-secret',
  },
  //用户角色种类
  userRoles: ['user', 'admin'],
  
  //默认首页图片.
  defaultIndexImage: 'https://upload.jackhu.top/blog/index/default.jpg-600x1500q80',
  //第三方登录配置
  github:{
    clientID: process.env.GITHUB_CLIENT_ID || 'clientID',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || 'clientSecret',
    callbackURL: process.env.GITHUB_CALLBACK_URL || '',
  },
  weibo:{
    clientID: process.env.WEIBO_CLIENT_ID || 'clientID',
    clientSecret: process.env.WEIBO_CLIENT_SECRET || 'clientSecret',
    callbackURL: process.env.WEIBO_CALLBACK_URL || '',
  },
  qq:{
    clientID: process.env.QQ_CLIENT_ID || 'clientID',
    clientSecret: process.env.QQ_CLIENT_SECRET || 'clientSecret',
    callbackURL: process.env.QQ_CALLBACK_URL || '',
  },
  
  //开启第三方登录
  snsLogins:['github','qq']
}

var config = _.merge(all,require('./' + process.env.NODE_ENV + '.js') || {})
//加载私有配置
if (fs.existsSync(path.join(__dirname, 'private/index.js'))) {
  config = _.merge(config, require(path.join(__dirname, 'private/index.js')) || {})  
}
module.exports = config
