const FilterPoper = () => {
    return (
        <Popper
            open={openPoperProjType}
            anchorEl={anchorElProjType}
            placement="bottom-end"
            transition
        >
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={200}>
                    <Box
                        sx={{
                            p: "5px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around",
                            flexDirection: "column",
                            width: "350px",
                            height: "170px",
                            bgcolor: `${colors.white[500]}`,

                            border: `1px solid ${colors.indigo[500]}`,
                            borderRadius: "5px",
                        }}
                    >
                        <Typography
                            p="5px"
                            width="90%"
                            variant="h7"
                            color={colors.black[500]}
                        >
                            Are you Sure you want to DELETE This Project Type?{" "}
                            <br />
                            All related projects will be Deleted.
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                alignSelf: "end",
                                justifyContent: "space-between",
                                flexDirection: "row",
                            }}
                        >
                            <Button
                                onClick={() => setOpenPoperProjType(false)}
                                color="primary"
                                variant="contained"
                                sx={{
                                    p: "5px 10px",
                                    m: "0 10px",
                                }}
                                endIcon={<DoNotDisturbAltIcon />}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => {
                                    setOpenPoperProjType(false);
                                    deleteProjecttypeData(deleteIdProjType);
                                }}
                                color="error"
                                variant="contained"
                                sx={{
                                    p: "5px 10px",
                                    mr: "10px",
                                }}
                                endIcon={<DeleteForeverIcon />}
                            >
                                Delete
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            )}
        </Popper>
    );
};

export default FilterPoper;


