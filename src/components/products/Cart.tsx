import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { HeartOutlined, SaveOutlined } from "@ant-design/icons";
import React, { memo } from "react";

interface CartProps {
    id: string;
    name: string;
    src: string;
}

const Cart: React.FC<CartProps> = ({ id, name, src }) => {

    return (
        <Card
            hoverable
            cover={<img alt={name} src={src} />}
            actions={[
                <HeartOutlined key="heart" />, 
                <SaveOutlined key="save" />, 
            ]}
        >
            <Meta title={name} />
        </Card>
    );
};

export default memo(Cart);
