
const preloader = () => {
const loding = document.getElementById('loading');
    loding.style.display = 'none';
}



let bucket = JSON.parse(localStorage.getItem('data')) || [];
let bucketcount = document.getElementById("cart-item");
let show = document.getElementById('showdata');
const calculationcart = () => {
    let count = bucket.map((x) => x.itmecount).reduce((x, y) => x + y, 0)
    bucketcount.innerText = count
}
calculationcart();


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

   
    getdata();
}

async function getdata() {
    
try {
    
    let rawdata =await fetch("js/data.json");
    let data = await rawdata.json();
    let showapidata = data.slice(0, 6);


    const genrateitem = () => {
    
        return (show.innerHTML = showapidata.map((x) => {
            let { id, name, price, img } = x;
            return ` <div class="col-10 mx-auto col-md-6 mb-4 col-lg-4" >
            <div class="featured-container p-3 p-lg-4" id="product-id-${id}">
              <img src="${img}" class="img-fluid" alt="" />
              <div class="featured-store-link my-5" onclick="increment(${id})" >add to cart</div>
            </div>
            <h6 class="text-capitalize text-center my-2">name : ${name}</h6>
            <h6 class="text-center">
              <span class="">price : ${price} &#8377;</span>
            </h6>
          </div>`
    
        }).join(''))
    
    
    }

    return genrateitem();




} catch (error) {
    alert(`something is wrong from server ${erro}`)
}
  

}
getdata();



// ----------------
let openform = document.getElementsByClassName('user-login')[0];
openform.addEventListener('click', () => {
    let formdata = document.getElementById('form-data');
    formdata.classList.remove('d-none');
})

let cross = document.getElementById('cross');

cross.addEventListener('click', () => {
    let containerform = document.getElementById('form-data');
   containerform.classList.add('d-none')
})


