import Filter from "../../components/filters/Filter";
import Hero from "../../components/hero/Hero";
import ProductList from "../../components/products/ProductsList";

const HomePage: React.FC = () => {
    return (
        <>
            <Hero />

            <Filter />
            {/* <Products /> */}

            <ProductList />
        </>
    );
};

export default HomePage;
