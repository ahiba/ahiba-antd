import React from 'react';
export interface TabsProps {
    defaultIndex?: number;
    className?: string;
    onSelect?: (selectIndex: number) => void;
    type?: 'line' | 'card';
}
declare const Tabs: React.FC<TabsProps>;
export default Tabs;
