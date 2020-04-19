import React from 'react';
declare type typeMdoe = 'success' | 'default' | 'danger' | 'warning';
declare type closeCallBack = () => void;
interface AlertProps {
    title: String;
    description?: String;
    type?: typeMdoe;
    onClose?: closeCallBack;
    closeable?: boolean;
}
declare const Alert: React.FC<AlertProps>;
export default Alert;
