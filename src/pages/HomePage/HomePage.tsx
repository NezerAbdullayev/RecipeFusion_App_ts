import Filter from "../../components/filters/Filter";
import Hero from "../../components/hero/Hero";
import ProductList from "../../components/Pagination";
import { useGetCoctailProductsQuery } from "../../redux/services/cocktailApi";
import { useGetMealCategoryListQuery, useGetProductsQuery } from "../../redux/services/mealApi";




const HomePage: React.FC = () => {

    const {data,error,isloading}=useGetProductsQuery()
    const {data:coctail}=useGetCoctailProductsQuery()


    if(error ||isloading)  console.log("p",isloading)


    if(data) console.log(data)

        if(coctail) console.log("2",coctail)


    console.log(data)
    return (
        <>
            <Hero />
            {/* <Products /> */}
            <ProductList />
            <Filter />
        </>
    );
};

export default HomePage;
