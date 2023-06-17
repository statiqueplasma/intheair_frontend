import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../../../theme";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useDrop } from "react-dnd";

const DropSection = ({ id }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dropItem = (id) => {
        console.log(id);
    };
    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: "section",
            drop: () => dropItem(id),
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
            }),
        }),
        [id]
    );
    return (
        <Box
            ref={drop}
            ml="60px"
            mt="5px"
            display="flex"
            padding="10px"
            alignItems="center"
            border="1px solid gray"
            borderRadius="5px"
            width="80%"
            height="100px"
            boxShadow={`0px 0px 6px 2px ${colors.indigo["700"]}`}
            sx={{ backgroundColor: colors.white["900"], opacity: 1 }}
        ></Box>
    );
};

export default DropSection;
