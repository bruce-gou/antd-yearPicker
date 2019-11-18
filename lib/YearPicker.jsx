import React from 'react';
import ReactDOM from 'react-dom';
import './style.less';

let Positions = null; //位置信息
class YearPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 9,
      data: [],
      value: null,
      defaultValue: null,
      disabled: false
    };
  }
  componentDidMount() {
    // defaultValue: 默认值 - number
    // value: 值 - number
    // disabled: 是否禁用 - boolean
    // Range: 取值范围 - array<number> -- 暂无
    const { defaultValue, value, disabled, Range } = this.props;
    let obj = {
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
    this.setState({
      ...obj
    })
    // 监听弹出面板，如果点击的不是该组件内部则关闭该组件
    document.body.addEventListener('click', this.offMonitor)
  }
  componentWillReceiveProps(props) {
    const { value, disabled } = props;
    if (value && value !== this.props.value) {
      this.setState({
        value: Number(value),
        defaultValue: null
      })
    }
    if (disabled !== this.props.disabled) {
      this.setState({
        disabled
      })
    }
  }
  componentWillUnmount() {
    // 注销组件
    this.hide();
    document.body.removeEventListener('click', this.offMonitor)
  }
  // 组件关闭监听方法
  offMonitor = (e) => {
    let className = e.target.className;
    if (className.indexOf('YearPicke') < 0) {
      this.hide();
    }
  }
  // 显示
  show = (e) => {
    const { disabled } = this.state;
    if (disabled) {
      return;
    }
    Positions = e.currentTarget.getBoundingClientRect();
    const $dom = document.querySelector('.yearPicker');
    if (!$dom) {
      this.initData()
    }
  }
  // 隐藏
  hide = () => {
    const $dom = document.querySelector('.yearPicker');
    $dom && ReactDOM.unmountComponentAtNode($dom);
    $dom && document.body.removeChild($dom);
  }
  // 初始化数据
  initData = () => {
    const { value, defaultValue, pageSize } = this.state;
    let val = value ? value : defaultValue ? defaultValue : new Date().getFullYear();
    let year = val - 1970;
    let curr = year % pageSize;
    let start = val - curr;
    let end = val + pageSize - 1 - curr;
    let data = [];
    for (let i = start; i <= end; i++) {
      data.push(i);
    }
    this.setState({
      data,
    }, this.fillHtml)
  }
  // 填充页面
  fillHtml = () => {
    const { value, defaultValue, data } = this.state;
    let val = value ? value : defaultValue ? defaultValue : new Date().getFullYear();
    const $dom = document.querySelector('.yearPicker');
    let root = React.createElement(YearPicker_content,
      { data, value: val, prevPage: this.prevPage, nextPage: this.nextPage, selectYear: this.selectYear }
    );
    if (!$dom) {
      let div = document.createElement('div');
      div.className = 'yearPicker';
      div.style.top = `${Positions.top - 1}px`;
      div.style.left = `${Positions.left - 1}px`;
      document.body.appendChild(div);
      ReactDOM.render(root, div);
    } else {
      ReactDOM.render(root, $dom);
    }
  }
  // 上一页
  prevPage = () => {
    this.getData('prev');
  }
  // 下一页
  nextPage = () => {
    this.getData('next');
  }
  // 获取数据
  getData = (type) => {
    const { data, pageSize } = this.state;
    let start = data[0];
    let end = data[data.length - 1];
    if (type === 'prev' && start > 1970) {
      start -= pageSize;
      end -= pageSize;
    } else if (type === 'next') {
      start += pageSize;
      end += pageSize;
    }
    let arr = [];
    for (let i = start; i <= end; i++) {
      arr.push(i);
    }
    this.setState({
      data: arr
    }, this.fillHtml)
  }
  // 选择年份
  selectYear = (e) => {
    const { value } = this.state;
    let year = Number(e.target.getAttribute('data-year'));
    if (value !== year) {
      this.setState({
        value: year
      });
      this.props.onChange && this.props.onChange(year);
      this.hide();
    }
  }
  render() {
    const { disabled, value, defaultValue } = this.state;
    let val = value ? value : defaultValue ? defaultValue : '';
    return (
      <div className="yearPicker-input">
        <div className="ant-calendar-picker">
          <div onClick={this.show} className={disabled ? "disabled" : ""}>
            <input placeholder="请选择年份" readOnly
              className="ant-input ant-calendar-picker-input"
              value={val}
            />
            <span className="ant-calendar-picker-icon" ></span>
          </div>
        </div>
      </div>
    )
  }
}
export default YearPicker;


const YearPicker_content = (props) => {
  const { data, value, prevPage, nextPage, selectYear } = props;
  return (
    <div className="YearPicker-content">
      <div className="YearPicker-head">
        <span className="YearPicke-head-btn left-btn" onClick={prevPage}></span>
        <span className="YearPicke-head-title">{value}</span>
        <span className="YearPicke-head-btn right-btn" onClick={nextPage}></span>
      </div>
      <div className="YearPicker-content">
        {
          data.map((item, index) =>
            <div key={index} className={value == item ? "YearPicke-content-li active" : "YearPicke-content-li"}>
              <span data-year={item} onClick={selectYear} className="YearPicke-content-btn">{item}</span>
            </div>
          )
        }
      </div>
    </div>
  )
}