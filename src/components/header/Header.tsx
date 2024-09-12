import { useNavigate } from "react-router-dom";
// components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Search from "./Search";
import SearchIconWrapper from "./SearchIconWrapper";
import StyledInputBase from "./StyledInputBase";
import Row from "../Row";
import FavoriteIcon from "@mui/icons-material/Favorite";

function Header() {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/home");
    };

    return (
        <Box sx={{ flexGrow: 1, position: "fixed", width: "100%", top: "0" }}>
            <AppBar position="static" sx={{ background: "#3e3a3a" }}>
                <Row className="mx-auto w-[1440px] max-w-[90%]">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                flexGrow: 1,
                                display: { xs: "none", sm: "block" },
                                cursor: "pointer",
                            }}
                            onClick={handleLogoClick}
                        >
                            RecipeFusion
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ "aria-label": "search" }}
                                />
                            </Search>
                            <Button color="inherit" sx={{ ml: 2 }}>
                                <FavoriteIcon />
                            </Button>
                        </Box>
                    </Toolbar>
                </Row>
            </AppBar>
        </Box>
    );
}

export default Header;
