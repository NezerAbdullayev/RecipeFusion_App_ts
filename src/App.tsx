import { Navigate, createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/homePage/HomePage";
import ErrorPage from "./pages/errorPage/ErrorPage";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <AppLayout />,
            errorElement: <ErrorPage />,
            children: [
                { path: "/", element: <Navigate to="/home" replace /> },
                { path: "home", element: <HomePage /> },
                { path: '*', element: <ErrorPage /> },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
