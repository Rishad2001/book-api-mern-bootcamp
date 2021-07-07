//for security pupose ->needed in top before express -> npm dotenv
require("dotenv").config();

//frame work
const express =require("express");
//frame work for mongoose
const mongoose = require("mongoose");
//intializing
const shapeAI =express();

//database
const database = require("./database/index")

//modals
const BookModal = require("./database/book");
const AutherModal = require("./database/auther");
const PublicationModal = require("./database/publication");
const BookModel = require("./database/book");

//configering
shapeAI.use(express.json());

//establish database connection
mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    }
)
.then(() => console.log("connection established!!!!!!!"));

/*
Route            /
description      get all books
access           public
parameter        none
method           get
*/

//mongoDB is asynchronus always use asyn await
shapeAI.get("/", async (req,res) =>{
    const getAllBooks = await BookModel.find()
    return res.json({ getAllBooks})
});

/*
Route            /
description      to get specific book based on ISBN
access           public
parameter        isbn
method           get
*/

shapeAI.get("/is/:isbn", async (req,res)=> {
    const getSpecificBook = await BookModal.findOne({ISBN: req.params.isbn}) //ISBN is accorrding to schema 
    //const getSpecificBook = database.books.filter((book) =>book.ISBN === req.params.isbn);

    if (!getSpecificBook) {
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
shapeAI.get("/c/:category",async (req,res) => {
    const getSpecificBooks = await BookModal.findOne({category: req.params.category})
   // const getSpecificBooks = database.books.filter((book) => book.category.includes(req.params.category))
    if (!getSpecificBooks) {
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

shapeAI.get("/a", async (req,res) => {
    const getAllAuther = await AutherModal.find();
    return res.json({ authers: getAllAuther})
})

/*
Route            /a/auther
description      to get specific auther
access           public
parameter        auther
method           get
*/
shapeAI.get("/a/auther/:auther", async (req,res) =>{
    const getSpecificAuther = await AutherModal.findOne({name: req.params.auther})
    //const getAuthers = database.authers.filter((auther) =>auther.name === req.params.auther)
    if (!getSpecificAuther){
        return res.json({error: `auther name does not matches datbase ${req.params.auther}`})
    }
    return res.json({auther : getSpecificAuther})
})

/*
Route            /a
description      to get a list of auther based on a book's isbn
access           public
parameter        isbn
method           get
*/

shapeAI.get("/a/:isbn", async (req,res) => {
     const getAutherBasedBook = await AutherModal.find({books: req.params.isbn})
    //const bookAuther = database.authers.filter((auther) => auther.books.includes(req.params.isbn));
    if (!getAutherBasedBook){
        return res.json({ error: `no auther found for the book ${req.params.isbn} `})
    }
    return res.json({getAutherBasedBook})
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

shapeAI.post("/book/new", async (req,res) => {
    const { newBook } = req.body;
    const addNewBook = BookModel.create(newBook)
   // database.books.push(newBook);
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
    
    AutherModal.create(newAuther)

    //database.authers.push(newAuther);
    return res.json({ Message: "auther was added!"});
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

    PublicationModal.create(newPublication)

    //database.publications.push(newPublication);
    return res.json({ Message: "publication was added!"});
});

/*
Route            /book/update
description      to update/miodify title of the book
access           public
parameter        isbn
method           PUT
*/

shapeAI.put("/book/update/:isbn", async (req,res) =>{

    const updatedBook = await BookModal.findOneAndUpdate({
        ISBN: req.params.isbn
    },
    {
        title: req.body.bookTitle,
    },
    {
        new: true, //to get new updated data
    }
    )
//database.books.forEach((book) => {
   //if ( book.ISBN === req.params.isbn) {
    //book.title = req.body.bookTitle;
    //return;
  // }
//}) ;
return res.json({ books: updatedBook})
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

/////////////////////////////do the task in requierments///////////////////////////////////////
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

/*
Route            /book/delete/
description      delete a book
access           public
parameter        isbn
method           DELETE
*/
shapeAI.delete("/book/delete/:isbn", (req,res) => {
    const udatedBookDatabase =database.books.filter(
        (book) =>  book.ISBN !== req.params.isbn
    );
    database.books =  udatedBookDatabase;
    return res.json({ books: database.books});
});

/*
Route            /book/delete/auther
description      delete a author from a book
access           public
parameter        isbn,autherId
method           DELETE
*/

shapeAI.delete("/book/delete/auther/:isbn/:autherId", (req,res) => {
    //update the book database -> here forEach is used because wew are not modifying whole database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            const newAutherList = book.authers.filter(
                (auther) => auther !== parseInt(req.params.autherId)
            );
            book.authers = newAutherList;
            return;
        }
    });

    // update the auther database
    database.authers.forEach((auther) => {
        if (auther.id === parseInt(req.params.autherId)) {
            const newBooksList = auther.books.filter(
                (book) => book !== req.params.isbn
            );
            auther.books = newBooksList;
            return;
        }
    });
    return res.json({ 
        message:"auther was deleted",
        book: database.books,
        auther: database.authers,
        message:"auther was deleted",
    })
});


/*
Route            publication/delete/book
description      delete a book from publication
access           public
parameter        isbn,pubId
method           DELETE
*/

shapeAI.delete("/publication/delete/book/:isbn/:pubId", (req,res) => {
    // update publication database
    database.publications.forEach((publication) => {
        if (publication.id === parseInt(req.params.pubId)) {
            const newBooksList = publication.books.filter(
                (book) => book !== req.params.isbn);

                publication.books = newBooksList;
                return;
        }
    });

    // update book database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.publication = 0;//means no publication available
            return;
        }
    });
    return res.json({ 
        books: database.books,
        publication: database.publications,
        message:"deleted a book from publication"
    })
});

shapeAI.listen(3000, () => console.log("server is running"));


//talk to mongodb in which mongodb in which mongodb understands =>*******
//talkto us in the way we understand => javascript

//mongoose model

//model -> document model of mongoDB

//schema-> model ->use them