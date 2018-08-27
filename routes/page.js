var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var page = require('../models/page.js');

// 获取页面列表
router.get('/', function(req, res, next) {
  page.find(function(err, pages){
    if(err) return next(err)
    res.json(pages)
  })
});

// 保存页面
router.post('/', function(req, res, next) {
  page.create(req.body, function(err, page) {
    if(err) return next(err)
    res.json(page)
  })
})

// 删除页面
router.delete('/:id', function(req, res, next) {
  let condition = { _id: req.params.id };
  console.log('condition', condition)
  page.findOneAndDelete(condition, function(err, page) {
    if(err) return next(err)
    res.json(page)
  })
})

module.exports = router;