import React from 'react';
export interface TabItemProps {
    label: string | React.ReactElement;
    disabled?: boolean;
}
declare const TabItem: React.FC<TabItemProps>;
export default TabItem;
