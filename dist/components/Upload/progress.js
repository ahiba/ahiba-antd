import React from 'react';
var Progress = function (props) {
    var percent = props.percent, strokeHeight = props.strokeHeight, showText = props.showText, styles = props.styles, theme = props.theme;
    return (React.createElement("div", { className: "viking-progress-bar", style: styles },
        React.createElement("div", { style: { height: "" + strokeHeight }, className: "viking-progress-bar-outer" },
            React.createElement("div", { className: "viking-progress-bar-inner color-" + theme, style: { width: percent + "%" } }, showText && React.createElement("span", { className: "inner-text" }, percent + "%")))));
};
Progress.defaultProps = {
    strokeHeight: 15,
    showText: true,
    theme: "primary"
};
export default Progress;
