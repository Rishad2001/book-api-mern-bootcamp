const books =[{
    ISBN: "12345ONE",
    title: "Getting stated with MERN",
    authers: [1,2],
    language: "en",
    pubDate: "2021-07-07",
    numOfPage: 255,
    category: ["fiction", "programming", "tech", "web dev"],
    publication: 1,
},
{
    ISBN: "12345TWO",
    title: "Getting stated with python",
    authers: [1,2],
    language: "en",
    pubDate: "2021-07-07",
    numOfPage: 255,
    category: ["fiction", "y", "tech", "web dev"],
    publication: 1,
}
];

const authers =[{
    id: 1,
    name: "pavan",
    books:["12345ONE"],
},
{
    id: 2,
    name: "deepak",
    books:["12345ONE", "12345TWO"],
},
]

const publications = [{
    id: 1,
    name: "chakra",
    books:["12345ONE"],
},
];

module.exports = { books, authers, publications};
//module = file