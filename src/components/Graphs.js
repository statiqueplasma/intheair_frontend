import { Container } from "react-bootstrap";
import { Line, ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";

export const formatData = (graph) => {
    let x_label = graph.x_label;
    let y_label = graph.y_label;
    let y2_label = graph.y2_label;
    var data = [];
    if (graph.graph_type === "BARS") {
        for (let i = 0; i < graph.x_data.length; i++) {
            let obj = {};
            obj[x_label] = graph.x_data[i];
            if (graph.y_data) {
                obj[y_label] = graph.y_data[i];
            }
            if (graph.y2_data) {
                obj[y2_label] = graph.y2_data[i];
            }
            data.push(obj);
        }
    } else if (graph.graph_type === "LINE") {
        data["x_label"] = x_label;
        var data_y = { id: y_label, data: [] };
        var data_y2 = { id: y2_label, data: [] };

        for (let i = 0; i < graph.x_data.length; i++) {
            let obj = { x: null, y: null };
            obj["x"] = graph.x_data[i];
            if (graph.y_data) {
                obj["y"] = graph.y_data[i];
                data_y.data.push(obj);
            }
            if (graph.y2_data) {
                obj["y"] = graph.y2_data[i];
                data_y2.data.push(obj);
            }
        }
        if (graph.y_data) {
            data["y_label"] = y_label;
            data.push(data_y);
        }
        if (graph.y2_data) {
            data.push(data_y2);
        }
    }
    return data;
};
function LineChart({ data }) {
    return (
        <Container style={{ width: "100%", height: 400 }}>
            <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{
                    type: "linear",
                    min: "auto",
                    max: "auto",
                    stacked: true,
                    reverse: false,
                }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -38,
                    legend: data["x_label"],
                    legendOffset: 40,
                    legendPosition: "middle",
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: data["y_label"],
                    legendOffset: -40,
                    legendPosition: "middle",
                }}
                pointSize={10}
                colors={{ scheme: "category10" }}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: "bottom-right",
                        direction: "column",
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: "left-to-right",
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: "circle",
                        symbolBorderColor: "rgba(0, 0, 0, .5)",
                        effects: [
                            {
                                on: "hover",
                                style: {
                                    itemBackground: "rgba(0, 0, 0, .03)",
                                    itemOpacity: 1,
                                },
                            },
                        ],
                    },
                ]}
            />
        </Container>
    );
}

function PieChart({ data }) {
    return (
        <Container style={{ width: 900, height: 400 }}>
            <ResponsivePie
                data={data}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.03}
                padAngle={1}
                cornerRadius={2}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{
                    from: "color",
                    modifiers: [["darker", 0.2]],
                }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: "color" }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                    from: "color",
                    modifiers: [["darker", 2]],
                }}
                defs={[
                    {
                        id: "dots",
                        type: "patternDots",
                        background: "inherit",
                        color: "rgba(255, 255, 255, 0.3)",
                        size: 4,
                        padding: 1,
                        stagger: true,
                    },
                    {
                        id: "lines",
                        type: "patternLines",
                        background: "inherit",
                        color: "rgba(255, 255, 255, 0.3)",
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10,
                    },
                ]}
                legends={[
                    {
                        anchor: "bottom",
                        direction: "row",
                        justify: false,
                        translateX: 0,
                        translateY: 56,
                        itemsSpacing: 0,
                        itemWidth: 100,
                        itemHeight: 18,
                        itemTextColor: "#999",
                        itemDirection: "left-to-right",
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: "circle",
                        effects: [
                            {
                                on: "hover",
                                style: {
                                    itemTextColor: "#000",
                                },
                            },
                        ],
                    },
                ]}
            />
        </Container>
    );
}

function BarChart({ data }) {
    let elem = data[0];
    let keys = [];
    let index = null;
    for (var key in elem) {
        keys.push(key);
    }
    index = keys[0];
    keys.shift();
    return (
        <Container style={{ width: 900, height: 500 }}>
            <ResponsiveBar
                data={data}
                keys={keys}
                indexBy={index}
                margin={{ top: 50, right: 130, bottom: 100, left: 60 }}
                padding={0.3}
                groupMode="grouped"
                valueScale={{ type: "linear" }}
                indexScale={{ type: "band", round: true }}
                colors={{ scheme: "category10" }}
                defs={[
                    {
                        id: "dots",
                        type: "patternDots",
                        background: "inherit",
                        color: "#38bcb2",
                        size: 4,
                        padding: 1,
                        stagger: true,
                    },
                    {
                        id: "lines",
                        type: "patternLines",
                        background: "inherit",
                        color: "#eed312",
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10,
                    },
                ]}
                fill={[
                    {
                        match: {
                            id: "fries",
                        },
                        id: "dots",
                    },
                    {
                        match: {
                            id: "sandwich",
                        },
                        id: "lines",
                    },
                ]}
                borderColor={{
                    from: "color",
                    modifiers: [["darker", 1.6]],
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -34,
                    legend: index,
                    legendPosition: "middle",
                    legendOffset: 32,
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Mesures",
                    legendPosition: "middle",
                    legendOffset: -40,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{
                    from: "color",
                    modifiers: [["darker", 1.6]],
                }}
                legends={[
                    {
                        dataFrom: "keys",
                        anchor: "bottom-right",
                        direction: "column",
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: "left-to-right",
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: "hover",
                                style: {
                                    itemOpacity: 1,
                                },
                            },
                        ],
                    },
                ]}
                role="application"
                barAriaLabel={(e) =>
                    e.id +
                    ": " +
                    e.formattedValue +
                    " in country: " +
                    e.indexValue
                }
            />
        </Container>
    );
}

function Graphs({ graph_type, data }) {
    var formated_data = formatData(data);
    if (graph_type === "LINE") {
        return <LineChart data={formated_data} />;
    } else if (graph_type === "BARS") {
        return <BarChart data={formated_data} />;
    } else if (graph_type === "PieChart") {
        return <PieChart data={formated_data} />;
    }
}

export default Graphs;
