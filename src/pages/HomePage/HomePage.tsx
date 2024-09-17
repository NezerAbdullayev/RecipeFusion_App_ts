import React from "react";
import Filter from "../../components/filters/MealFilter";
import Hero from "../../components/hero/Hero";
import ProductList from "../../components/products/ProductsList";
import { Layout, Menu } from "antd";
import { MenuOutlined, FilterOutlined } from "@ant-design/icons";
import Category from "./Category";

const { Sider } = Layout;

const HomePage: React.FC = () => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            {/* sidebar */}
            <Sider
                width={250}
                style={{
                    background: "#fff",
                    overflow: "auto",
                    height: "100vh",
                    position: "fixed",
                    left: 0,
                }}
            >
                <Category />
            </Sider>

            {/* main*/}
            <Layout style={{ marginLeft: 250 }}>
                <Hero />
                <Filter />
                <ProductList />
            </Layout>
        </Layout>
    );
};

export default HomePage;
