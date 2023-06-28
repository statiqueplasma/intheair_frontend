import { Box, Typography } from "@mui/material";
import Graphs from "../scenes/Graphs";
function romanize(num) {
    if (isNaN(num)) return NaN;
    var digits = String(+num).split(""),
        key = [
            "",
            "C",
            "CC",
            "CCC",
            "CD",
            "D",
            "DC",
            "DCC",
            "DCCC",
            "CM",
            "",
            "X",
            "XX",
            "XXX",
            "XL",
            "L",
            "LX",
            "LXX",
            "LXXX",
            "XC",
            "",
            "I",
            "II",
            "III",
            "IV",
            "V",
            "VI",
            "VII",
            "VIII",
            "IX",
        ],
        roman = "",
        i = 3;
    while (i--) roman = (key[+digits.pop() + i * 10] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}
const SectionUser = ({ sections, order = 1, lastPref = null }) => {
    const formatData = (graph) => {
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
    return (
        <Box>
            {sections.map((section, index) => {
                let pref = romanize(index + 1);
                if (order === 2) {
                    pref = index + 1;
                }
                if (order > 2) {
                    pref = lastPref + "." + (index + 1);
                }

                return (
                    <Box width="100%" color="black">
                        <Typography
                            fontSize={
                                order < 3
                                    ? `${35 - order * 5}px`
                                    : `${35 - 15}px`
                            }
                        >
                            {pref} - {section.title}
                        </Typography>
                        <Box
                            ml="15px"
                            textAlign={"justify"}
                            fontSize={"14px"}
                            dangerouslySetInnerHTML={{
                                __html: section.content,
                            }}
                        />
                        {section.graph && (
                            <Graphs
                                data={formatData(section.graph)}
                                graph_type={section.graph.graph_type}
                            />
                        )}
                        {section.children.length > 0 && (
                            <Box ml="35px">
                                <SectionUser
                                    sections={section.children}
                                    order={order + 1}
                                    lastPref={pref}
                                />
                            </Box>
                        )}
                    </Box>
                );
            })}
        </Box>
    );
};

export default SectionUser;
