import React, { useState } from "react";
import { Col } from "antd";
import { useGetAllMealCategoryQuery } from "../../redux/services/mealApi";

const Category: React.FC = () => {
    // Category
    const {
        data: mealCategory,
        error: mealError,
        isLoading: mealIsLoading,
    } = useGetAllMealCategoryQuery();

    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    if (mealIsLoading) return <div>Loading...</div>;
    if (mealError) return <div>Error loading categories</div>;

    // const items: MenuItem[] = [
    //     {
    //         key: "mealCategory",
    //         label: "Category",
    //         icon: <MenuOutlined />,
    //         children:
    //             mealCategory?.categories.map((item) => ({
    //                 key: item.idCategory.toString(),
    //                 label: (
    //                     <Checkbox
    //                         value={item.idCategory.toString()}
    //                         checked={selectedKeys.includes(item.idCategory.toString())}
    //                     >
    //                         {item.strCategory}
    //                     </Checkbox>
    //                 ),
    //             })) || [],
    //     },
    // ];

    return (
        <Col>
            {mealCategory?.categories.map((item) => (
                <label key={item.strCategory}>
                    <input type="checkbox" />
                    {item.strCategory}
                </label>
            ))}
        </Col>
    );
};

export default Category;
