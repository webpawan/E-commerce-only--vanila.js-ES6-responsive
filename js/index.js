
let shop = document.getElementById('showdata');
let bucketcount = document.getElementById("cart-item");


let bucket = JSON.parse(localStorage.getItem('data')) ||[]

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

let genratedata = () => {
    return (shop.innerHTML = data.map((x) => {
        let { id, name, price, img } = x;
       
       let search =bucket.find((x)=>x.itemid == id);
        
        
        return `
        <div class="mx-auto col-md-6 mb-4 col-lg-4">
        <div class="featured-container p-5">
          <img
            src="${img}"
            class="img-fluid"
            alt=""
          />
          <a href="#" class="featured-store-link my-5"
            ><div
              class="d-flex justify-content-center align-items-center"
            >
              <span
                class="btn btn-outline-dark mx-1"
                onclick="decerement(${id})"
                ><i class="fa-solid fa-minus"></i
              ></span>
              <span class="btn btn-outline-dark mx-1" id="${id}">${search == undefined ? 0 : search.itmecount}</span>
              <span
                class="btn btn-outline-dark mx-1"
                onclick="increment(${id})"
                ><i class="fa-solid fa-plus"></i
              ></span>
            </div>
          </a>
        </div>
        <h6 class="text-capitalize text-center my-2">${name}</h6>
        <h6 class="text-center">
          <span class="">${price}</span>
        </h6>
      </div>
        `
   }).join(""))
}

genratedata();




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
localStorage.setItem('data', JSON.stringify(bucket));

}


function update(id) {
    let item = id;
    let search = bucket.find((x) => x.itemid == item);
    // console.log(item);
    document.getElementById(id).innerText = search.itmecount;
    calculationcart();
}

const calculationcart = () => {
    let count = bucket.map((x) => x.itmecount).reduce((x, y) => x + y, 0)
    bucketcount.innerText = count
}

calculationcart();


