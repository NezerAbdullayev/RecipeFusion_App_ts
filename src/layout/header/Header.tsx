import { useNavigate } from "react-router-dom";
// components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Row from "../../components/Row";
import FavoriteIcon from "@mui/icons-material/Favorite";
function Header() {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/");
    };

    const handleFavorites = () => {
        navigate("/favorites");
    };

    const handleRandomClick = () => {
        navigate("/random");
    };

    return (
        <Box sx={{ flexGrow: 1, position: "fixed", width: "100%", top: "0", zIndex: "99999" }}>
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
                            <Button color="inherit" sx={{ ml: 2 }} onClick={handleFavorites}>
                                <FavoriteIcon />
                            </Button>
                            <Button onClick={handleRandomClick}>RANDOM</Button>
                        </Box>
                    </Toolbar>
                </Row>
            </AppBar>
        </Box>
    );
}

export default Header;
