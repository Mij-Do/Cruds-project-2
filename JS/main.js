// calling elements from html

let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create'; 
let tmp; // glopal variable
// get total
function getTotal () {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = '#080';
    } else {
        total.innerHTML = '';
        total.style.backgroundColor = '#4e0909';
    }
}

// Creat product
let dataPro;

if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
} else {
    dataPro = [];
};
submit.addEventListener('click',  function () {

    let product = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };

    if (title.value != '' && price.value != '' && category.value != '') {
        if (mood === 'create') {
            // count function
            if (product.count > 1) {
                for (let i = 0; i < product.count; i++) {
                    dataPro.push(product);
                }
            } else {
                dataPro.push(product);
            };
        } else {
            dataPro[tmp] = product;
            mood = 'create';
            count.style.display = 'block';
            submit.innerHTML = 'Create';
        }
    
    } else {
        clearData ();
    }
    localStorage.setItem('product', JSON.stringify(dataPro)); 
    
    
    // clear data func
    clearData ();
    getTotal ();
    // Read data
    readData ();
});

// clear data from inputs 
function clearData () {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
// Read function
function readData () {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
            <tr>
                <th>${i + 1}</th>
                <th>${dataPro[i].title}</th>
                <th>${dataPro[i].price}</th>
                <th>${dataPro[i].taxes}</th>
                <th>${dataPro[i].ads}</th>
                <th>${dataPro[i].discount}</th>
                <th>${dataPro[i].total}</th>
                <th>${dataPro[i].category}</th>
                <th><button onclick="updateData (${i})" id="update">Update</button></th>
                <th><button onclick="deleteItem (${i})" id="delete">Delete</button></th>
            </tr>
        `;
    };
    document.getElementById('tbody').innerHTML = table;

    // delete condition
    let deleteDiv = document.getElementById('deleteDiv');
    if (dataPro.length > 0) {
        deleteDiv.innerHTML = `<button onclick="deleteAll ()">Delete All(${dataPro.length})</button>`;
    } else {
        deleteDiv.innerHTML = '';
    }
}
readData ();

// delete function
// delete all
function deleteAll () {
    dataPro.splice(0);
    localStorage.clear();
    readData ();
};

// delete 1 item
function deleteItem (i) {
    dataPro.splice(i, 1); 
    localStorage.product = JSON.stringify(dataPro); // update data on local storage after delete items
    readData (); 
};

// update 
function updateData (i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataPro[i].category;
    mood = 'update'
    submit.innerHTML = 'Update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth',
    });
};

// search 
let search = document.getElementById('search');
function searchFunc (id) {
    let searchMood = 'title';
    if (id === 'searchTitle') {
        searchMood = 'title';
        search.placeholder = 'Search By Title';
    } else {
        searchMood = 'category';
        search.placeholder = 'Search By Category';
    }
    search.style.display = 'block';
    search.focus();
    readData();
    search.value = '';
};

function searchData (value) {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        if (dataPro[i].title.includes(value.toLowerCase())) {
            table += `
                <tr>
                    <th>${i + 1}</th>
                    <th>${dataPro[i].title}</th>
                    <th>${dataPro[i].price}</th>
                    <th>${dataPro[i].taxes}</th>
                    <th>${dataPro[i].ads}</th>
                    <th>${dataPro[i].discount}</th>
                    <th>${dataPro[i].total}</th>
                    <th>${dataPro[i].category}</th>
                    <th><button onclick="updateData (${i})" id="update">Update</button></th>
                    <th><button onclick="deleteItem (${i})" id="delete">Delete</button></th>
                </tr>
            `;
        } else if (dataPro[i].category.includes(value.toLowerCase())) {
            table += `
                <tr>
                    <th>${i + 1}</th>
                    <th>${dataPro[i].title}</th>
                    <th>${dataPro[i].price}</th>
                    <th>${dataPro[i].taxes}</th>
                    <th>${dataPro[i].ads}</th>
                    <th>${dataPro[i].discount}</th>
                    <th>${dataPro[i].total}</th>
                    <th>${dataPro[i].category}</th>
                    <th><button onclick="updateData (${i})" id="update">Update</button></th>
                    <th><button onclick="deleteItem (${i})" id="delete">Delete</button></th>
                </tr>
            `;
        };
        document.getElementById('tbody').innerHTML = table;
    };
};

