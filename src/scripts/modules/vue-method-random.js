'use strict';

var __ = require('underscore');
var database_shuffle = [];

/**
 * 渡された配列からランダムにnつ取り出して返す
 * @method
 * @param  {Array} database 配列
 * @param  {Int} n 取り出す要素数
 * @return {Array}
 */
module.exports = function(database, n){
  // データがなければ返す
  if(!database) return;
  // n=0ならすべてのデータをシャッフルして返す
  if(n === 0) return __.shuffle(database);

  // シャッフル用データベースが足りなければ装填
  if(database_shuffle.length < n){
    database_shuffle = database_shuffle.concat(__.shuffle(database));
  }
  // シャッフル用データベースのn個目を取得してセット
  var list = database_shuffle.slice(0, n);
  // とったぶん削除
  database_shuffle = database_shuffle.slice(n+1);

  return list;
};
