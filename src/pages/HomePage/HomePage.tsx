import React, { useState, useEffect } from "react";
import Hero from "../../components/hero/Hero";

// Meal tipini təyin etmək üçün Types.ts faylından import edin
interface Meal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

const HomePage: React.FC = () => {
    // Meal arrayi və error vəziyyəti üçün useState hook-larını təyin edin
    const [meals, setMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // fetchMeals funksiyasını təyin edin
    const fetchMeals = async () => {
        try {
            const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setMeals(data.meals || []);
        } catch (error) {
            setError("Failed to fetch meals");
            console.error("Failed to fetch meals:", error);
        } finally {
            setLoading(false);
        }
    };

    // useEffect daxilində fetchMeals funksiyasını çağırın
    useEffect(() => {
        fetchMeals();
    }, []);

    console.log(meals);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <Hero />
        </>
    );
};

export default HomePage;
