import React, { useState, useCallback } from "react";
import { Input } from "antd";
import { debounce } from "lodash";

interface SearchProps {
    onSearchChange: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearchChange }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const debouncedSearchMeals = useCallback(
        debounce((term) => onSearchChange(term), 600),
        [],
    );

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchTerm(value);

        if (value) debouncedSearchMeals(value);
    };

    return <Input placeholder="Search..." value={searchTerm} onChange={handleSearchInputChange} style={{ width: 300 }} />;
};

export default Search;
