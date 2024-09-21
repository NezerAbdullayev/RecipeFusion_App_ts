import React, { useEffect, useState } from "react";
import Hero from "../../components/hero/Hero";
import { Layout } from "antd";
import MealList from "../../components/products/MealList";
import CocktailList from "../../components/products/CocktailList";
import Search from "../../components/search/Search";

const HomePage: React.FC = () => {
    const [SearchData, setSearchData] = useState<any>("");

    const handleSearchChange = (term: string) => {
        setSearchData(term);
    };

    useEffect(() => {
       
        if (setSearchData?.length > 0) {
            console.log("search et",SearchData);
        }
    }, [SearchData]);

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Hero />
            <div className="mt-10">
                {/* global search */}
                <Search onSearchChange={handleSearchChange} />

                {/* products */}
                <MealList />
                <CocktailList />
            </div>
        </Layout>
    );
};

export default HomePage;
