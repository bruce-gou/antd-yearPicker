'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

require('./style.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Positions = null; //位置信息

var YearPicker = function (_React$Component) {
  _inherits(YearPicker, _React$Component);

  function YearPicker(props) {
    _classCallCheck(this, YearPicker);

    var _this = _possibleConstructorReturn(this, (YearPicker.__proto__ || Object.getPrototypeOf(YearPicker)).call(this, props));

    _this.offMonitor = function (e) {
      var className = e.target.className;
      if (className.indexOf('YearPicke') < 0) {
        _this.hide();
      }
    };

    _this.show = function (e) {
      var disabled = _this.state.disabled;

      if (disabled) {
        return;
      }
      Positions = e.currentTarget.getBoundingClientRect();
      var $dom = document.querySelector('.yearPicker');
      if (!$dom) {
        _this.initData();
      }
    };

    _this.hide = function () {
      var $dom = document.querySelector('.yearPicker');
      $dom && _reactDom2.default.unmountComponentAtNode($dom);
      $dom && document.body.removeChild($dom);
    };

    _this.initData = function () {
      var _this$state = _this.state,
          value = _this$state.value,
          defaultValue = _this$state.defaultValue,
          pageSize = _this$state.pageSize;

      var val = value ? value : defaultValue ? defaultValue : new Date().getFullYear();
      var year = val - 1970;
      var curr = year % pageSize;
      var start = val - curr;
      var end = val + pageSize - 1 - curr;
      var data = [];
      for (var i = start; i <= end; i++) {
        data.push(i);
      }
      _this.setState({
        data: data
      }, _this.fillHtml);
    };

    _this.fillHtml = function () {
      var _this$state2 = _this.state,
          value = _this$state2.value,
          defaultValue = _this$state2.defaultValue,
          data = _this$state2.data;

      var val = value ? value : defaultValue ? defaultValue : new Date().getFullYear();
      var $dom = document.querySelector('.yearPicker');
      var root = _react2.default.createElement(YearPicker_content, { data: data, value: val, prevPage: _this.prevPage, nextPage: _this.nextPage, selectYear: _this.selectYear });
      if (!$dom) {
        var div = document.createElement('div');
        div.className = 'yearPicker';
        div.style.top = Positions.top - 1 + 'px';
        div.style.left = Positions.left - 1 + 'px';
        document.body.appendChild(div);
        _reactDom2.default.render(root, div);
      } else {
        _reactDom2.default.render(root, $dom);
      }
    };

    _this.prevPage = function () {
      _this.getData('prev');
    };

    _this.nextPage = function () {
      _this.getData('next');
    };

    _this.getData = function (type) {
      var _this$state3 = _this.state,
          data = _this$state3.data,
          pageSize = _this$state3.pageSize;

      var start = data[0];
      var end = data[data.length - 1];
      if (type === 'prev' && start > 1970) {
        start -= pageSize;
        end -= pageSize;
      } else if (type === 'next') {
        start += pageSize;
        end += pageSize;
      }
      var arr = [];
      for (var i = start; i <= end; i++) {
        arr.push(i);
      }
      _this.setState({
        data: arr
      }, _this.fillHtml);
    };

    _this.selectYear = function (e) {
      var value = _this.state.value;

      var year = Number(e.target.getAttribute('data-year'));
      if (value !== year) {
        _this.setState({
          value: year
        });
        _this.props.onChange && _this.props.onChange(year);
        _this.hide();
      }
    };

    _this.state = {
      pageSize: 9,
      data: [],
      value: null,
      defaultValue: null,
      disabled: false
    };
    return _this;
  }

  _createClass(YearPicker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // defaultValue: 默认值 - number
      // value: 值 - number
      // disabled: 是否禁用 - boolean
      // Range: 取值范围 - array<number> -- 暂无
      var _props = this.props,
          defaultValue = _props.defaultValue,
          value = _props.value,
          disabled = _props.disabled,
          Range = _props.Range;

      var obj = {
        disabled: disabled === true ? true : false
      };
      if (value) {
        obj.value = value ? Number(value) : null;
      } else if (!value && defaultValue) {
        obj.defaultValue = defaultValue ? Number(defaultValue) : null;
      } else if (!value && !defaultValue) {
        obj.defaultValue = null;
        obj.value = null;
      }
      this.setState(_extends({}, obj));
      // 监听弹出面板，如果点击的不是该组件内部则关闭该组件
      document.body.addEventListener('click', this.offMonitor);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var value = props.value,
          disabled = props.disabled;

      if (value && value !== this.props.value) {
        this.setState({
          value: Number(value),
          defaultValue: null
        });
      }
      if (disabled !== this.props.disabled) {
        this.setState({
          disabled: disabled
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // 注销组件
      this.hide();
      document.body.removeEventListener('click', this.offMonitor);
    }
    // 组件关闭监听方法

    // 显示

    // 隐藏

    // 初始化数据

    // 填充页面

    // 上一页

    // 下一页

    // 获取数据

    // 选择年份

  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          disabled = _state.disabled,
          value = _state.value,
          defaultValue = _state.defaultValue;

      var val = value ? value : defaultValue ? defaultValue : '';
      return _react2.default.createElement(
        'div',
        { className: 'yearPicker-input' },
        _react2.default.createElement(
          'div',
          { className: 'ant-calendar-picker' },
          _react2.default.createElement(
            'div',
            { onClick: this.show, className: disabled ? "disabled" : "" },
            _react2.default.createElement('input', { placeholder: '\u8BF7\u9009\u62E9\u5E74\u4EFD', readOnly: true,
              className: 'ant-input ant-calendar-picker-input',
              value: val
            }),
            _react2.default.createElement('span', { className: 'ant-calendar-picker-icon' })
          )
        )
      );
    }
  }]);

  return YearPicker;
}(_react2.default.Component);

exports.default = YearPicker;


var YearPicker_content = function YearPicker_content(props) {
  var data = props.data,
      value = props.value,
      prevPage = props.prevPage,
      nextPage = props.nextPage,
      selectYear = props.selectYear;

  return _react2.default.createElement(
    'div',
    { className: 'YearPicker-content' },
    _react2.default.createElement(
      'div',
      { className: 'YearPicker-head' },
      _react2.default.createElement('span', { className: 'YearPicke-head-btn left-btn', onClick: prevPage }),
      _react2.default.createElement(
        'span',
        { className: 'YearPicke-head-title' },
        value
      ),
      _react2.default.createElement('span', { className: 'YearPicke-head-btn right-btn', onClick: nextPage })
    ),
    _react2.default.createElement(
      'div',
      { className: 'YearPicker-content' },
      data.map(function (item, index) {
        return _react2.default.createElement(
          'div',
          { key: index, className: value == item ? "YearPicke-content-li active" : "YearPicke-content-li" },
          _react2.default.createElement(
            'span',
            { 'data-year': item, onClick: selectYear, className: 'YearPicke-content-btn' },
            item
          )
        );
      })
    )
  );
};