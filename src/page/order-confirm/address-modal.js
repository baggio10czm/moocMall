'use strict';
var _mm = require('util/mm.js');
var _cities = require('util/cities/index');
var _address = require('service/address-service.js');
var templateAddressModal = require('./address-modal.string');

var addressModal = {
    show: function (option) {
        // option 绑定
        this.option = option;
        this.option.data = option.data || {};
        this.$modalWrap = $('.modal-wrap');
        // 渲染页面
        this.loadModal();
        //绑定事件
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        //省市二级联动
        this.$modalWrap.find('#receiver-province').change(function () {
            var selectedProvince = $(this).val();
            _this.loadCities(selectedProvince);
        });
        //提交收货地址
        this.$modalWrap.find('.address-btn').click(function () {
            var receiverInfo = _this.getReceiverInfo(),
                isUpdate = _this.option.isUpdate;
            //使用新地址，并验证通过
            if (!isUpdate && receiverInfo.status) {
                _address.save(receiverInfo.data, function (res) {
                    _mm.successTips('地址添加成功！');
                    _this.hide();
                    typeof _this.option.onSuccess() === 'function' && _this.option.onSuccess(res);
                }, function (errMsg) {
                    _mm.errorTips(errMsg);
                })
            }
            //更新地址，并验证通过
            else if (isUpdate && receiverInfo.status) {
                _address.update(receiverInfo.data, function (res) {
                    _mm.successTips('地址修改成功！');
                    _this.hide();
                    typeof _this.option.onSuccess() === 'function' && _this.option.onSuccess(res);
                }, function (errMsg) {
                    _mm.errorTips(errMsg);
                })
            }
            //验证不通过
            else {
                _mm.errorTips(receiverInfo.errMsg || '验证不通过')
            }
        });
        //阻止点击冒泡 触发关闭
        this.$modalWrap.find('.modal-container').click(function (e) {
            e.stopPropagation();
        });
        //点x或者蒙版区域 关闭
        this.$modalWrap.find('.close').click(function () {
            _this.hide();
        })
    },
    loadModal: function () {
        var addressModalHtml = _mm.renderHtml(templateAddressModal, {
            isUpdate : this.option.isUpdate,
            data     : this.option.data
        });
        this.$modalWrap.html(addressModalHtml);
        //加载省份
        this.loadProvince();
    },
    //加载省份
    loadProvince: function () {
        var provinces = _cities.getProvinces() || [],
            $provincesSelect = this.$modalWrap.find('#receiver-province');
        $provincesSelect.html(this.getSelectOption(provinces));
        //如果是更新地址，并有更新信息，做省份回填，再加载城市信息
        if(this.option.isUpdate && this.option.data.receiverProvince){
            $provincesSelect.val(this.option.data.receiverProvince);
            //加载城市
            this.loadCities(this.option.data.receiverProvince);
        }
    },
    //加载城市
    loadCities: function (provinceName) {
        var cities = _cities.getCities(provinceName) || [],
            $cities = this.$modalWrap.find('#receiver-city');
        $cities.html(this.getSelectOption(cities));
        //如果是更新地址，并有更新信息，做省份城市
        if(this.option.isUpdate && this.option.data.receiverCity){
            $cities.val(this.option.data.receiverCity);
        }
    },
    //获取表单收件人信息，并验证
    getReceiverInfo: function () {
        var receiverInfo = {},
            result = {
                status: false
            };
        receiverInfo.receiverName = $.trim(this.$modalWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince = this.$modalWrap.find('#receiver-province').val();
        receiverInfo.receiverCity = this.$modalWrap.find('#receiver-city').val();
        receiverInfo.receiverPhone = $.trim(this.$modalWrap.find('#receiver-phone').val());
        receiverInfo.receiverAddress = $.trim(this.$modalWrap.find('#receiver-address').val());
        receiverInfo.receiverZip = $.trim(this.$modalWrap.find('#receiver-zip').val());
        if(this.option.isUpdate){
            receiverInfo.id = this.$modalWrap.find('#receiver-id');
        }
        //表单验证
        if (!receiverInfo.receiverName) {
            result.errMsg = '请输入收件姓名';
        } else if (!receiverInfo.receiverProvince) {
            result.errMsg = '请输入省份';
        } else if (!receiverInfo.receiverCity) {
            result.errMsg = '请输入城市';
        } else if (!receiverInfo.receiverPhone) {
            result.errMsg = '请输入手机';
        } else if (!receiverInfo.receiverAddress) {
            result.errMsg = '请输入详细地址';
        } else {
            result.status = true;
            result.data = receiverInfo;
        }
        return result;
    },
    // 生成select  option
    getSelectOption: function (optionArray) {
        var html = '<option value="">请选择</option>';
        for (let i = 0, length = optionArray.length; i < length; i++) {
            html += '<option value="' + optionArray[i] + '">' + optionArray[i] + '</option>';
        }
        return html;
    },
    //关闭弹窗
    hide: function () {
        this.$modalWrap.empty();
    }
};

module.exports = addressModal;