import { Box, useTheme, Typography, Button, IconButton } from "@mui/material";
import { tokens } from "../../../theme";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useDrag, useDrop } from "react-dnd";
import { useContext, useState } from "react";
import { SectionContext } from "../scenes/report";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SectionForm from "./sectionForm";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import Header from "./header";

export const DropSection = ({
    id,
    isDragging,
    position,
    dropHeight,
    colors,
}) => {
    var height = 100;
    let { changePosition } = useContext(SectionContext);
    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: "section",
            drop: (item) => {
                if (item.id && id) {
                    try {
                        console.log(item.id, id);
                        changePosition(item.id, id, position);
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
            collect: (monitor) => ({
                isOver: monitor.isOver(),
            }),
        }),
        [id]
    );
    var state = isOver && !isDragging;
    return (
        <Box
            ref={drop}
            left="0px"
            display="flex"
            width="100%"
            mb={position === "above" ? `${-dropHeight - 10}px` : null}
            mt={position === "child" ? `${-height / 2 - 2}px` : null}
            height={
                state
                    ? position === "above"
                        ? `${height * 0.8}px`
                        : `${height * 1.4}px`
                    : position === "above"
                    ? `${height / 2 - 15}px`
                    : `${height - 40}px`
            }
            justifyContent="flex-end"
        >
            {state && (
                <Box
                    border="1px solid gray"
                    borderRadius="5px"
                    width="100%"
                    height={`${dropHeight}px`}
                    boxShadow={`0px 0px 6px 2px ${colors.indigo["700"]}`}
                    mt={position === "child" ? `${height / 2}px` : null}
                    sx={{
                        backgroundColor: colors.indigo["700"],
                        opacity: 0.6,
                    }}
                ></Box>
            )}
        </Box>
    );
};
const Section = ({
    id,
    title,
    content,
    graph,
    project,
    children,
    files,
    dataTypes,
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [dragged, setDragged] = useState({});
    let elements = 0;
    if (title) elements++;
    if (content) elements++;
    if (graph) elements++;
    let heightpx = `${elements * 35}px`;
    let height = `${elements * 35}`;
    let dropHeight = 100;
    const [openPoper, setOpenPoper] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenPoper((openPoper) => !openPoper);
    };
    const hasChildren = (children) => children && children.length;
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "section",
        item: { id: id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <>
            <Box
                onClick={() => {}}
                width="100%"
                display="flex"
                flexDirection="column"
                alignItems="flex-end"
                ref={drag}
            >
                <Box
                    width="100%"
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-end"
                >
                    <Box zIndex="2" width="100%">
                        <DropSection
                            id={id}
                            isDragging={isDragging}
                            position="above"
                            height={height}
                            dropHeight={dropHeight / 3 + 5}
                            colors={colors}
                        />
                    </Box>
                    <Box
                        width="100%"
                        ml="60px"
                        display="flex"
                        padding="10px"
                        alignItems="center"
                        border="1px solid gray"
                        borderRadius="5px"
                        height={heightpx}
                        boxShadow={
                            isDragging
                                ? `0px 0px 6px 2px ${colors.indigo["700"]}`
                                : null
                        }
                        sx={{
                            backgroundColor:
                                theme.palette.mode === "light"
                                    ? colors.white["900"]
                                    : colors.black["900"],
                            opacity: isDragging ? 0.5 : 1,
                        }}
                    >
                        <Box
                            mr="10px"
                            borderRight="1px solid gray"
                            height="100%"
                            display="flex"
                            alignItems="flex-start"
                            zIndex="3"
                            fontSize={elements > 1 ? "25px" : "20px"}
                        >
                            <DragIndicatorIcon
                                sx={{
                                    mt: `${elements > 1 ? elements * 5 : 0}px`,
                                    mr: "5px",
                                    cursor: "move",
                                }}
                                fontSize="inherit"
                            />
                        </Box>
                        <Box width="95%">
                            {title && (
                                <Typography fontSize="2vh" fontWeight="500">
                                    {title}
                                </Typography>
                            )}
                            {content && (
                                <Typography fontSize="1.5vh" fontWeight="400">
                                    {content
                                        .substring(1, 80)
                                        .replaceAll(
                                            /<\/?[^>]+(>|$)/gi,
                                            ""
                                        )}{" "}
                                    ...
                                </Typography>
                            )}
                            {graph && (
                                <Typography fontSize="1vh">
                                    Graph: {graph.name}
                                </Typography>
                            )}
                        </Box>
                        <Box
                            position="relative"
                            borderLeft="1px solid gray"
                            display="flex"
                            alignItems="center"
                            fontSize={"40px"}
                            justifyContent="center"
                            zIndex="5"
                            height="100%"
                            width="60px"
                        >
                            <Button
                                m="auto"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                height="100%"
                                sx={{
                                    width: "100%",
                                    fontSize: "40px",
                                    color: `${
                                        theme.palette.mode === "light"
                                            ? colors.black[500]
                                            : colors.white[300]
                                    }`,
                                    "&:hover": {
                                        color: `${
                                            theme.palette.mode === "light"
                                                ? colors.black[300]
                                                : colors.black[200]
                                        }`,
                                        cursor: "pointer",
                                    },
                                }}
                                onClick={(event) => {
                                    handleClick(event);
                                }}
                            >
                                <EditNoteIcon fontSize="30px" />
                            </Button>
                        </Box>
                    </Box>
                    <Box width="95%">
                        <DropSection
                            id={id}
                            isDragging={isDragging}
                            position="child"
                            height={height}
                            dropHeight={dropHeight}
                            colors={colors}
                        />
                    </Box>

                    <Box width="90%">
                        {!isDragging && hasChildren(children)
                            ? children.map((child) => (
                                  <Section
                                      key={child.id}
                                      project={project}
                                      id={child.id}
                                      title={child.title}
                                      content={child.content}
                                      graph={child.graph}
                                      children={child.children}
                                      files={files}
                                      dataTypes={dataTypes}
                                  />
                              ))
                            : null}
                    </Box>
                </Box>
            </Box>
            {openPoper && (
                <Box
                    position="fixed"
                    left="0"
                    top="0"
                    height="100%"
                    width="100%"
                    zIndex="20"
                    sx={{
                        backdropFilter: "blur(9px)",
                        backgroundColor: "rgba(0,0,0,0.5)",
                    }}
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        width="90%"
                        m="auto"
                        mt="5px"
                        height="97%"
                        sx={{
                            bgcolor: `${colors.white[500]}`,

                            border: `1px solid ${colors.indigo[500]}`,
                            borderRadius: "5px",
                        }}
                    >
                        <Box
                            width="100%"
                            height="50px"
                            display="flex"
                            zIndex="5"
                            justifyContent="end"
                        >
                            <IconButton
                                mr="10px"
                                sx={{
                                    fontSize: "30px",
                                    color: `${
                                        theme.palette.mode === "light"
                                            ? colors.black[500]
                                            : colors.white[200]
                                    }`,
                                    "&:hover": {
                                        color: `${
                                            theme.palette.mode === "light"
                                                ? colors.black[200]
                                                : colors.black[100]
                                        }`,
                                        cursor: "pointer",
                                    },
                                }}
                                onClick={() => {
                                    setOpenPoper(false);
                                }}
                            >
                                <CloseIcon fontSize="30px" />
                            </IconButton>
                        </Box>
                        <Box
                            width="100%"
                            height="90%"
                            display="flex"
                            flexDirection="column"
                            justifyContent="start"
                        >
                            <Header
                                title="Edit Section"
                                subtitle="Use this form to edit your section"
                            />
                            <Box
                                width="100%"
                                height="100%"
                                sx={{ overflowY: "scroll" }}
                            >
                                <SectionForm
                                    id={id}
                                    project={project}
                                    titlein={title}
                                    contentin={content}
                                    files={files}
                                    graphin={graph}
                                    dataTypes={dataTypes}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default Section;
