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
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    };
    
    dataPro.push(product);
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
                <th><button id="update">Update</button></th>
                <th><button id="delete">Delete</button></th>
            </tr>
        `;
    };
    document.getElementById('tbody').innerHTML = table;
}
readData ();
