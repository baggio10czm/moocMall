/*
* @Author: Rosen
* @Date:   2017-05-18 19:30:12
* @Last Modified by:   Rosen
* @Last Modified time: 2017-05-27 19:46:42
*/

'use strict';
require('./index.css');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');
// 侧边导航
var navSide = {
    option: {
        name: '',
        navList: [
            {name: 'user-center', desc: '个人中心', href: './user-center.html'},
            {name: 'order-list', desc: '我的订单', href: './order-list.html'},
            {name: 'pass-update', desc: '修改密码', href: './user-pass-update.html'},
            {name: 'about', desc: '关于MMall', href: './about.html'}
        ]
    },
    init: function (option) {
        // 合并选项
        $.extend(this.option, option);
        this.renderNav();
    },
    //渲染导航菜单
    renderNav: function () {
        //计算active数据
        for (let i = 0; i < this.option.navList.length; i++) {
            if (this.option.navList[i].name === this.option.name) {
                this.option.navList[i].isActive = true;
            }
        };
        //渲染LIST数据
        var navHTML = _mm.renderHtml(templateIndex,{
            navList:this.option.navList
        });
        $('.nav-side').html(navHTML);
    }
};

module.exports = navSide;