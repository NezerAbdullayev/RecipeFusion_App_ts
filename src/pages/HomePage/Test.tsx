import React, { useState } from "react";
import { Menu, MenuItem, Checkbox, IconButton, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useGetAllMealCategoryQuery } from "../../redux/services/mealApi";

const Sidebar: React.FC = () => {
    const { data: mealCategory, error, isLoading } = useGetAllMealCategoryQuery();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([
        mealCategory?.categories[0]?.idCategory.toString() || "",
    ]);
    const [hasSelected, setHasSelected] = useState(false); 

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading categories</div>;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        if (hasSelected) {
            setAnchorEl(null);
        }
    };

    const handleCheckboxChange = (key: string) => {
        setSelectedKeys((prevSelectedKeys) => {
            const updatedKeys = prevSelectedKeys.includes(key)
                ? prevSelectedKeys.filter((k) => k !== key)
                : [...prevSelectedKeys, key];
            if (updatedKeys.length > 0) {
                setHasSelected(true);
            }
            return updatedKeys;
        });
    };

    return (
        <div>
            <Box display="flex" alignItems="center">
                <Typography variant="h6" component="div" sx={{ mr: 2 }}>
                    Category
                </Typography>
                <IconButton
                    aria-controls={anchorEl ? "menu" : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
            </Box>
            <Menu
                id="menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                PaperProps={{
                    style: {
                        maxHeight: 300,
                        width: 250,
                    },
                }}
            >
                {mealCategory?.categories.map((item, index) => (
                    <MenuItem key={item.idCategory}>
                        <Checkbox
                            checked={selectedKeys.includes(item.idCategory.toString())}
                            onChange={() => handleCheckboxChange(item.idCategory.toString())}
                            disabled={index === 0}
                        />
                        {item.strCategory}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default Sidebar;
