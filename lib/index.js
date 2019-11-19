'use strict';

var cov_2npohbf88j = function () {
  var path = '/Users/supper/Downloads/antd-yearPicker/src/index.js',
      hash = '3bffec32f3f9b7c2be5d860605cab281d938376d',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/supper/Downloads/antd-yearPicker/src/index.js',
    statementMap: {
      '0': {
        start: {
          line: 3,
          column: 19
        },
        end: {
          line: 3,
          column: 46
        }
      },
      '1': {
        start: {
          line: 5,
          column: 0
        },
        end: {
          line: 5,
          column: 28
        }
      }
    },
    fnMap: {},
    branchMap: {},
    s: {
      '0': 0,
      '1': 0
    },
    f: {},
    b: {},
    _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();

var YearPicker = (cov_2npohbf88j.s[0]++, require('./YearPicker.jsx')); //普通数组转换成树型结构数组

cov_2npohbf88j.s[1]++;
module.exports = YearPicker;