import Header from "../global/header";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useReactToPrint } from "react-to-print";
import {
    Box,
    useTheme,
    TextField,
    Button,
    Typography,
    IconButton,
    MenuItem,
} from "@mui/material";
import { tokens } from "../../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useData } from "../../../contexts/DataContext";
import Loading from "../global/loading";
import SectionUser from "../global/sectionUser";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";

const ReportPage1 = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    let navigate = useNavigate();
    const { fetchReport, reportData, deleteReport } = useData();
    const componentRef = useRef();
    const handleprint = useReactToPrint({
        content: () => componentRef.current,
        pageStyle: "@page { size: auto;  margin: 20mm; }",
    });
    const [loading, setLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);

    const { id } = useParams();

    const isNonMobile = useMediaQuery("(min-width:700px)");

    useEffect(() => {
        if (loading) {
            if (id !== undefined) {
                fetchReport(id);
            }

            setLoading(false);
        } else {
            if (reportData) {
                setDataLoaded(true);
            }
        }
    }, [loading, reportData]);

    return (
        <Box
            display="flex"
            flexDirection="column"
            minHeight="800px"
            height="100%"
            mt="20px"
        >
            <Box width="50px" m="auto" mb="20px">
                <Button
                    variant="contained"
                    sx={{ height: "50px" }}
                    onClick={handleprint}
                >
                    <LocalPrintshopIcon /> {"  Print Report"}
                </Button>
            </Box>

            {dataLoaded ? (
                <Box
                    width="80%"
                    m="auto"
                    p="70px"
                    sx={{ backgroundColor: "white" }}
                >
                    <Box ref={componentRef}>
                        <SectionUser sections={reportData[0].sections} />
                    </Box>
                </Box>
            ) : (
                <Loading />
            )}
        </Box>
    );
};

export default ReportPage1;
