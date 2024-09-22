import 'react-toastify/dist/ReactToastify.css';
// import outlet
import { Outlet } from "react-router";

import Header from "./header/Header";
import Main from "../components/Main";
import Footer from "./footer/Footer";

import { Layout } from "antd";
import { ToastContainer } from "react-toastify";
function AppLayout() {
    return (
        <Layout style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
            <Header />

            <Main>
                <Outlet />
            </Main>

            <Footer />

            {/* toast library component */}
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                style={{ top: '100px' }}
            />
        </Layout>
    );
}

export default AppLayout;
