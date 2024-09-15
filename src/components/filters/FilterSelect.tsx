import { Select, Spin } from "antd";

const { Option } = Select;

function FilterSelect({data}) {


    return (
        <Select placeholder="Select an option" style={{ width: 140 }}>
            {data &&
                data.meals.slice(0,20).map((item) => (
                    <Option key={item.id} value={item.strCategory}>
                        {item.strIngredient}
                    </Option>
                ))}
        </Select>
    );
}

export default FilterSelect;
