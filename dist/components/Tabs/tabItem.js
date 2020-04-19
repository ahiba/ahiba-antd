import React from 'react';
var TabItem = function (props) {
    var children = props.children;
    return (React.createElement("div", { className: "viking-tab-panel" }, children));
};
TabItem.displayName = 'TabItem';
export default TabItem;
