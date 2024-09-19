import React, { useEffect, useState } from "react";
import { Table, Button, Empty, Image, Space, Row, Col } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

interface FavoriteItem {
    id: string;
    name: string;
    src: string;
}

const Favorites: React.FC = () => {
    const [favoritesData, setFavoritesData] = useState<FavoriteItem[]>([]);

    // Fetch favorites from local storage on component mount
    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            setFavoritesData(JSON.parse(storedFavorites));
        }
    }, []);

    // Function to remove an item from favorites
    const deleteFavorite = (id: string) => {
        const updatedFavorites = favoritesData.filter((item) => item.id !== id);
        setFavoritesData(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };
    

    const columns = [
        {
            title: "Image",
            dataIndex: "src",
            key: "src",
            render: (src: string) => <Image src={src} alt="favorite" style={{ height: "100px", objectFit: "cover" }} />,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Action",
            key: "action",
            render: (_: any, record: FavoriteItem) => (
                <Space>
                    <Button type="text" icon={<DeleteOutlined />} onClick={() => deleteFavorite(record.id)}>
                        Remove
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: "20px" }}>
            <Row justify="center">
                <Col span={24} style={{ maxWidth: "90%" }}>
                    {favoritesData.length === 0 ? (
                        <Empty description="No favorites added yet." />
                    ) : (
                        <Table dataSource={favoritesData} columns={columns} rowKey="id" pagination={false} style={{ width: "100%" }} />
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default Favorites;
