import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "start",
                flexDirection: "column",
                alignItems: "center",
                pt: "200px",
                width: "100%",
                height: "1250px",
            }}
        >
            <Typography
                variant="h4"
                fontStyle="oblique"
                color="primary"
                mb="60px"
            >
                Loading Data...
            </Typography>
            <CircularProgress size="150px" />
        </Box>
    );
};

export default Loading;
