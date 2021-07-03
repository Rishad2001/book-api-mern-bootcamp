//frame work
const express =require("express");

//intializing
const shapeAI =express();

//database
const database = require("./database/index")

//configering
shapeAI.use(express.json());

/*
Route            /
description      get all books
access           public
parameter        none
method           get
*/
shapeAI.get("/", (req,res) =>{
    return res.json({ books: database.books})
});

/*
Route            /
description      to get specific book based on ISBN
access           public
parameter        isbn
method           get
*/

shapeAI.get("/is/:isbn", (req,res)=> {
    const getSpecificBook = database.books.filter((book) =>book.ISBN === req.params.isbn);

    if (getSpecificBook.length === 0) {
        return res.json({error: `no book found for the ISBN ${req.params.isbn}}`,})
    }

    return res.json({book: getSpecificBook})
})

/*
Route            /c
description      to get specific books based on a category
access           public
parameter        category
method           get
*/
shapeAI.get("/c/:category", (req,res) => {
    const getSpecificBooks = database.books.filter((book) => book.category.includes(req.params.category))
    if (getSpecificBooks.length === 0) {
        return res.json({error: `no book found for the cateogery of category  name ${req.params.category}}`,})
    }

    return res.json({books: getSpecificBooks})
})

/*
Route            /a
description      to get all authers
access           public
parameter        none
method           get
*/

shapeAI.get("/a", (req,res) => {
    return res.json({ authers: database.authers})
})

/*
Route            /a/auther
description      to get specific auther
access           public
parameter        auther
method           get
*/
shapeAI.get("/a/auther/:auther", (req,res) =>{
    const getAuthers = database.authers.filter((auther) =>auther.name === req.params.auther)
    if (getAuthers.length === 0){
        return res.json({error: `auther name does not matches datbase ${req.params.auther}`})
    }
    return res.json({auther : getAuthers})
})

/*
Route            /a
description      to get a list of auther based on a book's isbn
access           public
parameter        isbn
method           get
*/

shapeAI.get("/a/:isbn", (req,res) => {
    const bookAuther = database.authers.filter((auther) => auther.books.includes(req.params.isbn));
    if (bookAuther.length===0){
        return res.json({ error: `no auther found for the book ${req.params.isbn} `})
    }
    return res.json({ auther: bookAuther})
})

/*
Route            /p
description      to get all publication
access           public
parameter        none
method           get
*/

shapeAI.get("/p", (req,res) => {
    return res.json({publications: database.publications})
})

/*
Route            /p/publications
description      to get all publication
access           public
parameter        name
method           get
*/
shapeAI.get("/p/publications/:name", (req,res) => {
    const getPublication =database.publications.filter((publication) => publication.name === req.params.name)
    if (getPublication.length === 0) {
        return res.json({ error: `publication with name ${req.params.name} `})
    }
    return res.json({ publication: getPublication})
})

/*
Route            /p/
description      to get a list of publications based on a book's isbn number
access           public
parameter        book
method           get
*/

shapeAI.get("/p/:name", (req,res) => {
    const bookPublication =database.publications.filter((publication) => publication.books.includes(req.params.name));
    if (bookPublication.length === 0) {
        return res.json({error: `no publication found for the book ${req.params.name}`});
    }
    return res.json({ book: bookPublication})
})

/*
Route            /book/new
description      to add new book
access           public
parameter        none
method           POST
*/

shapeAI.post("/book/new", (req,res) => {
    const { newBook } = req.body;
    database.books.push(newBook);
    return res.json({books: database.books, Message: "book was added!"});
});

/*
Route            /auther/new
description      to add new auther
access           public
parameter        none
method           POST
*/

shapeAI.post("/auther/new", (req,res) => {
    const { newAuther } = req.body;
    database.authers.push(newAuther);
    return res.json({auther: database.authers, Message: "auther was added!"});
});
/*
Route            /publication/new
description      to add new publication
access           public
parameter        none
method           POST
*/

shapeAI.post("/publication/new", (req,res) => {
    const { newPublication } = req.body;
    database.publications.push(newPublication);
    return res.json({auther: database.publications, Message: "publication was added!"});
});

/*
Route            /book/update
description      to update/miodify title of the book
access           public
parameter        isbn
method           PUT
*/

shapeAI.put("/book/update/:isbn", (req,res) =>{
database.books.forEach((book) => {
   if ( book.ISBN === req.params.isbn) {
    book.title = req.body.bookTitle;
    return;
   }
}) ;
return res.json({ books: database.books})
});

/*
Route            /book/auther/update/
description      to update/add new auther
access           public
parameter        isbn
method           PUT
*/

shapeAI.put("/book/auther/update/:isbn", (req,res) => {
    //update th book database
    database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
        return book.authers.push(req.body.newAuther);
    }
    });
    //update the auther database
    database.authers.forEach((auther) => {
        if (auther.id === req.body.newAuther){
            return auther.books.push(req.params.isbn)
        }
    });
    return res.json({books: database.books,
        authers: database.authers,
        Message: "the auther was added"
    })
});
shapeAI.listen(3000, () => console.log("server is running"));
//////////////////////////////do the task in requierments///////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////
////////////////////////////////////////////////


/*
Route            /publication/update/book
description      update/ add new book
access           public
parameter        isbn
method           PUT
*/

shapeAI.put("/publication/update/book/:isbn", (req,res) => {
    //update the publication data base
    database.publications.forEach((publication) => {
        if (publication.id === req.body.pubId) {
            return database.publications.books.push(req.params.isbn);
        }
    }); 

    //update the book database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn){
            book.publication = req.body.pubId;
            return;
        }
    });
    return res.json({ 
        books: database.books, 
        publications: database.publications,
        message: "succesfully updatred publication"
    });
});