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
submit.onclick = function () {
    let dataPro;

    if (localStorage.product != null) {
        dataPro = JSON.parse(localStorage.product);
    } else {
        dataPro = [];
    };

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
}