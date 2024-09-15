import Filter from "../../components/filters/MealFilter";
import Hero from "../../components/hero/Hero";
import ProductList from "../../components/products/ProductsList";

const HomePage: React.FC = () => {
    return (
        <>
            <Hero />

            <Filter />

            <ProductList />
        </>
    );
};

export default HomePage;
