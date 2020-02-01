const router = require('koa-router')({
  prefix: '/lm'
})
const controllers = require('../controllers/index')

router.get('/index/index', controllers.home.index)

module.exports = router