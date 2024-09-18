import React from "react";
import Hero from "../../components/hero/Hero";
import ProductList from "../../components/products/ProductsList";
import { Layout } from "antd";


const HomePage: React.FC = () => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Hero />
            <ProductList />
        </Layout>
    );
};

export default HomePage;
