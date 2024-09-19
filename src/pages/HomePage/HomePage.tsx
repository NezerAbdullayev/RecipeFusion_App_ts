import React from "react";
import Hero from "../../components/hero/Hero";
import { Layout } from "antd";
import MealList from "../../components/products/MealList";
import CocktailList from "../../components/products/CocktailList";

const HomePage: React.FC = () => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Hero />
            <div className="mt-10">
                <MealList />
                <CocktailList />
            </div>
        </Layout>
    );
};

export default HomePage;
