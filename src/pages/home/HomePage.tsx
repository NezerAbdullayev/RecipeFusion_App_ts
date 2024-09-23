import React, { useState } from "react";
import Hero from "../../components/hero/Hero";
import { Layout, Typography } from "antd";
import MealList from "../../components/products/MealList";
import CocktailList from "../../components/products/CocktailList";
import Search from "../../components/search/Search";
import { CocktailProduct, MealProduct } from "../../types/globalTypes";
import Pagination from "../../components/pagination/Pagination";

const HomePage: React.FC = () => {
    const [SearchData, setSearchData] = useState<(MealProduct | CocktailProduct)[]>([]);

    const handleSearchData = (searchProduct: (MealProduct | CocktailProduct)[]) => {
        setSearchData(searchProduct);
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Hero />
            
            {/* products */}
            <div className="mt-10">
                {/* global search */}
                <div>
                    <Typography.Title level={3} style={{ textAlign: "center" }}>
                        Search Product
                    </Typography.Title>
                    <Search onSearchData={handleSearchData} />
                </div>

                {SearchData.length > 0 ? (
                    <Pagination data={SearchData} />
                ) : (
                    <>
                        <MealList />
                        <CocktailList />
                    </>
                )}
            </div>
        </Layout>
    );
};

export default HomePage;
