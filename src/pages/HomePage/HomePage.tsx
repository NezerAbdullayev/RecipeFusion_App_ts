import React from "react";
import Hero from "../../components/hero/Hero";
import ProductList from "../../components/products/ProductsList";
import { Layout } from "antd";
import CategoryFilters from "../../components/filters/Filters";

const { Sider } = Layout;

const HomePage: React.FC = () => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
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
                <CategoryFilters />
            </Sider>

            <Layout style={{ marginLeft: 250 }}>
                <Hero />
                <ProductList />
            </Layout>
        </Layout>
    );
};

export default HomePage;
