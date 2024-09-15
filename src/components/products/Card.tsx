import { Card as CardEl } from "antd";
import Meta from "antd/es/card/Meta";
import { HeartOutlined } from "@ant-design/icons";
import React, { memo } from "react";

interface CardProps {
    id: string;
    name: string;
    src: string;
}

const Card: React.FC<CardProps> = ({ id, name, src }) => {

    const handleAddToFavorites=(event: React.MouseEvent<HTMLElement>)=>{
        event.stopPropagation()
        console.log(id)
    }

    const handleOpenDetails=()=>{
        console.log(`Product ${id} added to favorites`)
    }

    return (
        <CardEl
            hoverable
            cover={<img alt={name} src={src} />}
            actions={[
                <HeartOutlined key="heart"  onClick={handleAddToFavorites}/>, 
            ]}
            onClick={handleOpenDetails}
        >
            <Meta title={name} />
        </CardEl>
    );
};

export default memo(Card);
