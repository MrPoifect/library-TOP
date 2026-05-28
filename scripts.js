const myLibrary = [];

function Book(title, author, pagecount, read, uuid) {
    if (!new.target){
        throw Error("You must use the 'new' Operator")
    }
    this.title = title;
    this.author = author;
    this.pagecount = pagecount;
    this.read = read;
    this.id = uuid;
}

function addBookToLibrary(title, author, pagecount, read) {
    const UUID = crypto.randomUUID()
    myLibrary.push(new Book(title, author, pagecount, read, UUID))
}


addBookToLibrary("The Bible", "God", "Infinite", true);
addBookToLibrary("The Bible 2", "Jesus", "4", false)

function displayAllBooks() {
    document.getElementById("container").innerHTML = '';
    for (book of myLibrary) {
        console.log(book);
        const libraryContainer = document.getElementById("container");
        const newCard = document.createElement("div");
        newCard.className = 'book-card';
        libraryContainer.appendChild(newCard);
        
        const newTitle = document.createElement("p");
        newTitle.textContent = ("Title: " + book.title);
        newCard.appendChild(newTitle);

        const newAuthor = document.createElement("p");
        newAuthor.textContent = ("Author: " + book.author);
        newCard.appendChild(newAuthor);

        const newPages = document.createElement("p");
        newPages.textContent = ("Page Count: " + book.pagecount);
        newCard.appendChild(newPages);

        const beenRead = document.createElement("p");
        beenRead.textContent = ("Read:" + book.read);
        newCard.appendChild(beenRead)
        
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Remove book";
        deleteButton.className = "remove-book";
        deleteButton.id = book.id;
        newCard.appendChild(deleteButton);
        deleteButton.addEventListener("click", () => removeBook(deleteButton.id));

}
}

displayAllBooks();


document.getElementById("input-form").addEventListener("submit", submitBook);

function submitBook(e) {
    e.preventDefault();

    const title = document.getElementById("input-form").elements['booktitle'].value;
    const author = document.getElementById("input-form").elements['bookauthor'].value;
    const pagecount = document.getElementById("input-form").elements['pagecount'].value;
    let read = false
    if (document.getElementById("read").checked) {
        read = true;
    }

    console.log(title);
    console.log(author);
    console.log(pagecount);

    addBookToLibrary(title, author, pagecount, read);
    displayAllBooks();
}



function removeBook(UUID) {
    const targetBook = myLibrary.find(book => book.id === UUID)
    const index = myLibrary.indexOf(targetBook)
    myLibrary.splice(index, 1)
    displayAllBooks();
    
}
