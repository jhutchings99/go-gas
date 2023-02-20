import Navbar from "scenes/navbar";
import { Box } from "@mui/material";
import StationsWidget from "scenes/widgets/StationsWidget";

const HomePage = () => {
    return (
        <Box>
            <Navbar />
            <StationsWidget />
        </Box>
    );
};

export default HomePage;