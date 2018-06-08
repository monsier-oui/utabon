'use strict';

var __ = require('underscore');

/**
 * 渡された配列をフィルタリングして返す
 * @method
 * @param  {Array} database データ
 * @param  {String} key      キー
 * @param  {String} value    値
 * @return {Array}
 */
module.exports = function(database, key, value){
  // 渡された配列がなければそのまま返す
  if(!database) return;

  var songs = [];
  __.each(database, function(item){
    // キーに対応する値がなければスルー
    if(!item[key]) return;

    // 対応する値が指定された値と同一であれば配列に追加
    if(
      (typeof item === 'string' && item[key] === value) ||
      (typeof item === 'object' && item[key].indexOf(value) > -1)
    ){
      // console.log(item);
      songs = songs.concat(item);
    }
  });

  return {list: songs, count: songs.length};
};
