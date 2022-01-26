
const searchBook = () => {
    const input = document.getElementById('name');
    const inputValue = input.value;
    // console.log(inputValue);
    input.value = '';

    if(inputValue !== null){
        const url = `https://openlibrary.org/search.json?q=${inputValue}`;
        // console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => displayBooks(data));
    }

};




// display books 
const displayBooks = data => {
    // console.log(books);
    const books = data.docs;

    // Total books found 
    const totalBooks = document.getElementById('total-books');
    totalBooks.innerText = books.length;

    // Display books 
    const parent = document.getElementById('books');
    parent.textContent = '';

    if(data.numFound === 0){
        parent.innerHTML = `
            <p>No results found!</p>
        `;

        
        loading.style.display = 'none';

    }else{
        books.forEach(book => {
            // console.log(book);
            
            
            const card = document.createElement('div');
            card.classList.add('card');
    
            card.innerHTML = `
                <h3>Book Name: ${book.title} </h3>
                <p>Author: ${checkData(book.author_name)} </p>
                <p>Publisher: ${checkData(book.publisher)} </p>
                <p>Published in: ${checkData(book.publish_year)} </p>
                <p>First Published: ${book.first_publish_year} </p>
            `;
    
            parent.appendChild(card);
        
        });
    }
    

};


const checkData = data => {
    if(data !== undefined ){
        return data.join(" , ");
    }else{
        return "Unknown";
    }
}