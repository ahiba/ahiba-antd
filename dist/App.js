var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState } from 'react';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon';
import Transition from './components/Transition/transition';
import Alert from './components/Alert/alert';
import Tabs from './components/Tabs/tabs';
import TabItem from './components/Tabs/tabItem';
import Input from './components/Input/input';
import AutoComplete from './components/AutoComplete/autoComplete';
import Upload from './components/Upload/upload';
import './styles/index.scss';
library.add(fas);
function App() {
    var _a = useState(false), show = _a[0], setShow = _a[1];
    var _b = useState(true), alertShow = _b[0], setAlertShow = _b[1];
    var lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins',
        'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando'];
    var lakersWithNumber = [
        { value: 'bradley', number: 23 },
        { value: 'pope', number: 33 },
        { value: 'caruso', number: 43 },
        { value: 'cook', number: 53 },
        { value: 'cousins', number: 63 },
        { value: 'james', number: 73 },
    ];
    // const handelFetch = (query: string) => {
    //   return lakers.filter(name => name.includes(query))
    // }
    // const handelFetch = (query:string) => {
    //   return lakersWithNumber.filter(player => player.value.includes(query))
    // }
    var handelFetch = function (query) {
        return fetch("https://api.github.com/search/users?q=" + query)
            .then(function (res) { return res.json(); })
            .then(function (_a) {
            var items = _a.items;
            console.log(items);
            var formatItems = items.slice(0, 10).map(function (item) { return (__assign({ value: item.login }, item)); });
            return formatItems;
        });
    };
    var renderOption = function (item) {
        return (React.createElement(React.Fragment, null,
            React.createElement("h2", null,
                "Name:",
                item.value),
            React.createElement("p", null,
                "Number:",
                item.number)));
    };
    // const renderOption = (item:string) =>{
    //   return (
    //     <h2>Name:{item}</h2>
    //   )
    // }
    return (React.createElement("div", { className: "App" },
        React.createElement(Upload, { action: "http://baidu.com", name: "file", data: { "key": "value" }, multiple: true, drag: true },
            React.createElement(Button, { btnType: ButtonType.Primary, size: ButtonSize.Large, className: "klass" }, "hello")),
        React.createElement(Button, { size: ButtonSize.Large, onClick: function () { setShow(!show); } }, "Toggle"),
        React.createElement(Transition, { in: show, timeout: 300, animation: "zoom-in-left" },
            React.createElement("div", null,
                React.createElement("p", null,
                    "edit ",
                    React.createElement("code", null, "src/App.tsx"),
                    " and save to reload"),
                React.createElement("p", null,
                    "edit ",
                    React.createElement("code", null, "src/App.tsx"),
                    " and save to reload"),
                React.createElement("p", null,
                    "edit ",
                    React.createElement("code", null, "src/App.tsx"),
                    " and save to reload"),
                React.createElement("p", null,
                    "edit ",
                    React.createElement("code", null, "src/App.tsx"),
                    " and save to reload"),
                React.createElement("p", null,
                    "edit ",
                    React.createElement("code", null, "src/App.tsx"),
                    " and save to reload"))),
        React.createElement(Icon, { icon: "coffee", theme: "danger", size: "10x" }),
        React.createElement(Menu, { defaultIndex: '0', onSelect: function (index) { alert(index); }, defaultOpenSubMenus: ['2'] },
            React.createElement(MenuItem, null, "cool link"),
            React.createElement(MenuItem, { disabled: true }, "cool link 2"),
            React.createElement(SubMenu, { title: "dropdown" },
                React.createElement(MenuItem, null, "dropdown 1"),
                React.createElement(MenuItem, null, "dropdown 2")),
            React.createElement(MenuItem, null, "cool link 3")),
        React.createElement(Button, { onClick: function (e) {
                console.log(134);
            } }, "hello"),
        React.createElement(Button, { btnType: ButtonType.Primary, size: ButtonSize.Large, className: "klass" }, "hello"),
        React.createElement(Button, { btnType: ButtonType.Link, href: "http://www.baidu.com" }, "hello"),
        React.createElement("div", { style: {
                padding: '20px 40px',
                width: '500px'
            } },
            React.createElement("h3", { onClick: function () {
                    console.log('点击了改变alert closeable', alertShow);
                    setAlertShow(!alertShow);
                } },
                "\u7EC4\u4EF6\u6F14\u793A + ",
                JSON.stringify(alertShow)),
            React.createElement(Alert, { closeable: alertShow, description: "this is a long description", onClose: function noRefCheck() {
                    console.log('执行了关闭');
                }, title: "\u63D0\u793A\u6807\u9898\u6B27\u4EB2", type: "default" })),
        React.createElement("div", { style: {
                padding: '20px 40px',
                width: '500px'
            } },
            React.createElement("h3", null, "\u7EC4\u4EF6\u6F14\u793A"),
            React.createElement(Tabs, { defaultIndex: 0, onSelect: function noRefCheck() { }, type: "card" },
                React.createElement(TabItem, { label: React.createElement(React.Fragment, null,
                        React.createElement(Icon, { icon: "exclamation-circle" }),
                        '  ',
                        "\u81EA\u5B9A\u4E49\u56FE\u6807") }, "this is card one"),
                React.createElement(TabItem, { label: "tab2" }, "this is content two"),
                React.createElement("li", null, "123"))),
        React.createElement(Input, { size: 'lg', disabled: true, placeholder: "lg" }),
        React.createElement(Input, { size: 'sm', disabled: true, placeholder: "sm" }),
        React.createElement(Input, { icon: "address-book", prepend: "http://" }),
        React.createElement(AutoComplete, { fetchSuggestions: handelFetch, renderOption: renderOption })));
}
export default App;
