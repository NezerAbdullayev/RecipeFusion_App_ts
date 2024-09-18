import { Card as CardEl } from "antd";
import Meta from "antd/es/card/Meta";
import { HeartOutlined } from "@ant-design/icons";
import React, { memo } from "react";
import { useNavigate } from "react-router";

interface CardProps {
    id: string;
    name: string;
    src: string;
}

const Card: React.FC<CardProps> = ({ id, name, src }) => {
    const navigate = useNavigate();

    const handleAddToFavorites=()=>{
        const storedFavorites = localStorage.getItem("favorites");
        const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

        if (!favorites.includes(id)) {
            favorites.push(id);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            console.log("Added to favorites:", id);
        } else {
            console.log("Already in favorites:", id);
        }
        console.log(favorites)

    }

    const handleOpenDetails=()=>{
        navigate(`/details/${id}`)
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
