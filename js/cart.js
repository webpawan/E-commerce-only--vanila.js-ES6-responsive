let bucketcount = document.getElementById("cart-item");
let bucket = JSON.parse(localStorage.getItem('data')) || [];
let checkout = document.getElementById('checkout');

let show = document.getElementById('showdata');
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
    img:'img/img-4.webp'}


]
const calculationcart = () => {
    let count = bucket.map((x) => x.itmecount).reduce((x, y) => x + y, 0)
    bucketcount.innerText = count
}
calculationcart();



const genratedata = () => {
    
    if (bucket.length != 0) {
        return (show.innerHTML = bucket.map((x) => {
            let search = data.find((item) => item.id == x.itemid) || [];
            let { id, name, price, img } = search;
          
        return `
        <div class="row my-3 align-items-center">
        <div class="col-10 mx-auto col-md-2 cart-img">
          <img
            src="${img}"
            class="img-fluid"
            alt=""
          />
          <button class="btn btn-outline-danger cart-btn" onclick="remove(${x.itemid})">
          <i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="col-10 mx-auto col-md-2">
          <p id="product-name">${name}</p>
        </div>
        <div class="col-10 mx-auto col-md-2">
          <p>${price}</p>
        </div>
        <div class="col-10 mx-auto col-md-2">
          <div class="d-flex justify-content-center align-items-center">
            <span
              class="btn btn-outline-dark mx-1"
              onclick="decerement(${id})"
              ><i class="fa-solid fa-minus"></i
            ></span>
            <span class="btn btn-outline-dark mx-1" id="${id}">${x.itmecount}</span>
            <span
              class="btn btn-outline-dark mx-1"
              onclick="increment(${id})"
              ><i class="fa-solid fa-plus"></i
            ></span>
          </div>
        </div>
        <div class="col-10 mx-auto col-md-2">
          <p>${price*x.itmecount}</p>
        </div>
      </div>

        `
        
}).join(""))
    } else {
            
      show.innerHTML = `<h1>CART IS EMPTY NOW</h1>`;
      checkout.style.display = "none";
        
}

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
        search.itmecount += 1;   
}
    update(item);
genratedata();

    localStorage.setItem('data', JSON.stringify(bucket));

}

function decerement(id) {
    
    let item = id;
    let search = bucket.find((x) => x.itemid == item);


    if (search == undefined) return;
    else if (search.itmecount == 0) { 
        return;
    } else {
        search.itmecount -= 1;   
    }
    
    update(item);
    bucket = bucket.filter((x) => x.itmecount != 0);
genratedata();
    
localStorage.setItem('data', JSON.stringify(bucket));

}


function update(id) {
    let item = id;
    let search = bucket.find((x) => x.itemid == item);
    // console.log(item);
    document.getElementById(id).innerText = search.itmecount;
    calculationcart();
    
}

function remove(id) {
  bucket = bucket.filter((x) => x.itemid != id);
  genratedata();
  calculationcart();

  localStorage.setItem('data', JSON.stringify(bucket));
  console.log('remove');
}


genratedata();
