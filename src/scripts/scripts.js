'use strict';

var __ = require('underscore');
var getDatabase = require('./modules/get-database');
var extractList = require('./modules/extract-list');
var filter = require('./modules/vue-method-filter');
var random = require('./modules/vue-method-random');

// グローバルフィルタ
Vue.filter('join', function(array){
  if(typeof array !== 'object') return array;
  return array.join(' & ');
});

var database = null;
var database_filtered = null;

var songsList = new Vue({
  el: '#list',
  data: {
    count: null,
    tags: null,
    idols: null,
    songs: null,
    provider: null,
    yaminabe: false
  },
  methods: {
    filter: function(key, value){
      var data = this.provider ? database_filtered : database;
      var songs = filter(data, key, value);
      this.songs = songs.list;
      this.count = songs.count;
    },
    random: function(n){
      this.songs = random(database, n);
      this.count = null;
    },
    reset: function(){
      this.songs = database;
      this.count = null;
      this.provider = null;
      this.yaminabe = false;
    }
  },
  watch: {
    provider: function(checked){
      if(checked){
        database_filtered = [];
        __.each(this.songs, function(item, i){
          if(item[checked]){
            database_filtered.push(item);
          }
        });
        this.songs = database_filtered;
        if(!this.yaminabe) this.count = database_filtered.length;
      }
    },
    yaminabe: function(checked){
      // this.songs = checked?random(database, 1):database;
      this.count = null;
    }
  }
});

getDatabase('./data/data.yml')
  .then(function(data_data){
    database = data_data;
    songsList.songs = data_data;
    songsList.tags = extractList(data_data, 'tags');

    getDatabase('./data/idols.yml')
      .then(function(data_idols){
        songsList.idols = __.union(
          extractList(data_idols, 'name'),
          extractList(data_data, 'idol')
        );
      })
      .catch(function(err){
        console.error('Fetch error: ', err);
      });
  })
  .catch(function(err){
    console.error('Fetch error: ', err);
  });
