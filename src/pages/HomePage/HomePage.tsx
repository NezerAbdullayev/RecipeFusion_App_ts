import React, { useEffect, useState } from "react";
import Hero from "../../components/hero/Hero";
import { Layout } from "antd";
import MealList from "../../components/products/MealList";
import CocktailList from "../../components/products/CocktailList";
import Search from "../../components/search/Search";
import { CocktailProduct, MealProduct } from "../../types/mealTypes";
import Pagination from "../../components/pagination/Pagination";

const HomePage: React.FC = () => {
    const [SearchData, setSearchData] = useState<(MealProduct | CocktailProduct)[]>([]);

    const handleSearchData = (searchProduct: (MealProduct | CocktailProduct)[]) => {
        setSearchData(searchProduct);
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Hero />
            <div className="mt-10">
                {/* global search */}
                <Search onSearchData={handleSearchData} />

                {/* products */}
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
