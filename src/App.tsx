import { Navigate, createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/homePage/HomePage";
import ErrorPage from "./pages/errorPage/ErrorPage";
import DetailsPage from "./pages/detailsPage/DetailsPage";
import Favorites from "./pages/favoritesPage/Favorites";
import RandomProductPage from "./pages/randomProductPage/RandomProductPage";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <AppLayout />,
            errorElement: <ErrorPage />,
            children: [
                { path: "/", element: <Navigate to="/home" replace /> },
                { path: "home", element: <HomePage /> },
                { path: "favorites", element: <Favorites /> },
                { path: "details/:id", element: <DetailsPage /> },
                { path: "random", element: <RandomProductPage /> },
                { path: "*", element: <ErrorPage /> },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
