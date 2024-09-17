import React, { useState } from "react";
import { MenuOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import type { GetProp, MenuProps } from "antd";

type MenuItem = GetProp<MenuProps, "items">[number];

const items: MenuItem[] = [
    {
        key: "Category",
        label: "Category",
        icon: <MenuOutlined />,
        children: [
            { key: "3", label: "Option 3" },
            { key: "4", label: "Option 4" },
        ],
    },
    {
        key: "sub2",
        label: "Navigation Three",
        icon: <SettingOutlined />,
        children: [
            { key: "7", label: "Option 7" },
            { key: "8", label: "Option 8" },
            { key: "9", label: "Option 9" },
            { key: "10", label: "Option 10" },
        ],
    },
];

const Category: React.FC = () => {
    // category
    return (
        <>
            <Menu
                style={{ width: 256, marginTop: 20 }}
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                items={items}
                mode="inline"
            />
        </>
    );
};

export default Category;
