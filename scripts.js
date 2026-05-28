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
    this.toggleRead = () => {
        if (this.read) {
            this.read = false;
            console.log(this.read);
            displayAllBooks();
        } else if (!this.read) {
            this.read = true;
            console.log(this.read);
            displayAllBooks();
        }
    }
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
        const bookID = book.id
        const libraryContainer = document.getElementById("container");
        const newCard = document.createElement("div");
        newCard.className = 'book-card';
        libraryContainer.appendChild(newCard);
        
        const newTitle = document.createElement("p");
        newTitle.className = "info"
        newTitle.textContent = ('"' + book.title + '"');
        newCard.appendChild(newTitle);

        const newAuthor = document.createElement("p");
        newAuthor.className = "info"
        newAuthor.textContent = (book.author);
        newCard.appendChild(newAuthor);

        const newPages = document.createElement("p");
        newPages.className = "info"
        newPages.textContent = (book.pagecount + " pages");
        newCard.appendChild(newPages);

        const read = document.createElement("button");
        if (book.read) {
            read.textContent = "Read"
            read.className = "read btn"
        } else if (!book.read) {
            read.textContent = "Unread"
            read.className = "unread btn"}
        newCard.appendChild(read);        
        read.addEventListener("click", () => toggleReadBook(bookID));

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Remove";
        deleteButton.className = "remove-book btn";
        deleteButton.id = book.id;
        newCard.appendChild(deleteButton);
        deleteButton.addEventListener("click", () => removeBook(deleteButton.id));

}
}

displayAllBooks();


const form = document.getElementById("input-form");
const modal = document.getElementById("input-modal");

form.addEventListener("submit", submitBook);

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
    modal.close();
}



function removeBook(UUID) {
    const targetBook = myLibrary.find(book => book.id === UUID)
    const index = myLibrary.indexOf(targetBook)
    myLibrary.splice(index, 1)
    displayAllBooks();
    
}

function toggleReadBook(UUID) {
    const targetBook = myLibrary.find(book => book.id === UUID)
    targetBook.toggleRead();
}
