import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useGetProductsQuery } from "../redux/services/mealApi";

const ProductsList = () => {
    const { data, isLoading, isError } = useGetProductsQuery();
    const [page, setPage] = useState(1);

    // Bütün məlumatları səhifələmək üçün
    const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error occurred.</p>;

    // Məlumatları səhifələmək
    const startIndex = (page - 1) * 10;
    const paginatedProducts = data?.meals?.slice(startIndex, startIndex + 10) || [];

    return (
        <div>
            {/* Məhsulları buradan göstərin */}
            <div className="flex flex-wrap">
                {paginatedProducts.map((meal) => (
                    <div key={meal.idMeal}>
                        <h3>{meal.strMeal}</h3>
                        <img
                            src={meal.strMealThumb}
                            alt={meal.strMeal}
                            className="h-[200px] w-[200px]"
                        />
                    </div>
                ))}
            </div>

            <Stack spacing={2}>
                <Pagination
                    count={Math.ceil((data?.meals?.length || 0) / 10)}
                    page={page}
                    onChange={handlePageChange}
                />
            </Stack>
        </div>
    );
};

export default ProductsList;
