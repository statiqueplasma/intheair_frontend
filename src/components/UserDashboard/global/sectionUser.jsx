import { Box, Typography } from "@mui/material";
import Graphs from "../../Graphs";
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
                        {section.title && (
                            <Typography
                                fontSize={
                                    order < 3
                                        ? `${35 - order * 5}px`
                                        : `${35 - 15}px`
                                }
                            >
                                {pref} - {section.title}
                            </Typography>
                        )}

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
                                data={section.graph}
                                graph_type={section.graph.graph_type}
                            />
                        )}
                        <Box
                            display="inline-flex"
                            width={"100%"}
                            justifyContent="space-around"
                            flexWrap="wrap"
                            alignItems="center"
                            p="20px"
                        >
                            {section.images.map((image) => {
                                return (
                                    <img
                                        src={image.image}
                                        style={{
                                            width: "40%",
                                            height: "auto",
                                            margin: "10px",
                                        }}
                                    />
                                );
                            })}
                        </Box>
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
