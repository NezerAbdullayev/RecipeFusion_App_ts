// import outlet
import { Outlet } from "react-router";

import Header from "./header/Header";
import Main from "../components/Main";
import Footer from "./footer/Footer";

import { Layout } from "antd";
import { useGetAllMealCategoryQuery, useLazyGetMealCategorysQuery } from "../redux/services/mealApi";


function AppLayout() {
    const { data, error, isLoading } = useGetAllMealCategoryQuery();
    // const[trigger,{data:mealData,error:err,isLoading:load}]=useLazyGetMealCategorysQuery()

    if (error && isLoading) return "hello world";

    if (data) console.log(data);


    return (
        <Layout style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
            <Header />

            <Main>
                <Outlet />
            </Main>

            <Footer />
        </Layout>
    );
}

export default AppLayout;