function LayerItem ({layer, index, colors, collapsed, openPoper, filterObject, setfilterObject, filterIndex}){
    const [{ isDragging }, drag] = useDrag(() => ({
                        type: "layer",
                        item: { id: index },
                        collect: (monitor) => ({
                            isDragging: !!monitor.isDragging(),
                        }),
                    }));

    return(
        <>
        <DropSection
        id={index}
        isDragging={isDragging}
        colors={colors}
    />
    <Box
        display={"inline-flex"}
        alignContent={"center"}
        width={"100%"}
        ref={drag}
        cursor="move"
    >
        <Checkbox
            checked={layer.show}
            onChange={(value) => {
                LayerControl(index);
            }}
            icon={<VisibilityOffIcon />}
            checkedIcon={<VisibilityIcon />}
        />
        <Typography
            alignSelf={"center"}
            textAlign={"center"}
            color={colors.black["300"]}
            variant="h5"
        >
            |
        </Typography>

        <Box
            display={"flex"}
            alignItems={"center"}
            fontSize={"16px"}
            width={"65%"}
        >
            {getIcon(layer.type)}
            {!collapsed && (
                <Typography
                    fontSize="14px"
                    alignContent={"center"}
                >
                    {layer.name.length > 15
                        ? layer.name.substring(0, 15) +
                          "..."
                        : layer.name}
                </Typography>
            )}
        </Box>
        <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
        >
            <Tooltip title="Zoomer sur La Layer">
                <IconButton size="small">
                    <ZoomInIcon fontSize="14px" />
                </IconButton>
            </Tooltip>
            <hr
                style={{
                    width: "50%",
                    border: `1.3px solid ${colors.black["600"]}`,
                    margin: "0",
                }}
            />
            <Tooltip title="Filter">
                <IconButton
                    size="small"
                    onClick={(event) =>
                        handleClick(filterIndex, event)
                    }
                >
                    <FilterAltIcon fontSize="14px" />
                </IconButton>
            </Tooltip>
        </Box>
    </Box>
    {/* =============================== FILTER POPER */}
    {openPoper[filterIndex] && (
        <Popper
            open={openPoper[filterIndex]}
            anchorEl={anchorEl[filterIndex]}
            placement="right-end"
            transition
            style={{ zIndex: 100000 }}
        >
            {({ TransitionProps }) => (
                <Fade
                    {...TransitionProps}
                    timeout={200}
                >
                    <Box
                        sx={{
                            p: "5px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent:
                                "space-around",
                            flexDirection: "column",
                            width: "300px",
                            height: "60px",
                            bgcolor: `${colors.white[500]}`,
                            zIndex: "100000",
                            border: `1px solid ${colors.indigo[500]}`,
                            borderRadius: "5px",
                            ml: "12px",
                        }}
                    >
                        <Box
                            display={"flex"}
                            alignItems={"center"}
                        >
                            <Tooltip title="Activation du filtre">
                                <Checkbox
                                    checked={
                                        filterObject[
                                            filterIndex
                                        ].active
                                    }
                                    onChange={(
                                        value
                                    ) => {
                                        {
                                            let arrbuff =
                                                filterObject;
                                            arrbuff[
                                                filterIndex
                                            ].active =
                                                !arrbuff[
                                                    filterIndex
                                                ]
                                                    .active;
                                            setfilterObject(
                                                arrbuff
                                            );
                                            forceUpdate();
                                        }
                                    }}
                                />
                            </Tooltip>
                            <Box width={"70%"}>
                                <form>
                                    <select
                                        value={
                                            filterObject[
                                                filterIndex
                                            ].prop
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            //setFilterProp(event.target.value)
                                            {
                                                let arrbuff =
                                                    filterObject;
                                                arrbuff[
                                                    filterIndex
                                                ].prop =
                                                    event.target.value;
                                                setfilterObject(
                                                    arrbuff
                                                );
                                            }
                                        }
                                        style={{
                                            width: "50px",
                                        }}
                                    >
                                        <option
                                            key={0}
                                            value={null}
                                        >
                                            {"Select"}
                                        </option>
                                        {uniqueOptions.map(
                                            (
                                                key,
                                                index
                                            ) => (
                                                <option
                                                    key={
                                                        index
                                                    }
                                                    value={
                                                        key
                                                    }
                                                >
                                                    {
                                                        key
                                                    }
                                                </option>
                                            )
                                        )}
                                    </select>
                                    <select
                                        value={
                                            filterObject[
                                                filterIndex
                                            ].operator
                                        }
                                        onChange={(
                                            event
                                        ) => {
                                            let arrbuff =
                                                filterObject;
                                            arrbuff[
                                                filterIndex
                                            ].operator =
                                                event.target.value;
                                            setfilterObject(
                                                arrbuff
                                            );
                                        }}
                                        style={{
                                            width: "50px",
                                        }}
                                    >
                                        <option
                                            key="0"
                                            value={null}
                                        >
                                            {" "}
                                            {"Oper."}
                                        </option>
                                        <option
                                            key="1"
                                            value={
                                                "sup"
                                            }
                                        >
                                            {">"}
                                        </option>
                                        <option
                                            key="2"
                                            value={
                                                "inf"
                                            }
                                        >
                                            {"<"}
                                        </option>
                                        <option
                                            key="3"
                                            value={
                                                "equal"
                                            }
                                        >
                                            {"="}
                                        </option>
                                    </select>
                                    <input
                                        onChange={(
                                            event
                                        ) => {
                                            let arrbuff =
                                                filterObject;
                                            arrbuff[
                                                filterIndex
                                            ].value =
                                                event.target.value;
                                            setfilterObject(
                                                arrbuff
                                            );
                                        }}
                                        value={
                                            filterObject[
                                                filterIndex
                                            ].value
                                        }
                                        type="text"
                                        style={{
                                            width: "50px",
                                        }}
                                    />
                                </form>
                            </Box>
                            <Box ml="5px" width={"30%"}>
                                <Tooltip title="Lancer le filtrage">
                                    <IconButton
                                        sx={{
                                            width: "50%",
                                        }}
                                        variant="contained"
                                        size="small"
                                        onClick={() =>
                                            FilterValues(
                                                filterObject
                                            )
                                        }
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Isoler Les Elements filtrees">
                                    <Checkbox
                                        sx={{
                                            width: "25%",
                                        }}
                                        checked={
                                            filterObject[
                                                filterIndex
                                            ].show
                                        }
                                        onChange={(
                                            value
                                        ) => {
                                            {
                                                forceUpdate();
                                                let arrbuff =
                                                    filterObject;
                                                arrbuff[
                                                    filterIndex
                                                ].show =
                                                    !arrbuff[
                                                        filterIndex
                                                    ]
                                                        .show;
                                                setfilterObject(
                                                    arrbuff
                                                );
                                            }
                                        }}
                                        icon={
                                            <RemoveCircleOutlineIcon />
                                        }
                                        checkedIcon={
                                            <RemoveCircleIcon />
                                        }
                                    />
                                </Tooltip>
                            </Box>
                        </Box>
                    </Box>
                </Fade>
            )}
        </Popper>
    )}
    <hr
        style={{
            border: `1px solid ${colors.black["400"]}`,
            margin: "2px",
        }}
    />
    </>
    )

}