import Graphs from "./Graphs";
import BarChartSample from "../../data/barchart.json";
import LineChartSample from "../../data/linechart.json";
import PieChartSample from "../../data/piechart.json";

function TestGraphs() {
    return (
        <>
            <Graphs graph_type={"BarChart"} data={BarChartSample} />
        </>  
    );
}

export default TestGraphs;