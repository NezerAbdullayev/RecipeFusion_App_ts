import React from "react";
import Filter from "../../components/filters/MealFilter";
import Hero from "../../components/hero/Hero";
import ProductList from "../../components/products/ProductsList";
import { Layout } from "antd";
import Sidebar from "./Test"; // `Sidebar` komponentinin düzgün import edildiyindən əmin olun

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
                <Sidebar />
            </Sider>

        
            <Layout style={{ marginLeft: 250 }}>
                <Hero />
                <Filter />
                <ProductList />
            </Layout>
        </Layout>
    );
};

export default HomePage;
