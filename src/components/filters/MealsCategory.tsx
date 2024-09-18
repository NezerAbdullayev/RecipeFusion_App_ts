import React, { useState } from "react";
import { Spin, Alert } from "antd";
import { useGetAllMealCategoryQuery } from "../../redux/services/mealApi";

const MealsCategory: React.FC = () => {
    // category
    const { data: mealCategory, error, isLoading } = useGetAllMealCategoryQuery();

    const [checkedItems, setCheckedItems] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleOpen = () => {
        setIsOpen((isOpen) => !isOpen);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target; 

        if (checked) {
            setCheckedItems((checkedItems) => [...checkedItems, name]);
        } else {
            setCheckedItems((checkedItems) => checkedItems.filter((item) => item !== name));
        }
    };

    console.log(checkedItems);

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    if (error)
        <Alert message="Error" description="There was an error fetching data." type="error" />;

    return (
        <div>
            <div
                className="cursor-pointer border-b bg-stone-50 p-1 text-xl font-bold"
                onClick={toggleOpen}
            >
                Meals Category
            </div>
            {/* checkboxs */}

            {isOpen && (
                <div className="ml-3 flex flex-col">
                    {mealCategory?.categories?.map((item) => (
                        <label
                            key={item.strCategory}
                            className="flex cursor-pointer items-center gap-1 p-1 transition-all hover:bg-stone-200/50"
                        >
                            <input
                                type="checkbox"
                                onChange={handleChange}
                                name={item.strCategory}
                            />
                            <span className="">{item.strCategory}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MealsCategory;
