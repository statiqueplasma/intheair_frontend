export const Report = [
    {
        id: 1,
        title: "subsection 1",
        order: 1,
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et augue nec magna pretium dapibus. Quisque at neque non justo tincidunt venenatis. Quisque purus nisi, tempor id facilisis a, bibendum non urna. Praesent ultricies elit mi, eu efficitur turpis malesuada at. Aliquam facilisis pulvinar tortor rhoncus viverra",
        graph: {
            id: 3,
            name: "graph 1",
            x_label: "x axis",
            y_label: "y axis",
            y2_label: null,
            x_data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
            y_data: [
                10, 56, 23, 45, 68, 47, 53, 1, 45, 15, 78, 89, 12, 58, 56, 19,
            ],
            y2_data: null,
        },
        children: [
            {
                id: 2,
                title: "subsection 1",
                order: 1,
                content:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et augue nec magna pretium dapibus. Quisque at neque non justo tincidunt venenatis. Quisque purus nisi, tempor id facilisis a, bibendum non urna. Praesent ultricies elit mi, eu efficitur turpis malesuada at. Aliquam facilisis pulvinar tortor rhoncus viverra",
                graph: {
                    id: 3,
                    name: "graph 1",
                    x_label: "x axis",
                    y_label: "y axis",
                    y2_label: null,
                    x_data: [
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                    ],
                    y_data: [
                        10, 56, 23, 45, 68, 47, 53, 1, 45, 15, 78, 89, 12, 58,
                        56, 19,
                    ],
                    y2_data: null,
                },
                children: [],
                parent: 1,
            },
            {
                id: 3,
                title: "subsection 2",
                order: 2,
                content:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et augue nec magna pretium dapibus. Quisque at neque non justo tincidunt venenatis. Quisque purus nisi, tempor id facilisis a, bibendum non urna. Praesent ultricies elit mi, eu efficitur turpis malesuada at. Aliquam facilisis pulvinar tortor rhoncus viverra",
                graph: null,
                children: [
                    {
                        id: 4,
                        title: "subsubsection 2",
                        order: 1,
                        content:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et augue nec magna pretium dapibus. Quisque at neque non justo tincidunt venenatis. Quisque purus nisi, tempor id facilisis a, bibendum non urna. Praesent ultricies elit mi, eu efficitur turpis malesuada at. Aliquam facilisis pulvinar tortor rhoncus viverra",
                        graph: null,
                        children: [],
                        parent: 3,
                    },
                    {
                        id: 5,
                        title: "subsubsection 2",
                        order: 2,
                        content:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et augue nec magna pretium dapibus. Quisque at neque non justo tincidunt venenatis. Quisque purus nisi, tempor id facilisis a, bibendum non urna. Praesent ultricies elit mi, eu efficitur turpis malesuada at. Aliquam facilisis pulvinar tortor rhoncus viverra",
                        graph: null,
                        children: [],
                        parent: 3,
                    },
                ],
                parent: 1,
            },
        ],
        parent: null,
    },
];

export const SectionsTest = [
    {
        id: 1,
        title: "subsection 1",
        order: 1,
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et augue nec magna pretium dapibus. Quisque at neque non justo tincidunt venenatis. Quisque purus nisi, tempor id facilisis a, bibendum non urna. Praesent ultricies elit mi, eu efficitur turpis malesuada at. Aliquam facilisis pulvinar tortor rhoncus viverra",
        graph: {
            id: 3,
            name: "graph 1",
            x_label: "x axis",
            y_label: "y axis",
            y2_label: null,
            x_data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
            y_data: [
                10, 56, 23, 45, 68, 47, 53, 1, 45, 15, 78, 89, 12, 58, 56, 19,
            ],
            y2_data: null,
        },
        children: [2, 3],
        parent: null,
    },
    {
        id: 2,
        title: "subsection 1",
        order: 1,
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et augue nec magna pretium dapibus. Quisque at neque non justo tincidunt venenatis. Quisque purus nisi, tempor id facilisis a, bibendum non urna. Praesent ultricies elit mi, eu efficitur turpis malesuada at. Aliquam facilisis pulvinar tortor rhoncus viverra",
        graph: {
            id: 3,
            name: "graph 1",
            x_label: "x axis",
            y_label: "y axis",
            y2_label: null,
            x_data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
            y_data: [
                10, 56, 23, 45, 68, 47, 53, 1, 45, 15, 78, 89, 12, 58, 56, 19,
            ],
            y2_data: null,
        },
        children: [],
        parent: 1,
    },
    {
        id: 3,
        title: "subsection 2",
        order: 2,
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et augue nec magna pretium dapibus. Quisque at neque non justo tincidunt venenatis. Quisque purus nisi, tempor id facilisis a, bibendum non urna. Praesent ultricies elit mi, eu efficitur turpis malesuada at. Aliquam facilisis pulvinar tortor rhoncus viverra",
        graph: null,
        children: [4, 5],
        parent: 1,
    },
    {
        id: 4,
        title: "subsubsection 2",
        order: 1,
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et augue nec magna pretium dapibus. Quisque at neque non justo tincidunt venenatis. Quisque purus nisi, tempor id facilisis a, bibendum non urna. Praesent ultricies elit mi, eu efficitur turpis malesuada at. Aliquam facilisis pulvinar tortor rhoncus viverra",
        graph: null,
        children: [],
        parent: 3,
    },
    {
        id: 5,
        title: "subsubsection 2",
        order: 2,
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et augue nec magna pretium dapibus. Quisque at neque non justo tincidunt venenatis. Quisque purus nisi, tempor id facilisis a, bibendum non urna. Praesent ultricies elit mi, eu efficitur turpis malesuada at. Aliquam facilisis pulvinar tortor rhoncus viverra",
        graph: null,
        children: [],
        parent: 3,
    },
];
