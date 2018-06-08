'use strict';

var yaml = require('js-yaml');

/**
 * テキストファイルから連想配列を取り出す
 * @method
 * @param  {String} path ファイルパス
 * @return {Object}
 */
module.exports = function(path){
  return fetch(path)
    .then(function(res){
      if(res.status !== 200){
        console.error('Error! Status Code:', res.status);
        return;
      }
      return res.text();
    })
    .then(function(data){
      return yaml.load(data);
    });
};
