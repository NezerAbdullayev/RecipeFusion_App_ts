import ProductList from "../Pagination";
// import RenderGroup from "../filters/FilterSelect";
import Row from "../Row";

function Products() {    

    return (
        <Row className="m-10 grid grid-cols-4 gap-4">
            {/* <RenderGroup /> */}
            {/* {mealsData?.meals?.map((meal: Meal) => (
                <Row key={meal.idMeal} className="gap-3">
                    <img src={meal.strMealThumb} alt="" className="h-[300px] w-[300px]" />
                </Row>
            ))} */}
            <ProductList />
        </Row>
    );
}

export default Products;
