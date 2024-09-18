// import outlet
import { Outlet } from "react-router";

import Header from "./header/Header";
import Main from "../components/Main";
import Footer from "./footer/Footer";

import { Layout } from "antd";
function AppLayout() {
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
