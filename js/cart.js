const preloader = () => {
  const loding = document.getElementById('loading');
      loding.style.display = 'none';
  }
  

let bucketcount = document.getElementById("cart-item");
let bucket = JSON.parse(localStorage.getItem('data')) || [];
let checkout = document.getElementById('checkout');
let show = document.getElementById('showdata');
let totalprice = document.getElementsByClassName('total-price')[0];
console.log(totalprice);
const calculationcart = () => {

    let count = bucket.map((x) => x.itmecount).reduce((x, y) => x + y, 0)
  bucketcount.innerText = count;

 
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
        search.itmecount += 1;   
}
    update(item);
api();

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
api();
    
localStorage.setItem('data', JSON.stringify(bucket));

}
function update(id) {
    let item = id;
    let search = bucket.find((x) => x.itemid == item);
    // console.log(item);
    document.getElementById(id).innerText = search.itmecount;
    calculationcart();
  // totamamount();
}
function remove(id) {
  bucket = bucket.filter((x) => x.itemid != id);
  api();
  calculationcart();

  localStorage.setItem('data', JSON.stringify(bucket));
  console.log('remove');
}

let totamamount = (data) => {
  if (bucket.length !== 0) {
    console.log(data);
    let amount = bucket.map((x) => {
      let { itmecount, itemid } = x;
      let search = data.find((y) => y.id === itemid) || [];
      return itmecount * search.price;
    }).reduce((x, y) => x + y, 0);

    totalprice.innerText = amount;

  } else {
    totalprice.innerText = 0;

  };
}


async function api() {
  try {
    let raw =await fetch('js/data.json');
    let actdata = await raw.json();
    const genratedata = () => {
      totamamount(actdata);
      if (bucket.length != 0) {
          return (show.innerHTML = bucket.map((x) => {
              let search = actdata.find((item) => item.id == x.itemid) || [];
              let { id, name, price, img } = search;
            // console.log(amt += Number(price * x.itmecount));
            
            
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
        // totalprice.style.display = "none";
  }
  
  }
    return genratedata();
  
  } catch (error) {
    alert(`something is wrong from servir or json file ${error}`)
  }
  
  
  }
api();



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
