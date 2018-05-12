require('../module.js')
require('./index.css')

let _mm = require('util/mm.js');
//_mm.request({
//    url:'/product/list.do?keyword=1',
//    success:function (res) {
//        console.log(res);
//    },
//    error:function (error) {
//        console.log(error);
//    }
//})
console.log(_mm.getUrlParam('name'));

var html = '<div>{{data}}</div>';
var data = {
    data:6662
}
console.log(_mm.renderHtml(html,data));