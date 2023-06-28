import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../../../theme";

const Header = ({ title, subtitle, icon }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box sx={{ ml: "60px", mt: "5px" }}>
            <Box>
                <Typography
                    variant="h4"
                    color={colors.black[400]}
                    fontWeight="bold"
                    display="flex"
                >
                    {" "}
                    {icon && <Box mr="15px">{icon}</Box>}
                    {title}
                </Typography>
                <Typography
                    variant="h6"
                    color={colors.indigo[500]}
                    fontWeight="bold"
                >
                    {subtitle}
                </Typography>
            </Box>
        </Box>
    );
};

export default Header;
