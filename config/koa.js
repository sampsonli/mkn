'use strict'

const path = require('path')
// const session = require('koa-generic-session')
const session = require('koa-session-store')
// const RedisStore = require('koa-redis')
const mongooseStore = require('koa-session-mongoose');
const responseTime = require('koa-response-time')
const logger = require('koa-logger')
const json = require('koa-json')
const compress = require('koa-compress')
const bodyParser = require('koa-bodyparser')
const cors = require('kcors')
const passport = require('koa-passport')
const config = require('./env')

module.exports = function(app) {
  if(app.env === 'development'){
    app.use(responseTime())
    app.use(logger())
  }
  app.use(cors({
    credentials: true
  }))
  app.use(bodyParser())
  app.use(json())
  app.keys = [config.session.secrets]
  /*app.use(session({
    key: 'mkn.sid',
    store: RedisStore({
      host:config.redis.host,
      port:config.redis.port,
      auth_pass:config.redis.password || ''
    }),
    cookie: config.session.cookie
  }))*/
  app.use(session({
      store: mongooseStore.create({
          expires: 1000*5
      })
  }))
  app.use(passport.initialize())
  app.use(compress())
}
