require('./index.css');
require('page/common/nav-simple/index.js');
let _mm = require('util/mm.js');

$(function () {
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.'+ type + '-success');
    if(type === 'payment'){
        var $orderNumber = $element.find('.order-number');
        $orderNumber.attr('href',$orderNumber.attr('href')+ _mm.getUrlParam('orderNumber'))
    }
    $element.show();
})