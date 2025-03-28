const books = [
  { 
	  title: "React Billionaire", 
	  pages: 250, 
	  author: {
		  name: 'Alice',
		  age: 35
	  },
	  available: false,
	  price: '101€',
	  tags: ['advanced', 'js', 'react', 'senior']
  },
  { 
	  title: "Advanced JS", 
	  pages: 500, 
	  author: {
		  name: 'Bob',
		  age: 20
	  },
	  available: true,
	  price: '25€',
	  tags: ['advanced', 'js', 'mid-senior']
  },
  { 
	  title: "CSS Secrets", 
	  pages: 320, 
	  author: {
		  name: 'Alice',
		  age: 17
	  },
	  available: true,
	  price: '8€',
	  tags: ['html', 'css', 'junior']
  },
  { 
	  title: "HTML Mastery", 
	  pages: 200, 
	  author: {
		  name: 'Charlie',
		  age: 50
	  },
	  available: false,
	  price: '48€',
	  tags: ['html', 'advanced', 'junior', 'mid-senior']
  },
];

//Snack 1

const longBooks = books.filter(book => book.pages > 300)
const longBooksTitles= longBooks.map(book => book.title)

console.log(longBooks, longBooksTitles);


//Snack 2

const availableBooks = books.filter(book => book.available === true)

const discountedBooks = books.filter(book => book.available === true).map(book => {
  return {...book, price : (parseInt(book.price) * 0.8)}})

const fullPricedBook = discountedBooks.find(book => book.price % 1 === 0)

console.log(availableBooks)
console.log(discountedBooks)
console.log(fullPricedBook);

;

//Snack 3
const authors = books.map(book => book.author )

const areAuthorsAdults = books.every(book => book.author.age >= 18);

authors.sort((a,b) => {
   return b.age - a.age
})

console.log(authors, areAuthorsAdults);

//Snack 4
const ages = authors.map(author => author.age)
const agesSum = ages.reduce((acc, age)=> {
  return acc + age
}
,0)
const mediaEtà = agesSum / ages.length

console.log(ages);
console.log(agesSum);
console.log(mediaEtà);

//Snack 5
/*
Usando la l'API https://boolean-spec-frontend.vercel.app/freetestapi/books/{id} usa la combinazione di .map() e Promise.all(), per creare una funzione (getBooks) che a partire da un array di id (ids), ritorna una promise che risolve un array di libri (books).
Testala con l’array [2, 13, 7, 21, 19] .
*/

async function fetchJson(url){
  const response = await fetch(url)
  const obj = await response.json();
  return obj
}

async function getBooks(ids){
  try{
    console.log(`Caricando i dati...`);
    const promises = ids.map(id => fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/books/${id}`)) 

    const books = await Promise.all(promises)

    return books
  }
  catch{
    throw new Error("Errore nel recupero dei dati: " + error.message);
  }
}

(async () => {
  const ids = [2, 13, 7, 21, 19];
  try {
    const books = await getBooks(ids);
    console.log("Libri recuperati:", books);
  } catch (error) {
    console.error(error.message);
  }
})();

