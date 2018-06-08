'use strict';

var __ = require('underscore');

/**
 * 連想配列からキーを指定して配列を抽出する
 * @method extractList
 * @param  {Object}    collection 抽出元の連想配列
 * @param  {String}    key        抽出したいキー
 * @return {Array}
 */
module.exports = function(collection, key){
  return __.chain(collection)
    // キーで抽出
    .map(function(item){
      return item[key];
    })
    // nullなどを取り除く
    .compact()
    // 子の配列を親階層にならす
    .flatten()
    // 重複を取り除く
    .uniq()
    .value();
}
