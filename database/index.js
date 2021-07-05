let books =[{
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

let authers =[{
    id: 1,
    name: "pavan",
    books:["12345ONE"],
},
{
    id: 2,
    name: "deepak",
    books:["12345ONE", "12345TWO",],
},
]

let publications = [{
    id: 1,
    name: "chakra",
    books:["12345ONE"],
},
{
    id: 2,
    name: "ckra",
    books:[],
}
];

module.exports = { books, authers, publications};
//module = file "start": "nodemon index.js",