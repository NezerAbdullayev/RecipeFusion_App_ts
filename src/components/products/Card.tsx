import { Card as CardEl } from "antd";
import Meta from "antd/es/card/Meta";
import { HeartOutlined, InfoCircleOutlined } from "@ant-design/icons";
import React, { memo } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

interface CardProps {
    id: string;
    name: string;
    src: string;
}

const Card: React.FC<CardProps> = ({ id, name, src }) => {
    const navigate = useNavigate();

    const handleAddToFavorites = () => {
        console.log("clicked");
        const storedFavorites = localStorage.getItem("favorites");
        const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

        const isFavorite = favorites.some((item: CardProps) => item?.id?.toString() === id?.toString());

        if (!isFavorite) {
            // Add new favorite item
            const newFavorite = { id, name, src };
            favorites.unshift(newFavorite);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            toast.success("Product successfully added to favorites!");
            console.log("true")
        } else {
            toast.error("Product already exists in favorites!");
        }
    };

    const handleOpenDetails = () => {
        navigate(`/details/${id}`);
    };

    return (
        <CardEl
            hoverable
            cover={<img alt={name} src={src} />}
            actions={[
                <HeartOutlined key="heart" onClick={handleAddToFavorites} />,
                <InfoCircleOutlined key="info" onClick={handleOpenDetails} />,
            ]}
        >
            <Meta title={name} />
        </CardEl>
    );
};

export default memo(Card);
