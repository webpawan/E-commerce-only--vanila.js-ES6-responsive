let bucket = JSON.parse(localStorage.getItem('data')) || [];
let bucketcount = document.getElementById("cart-item");
const data = [
    {
        id: 1,
        name: 'shoes1',
        price: '120',
        img: '/img/img-1.webp'
    },
    
    {
        id: 2,
        name: 'shoes1',
        price: '120',
        img: '/img/img-2.webp'
    },
    
    {
        id: 3,
        name: 'shoes1',
        price: '120',
        img: 'img/img-3.webp'
    },
    
    {
        id: 4,
        name: 'shoes1',
        price: '120',
        img: 'img/img-4.webp'
    },
    {
        id: 5,
        name: 'shoes1',
        price: '120',
        img: 'img/img-5.jpg'
    },
    {
        id: 6,
        name: 'shoes1',
        price: '120',
    img:'img/img-6.webp'},


]
let show = document.getElementById('showdata');

const calculationcart = () => {
    let count = bucket.map((x) => x.itmecount).reduce((x, y) => x + y, 0)
    bucketcount.innerText = count
}
calculationcart();

const genrateitem = () => {
    
    return (show.innerHTML = data.map((x) => {
        let { id, name, price, img } = x;
        return ` <div class="col-10 mx-auto col-md-6 mb-4 col-lg-4" >
        <div class="featured-container p-5" id="product-id-${id}">
          <img src="${img}" class="img-fluid" alt="" />
          <div class="featured-store-link my-5" onclick="increment(${id})" >add to cart</div>
        </div>
        <h6 class="text-capitalize text-center my-2">${name}</h6>
        <h6 class="text-center">
          <span class="old-price">$200</span>
          <span class="">${price}</span>
        </h6>
      </div>`

    }).join(''))


}



function increment(id) {
    let item = id;
   
    let search = bucket.find((x) => x.itemid == item);
    if (search == undefined) {
        bucket.push({
            itmecount: 1,
            itemid: item,
        })
    
    } else {
        alert("this item is already added on your cart");
}
   

calculationcart();

    localStorage.setItem('data', JSON.stringify(bucket));

    genrateitem();
}


genrateitem();