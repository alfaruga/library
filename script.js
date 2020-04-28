let myLibrary = [//This are the default values to make the library look 'not ugly'
    {Title: "Principios de análisis instrumental", 
    Author: "Skoog, Holler & Nieman",
    Year: 2001, 
    Pages: 1028, 
    read: true}, 
    {Title: "Principios de fisicoquímica", 
    Author: "Ira N. Levine", 
    Year: 2014, 
    Pages: 571, 
    read: true}, 
    {Title: "Fundamentos de química analítica", 
    Author: "Skoog, West, Holler & Crouch", 
    Year: 2005, 
    Pages: 1065, 
    read: true}, 
    {Title: "Química orgánica", 
    Author: "A. Streitwieser & C.H. Heathcock", 
    Year: 1990, 
    Pages: 1297, 
    read: true}, 
    {Title: "Fisicoquímica",
    Author: "Gilbert W. Castellan", 
    Year: 1987, Pages: 1057, 
    read: true}, 
    {Title: "Don quijote de la mancha (edición conmemorativa IV centenario de Cervantes)", 
    Author: "Real Academia española", 
    Year: 2015, 
    Pages: 1249, 
    read: true}, 
    {Title: "Los hermanos Karamázov", 
    Author: "Fiodor Dostoievski", 
    Year: 1880, 
    Pages: 607, 
    read: true}];
class Book {
    constructor (title, author, year, pages){
    this.Title = title,
    this.Author =  author,
    this.Year = year,
    this.Pages = pages;
    this.read = true;
    }
}
function addBookToLibrary (title, author, year, pages){
    let newBook = new Book(title, author, year, pages);
    myLibrary.push(newBook);
}
function loadLocalStorage(){
    if(localStorage.getItem('myLibrary')){
        let recoveredData = localStorage.getItem('myLibrary');
        myLibrary = JSON.parse(recoveredData);
        render(myLibrary);
    } else {
        localStorage.setItem('myLibrary' ,(JSON.stringify(myLibrary)));
        render(myLibrary);
    }
}
function updateLocalStorage(){
    localStorage.setItem('myLibrary', (JSON.stringify(myLibrary)));
}
function render (arr){
    let tbody = document.getElementById('booksTable').getElementsByTagName('tbody')[0]
        for(let i = 0; i<arr.length; i++){
            let tbodyRow = tbody.insertRow();
            tbodyRow.setAttribute('id', `${i}`)
        for (let prop in arr[i]){
            if(prop=='read'){
                break
            }
            else{
            let cellForPorp = tbodyRow.insertCell(-1)
            let textFromProp = document.createTextNode(`${arr[i][prop]}`)
            cellForPorp.appendChild(textFromProp);
        }
        }
        let cellForReadBut = tbodyRow.insertCell(-1);
        let readStatus = document.createElement('div');
        readStatus.setAttribute('id', `book${i}`)
        readStatus.setAttribute('style', 'display: inline-block');
        readStatus.innerHTML = document.getElementById('readButton').innerHTML
        cellForReadBut.appendChild(readStatus);
        let buttonCell = tbodyRow.insertCell(-1);
        let cellForDelBut = document.createElement('div');
        cellForDelBut.setAttribute('id', `${i}`);
        cellForDelBut.setAttribute('style', 'display: inline-block');
        cellForDelBut.innerHTML =  document.getElementById('buttonBlock').innerHTML;       
        buttonCell.appendChild(cellForDelBut);       
    }
}
//even listeners to the add and cancel buttona, scape key, the submit event in the form;
addBook.addEventListener('click', (e) => {
    let form = document.querySelector('#formContainer');
    form.classList.toggle('formShowed')
});
window.addEventListener('keydown', (e)=>{
    if(e.key==='Escape'){ 
        let form = document.querySelector('#formContainer');
        form.classList.remove('formShowed')
    }
})
cancel.addEventListener('click',(e) => {
    let form = document.querySelector('#formContainer');
    form.classList.remove('formShowed')
})
formContainer.addEventListener('submit', (e) =>{
    alert('after making book data');
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value || 'Unknown author';
    const year = document.getElementById('year').value || '-';
    const pages = document.getElementById('pages').value || '-';
    addBookToLibrary(title, author, year, pages);
    alert('after adding book');
    updateLocalStorage();
    alert('hello');
})
loadLocalStorage();
let readButts = document.querySelectorAll('.notReadYet, .read');
readStatusReloadPage();
let allDeleteButtons = document.querySelectorAll('.deleteButt');
console.log(allDeleteButtons);

allDeleteButtons.forEach(item => {
    item.addEventListener('click', (e) => {
        let bookTableIndex = item.parentElement.id;
        if(confirm(`You're about to delete this book, this action can't be undone
        do you want to continue?` )&&(prompt('Type the title of the book you want to delete')==myLibrary[bookTableIndex].Title)){
        myLibrary.splice(bookTableIndex, 1);
        updateLocalStorage();
        location.reload();}     
    })
  });
  function buttonClassUpdater(butt){
    let bookId = butt.parentElement.parentElement.parentElement.parentElement.id;
    let bookReadStatus = myLibrary[bookId].read;
    if(bookReadStatus==true){
        butt.classList.remove('read')
        butt.classList.add('notReadYet')
        butt.value = 'Not read yet';        
    } else {
        butt.classList.remove('notReadYet');
        butt.classList.add('read');
        butt.value = 'Already Read';
    }
    return bookReadStatus;
  }
  function readStatusReloadPage(){
      readButts.forEach((butt)=> {
        buttonClassUpdater(butt)
      }) 
  }
    readButts.forEach((butt)=>{
        butt.addEventListener('click', (e)=>{
            buttonClassUpdater(butt);
            let bookId = butt.parentElement.parentElement.parentElement.parentElement.id;
            let bookReadStatus = myLibrary[bookId].read;
            console.log(bookId, bookReadStatus)
            myLibrary[bookId].read = !(bookReadStatus);
            updateLocalStorage();
            location.reload();        
        })
    })