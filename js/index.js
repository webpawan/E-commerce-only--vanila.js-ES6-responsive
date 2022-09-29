const preloader = () => {
  const loding = document.getElementById('loading');
      loding.style.display = 'none';
  }
  

let shop = document.getElementById('showdata');
let bucketcount = document.getElementById("cart-item");
let bucket = JSON.parse(localStorage.getItem('data')) || [];
let input = document.getElementById('search-input');

const calculationcart = () => {
  let count = bucket.map((x) => x.itmecount).reduce((x, y) => x + y, 0)
  bucketcount.innerText = count
}
function update(id) {
  let item = id;
  let search = bucket.find((x) => x.itemid == item);
  // console.log(item);
  document.getElementById(id).innerText = search.itmecount;
  calculationcart();
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
    localStorage.setItem('data', JSON.stringify(bucket));

}
function decerement(id) {
    
    let item = id;
    let search = bucket.find((x) => x.itemid == item);
    if (search == undefined) return;
    else if (search.itmecount ===0) { 
        return;
    } else {
        search.itmecount -= 1;   
}
  update(item);
  bucket = bucket.filter((x) => x.itmecount != 0);
localStorage.setItem('data', JSON.stringify(bucket));

}


async function mydata() {
  try {
    let data = await fetch('js/data.json');
    let mydata = await data.json();
    let apidata = mydata;
    filtercat(apidata);
  } catch (error) {
   alert('maybe data not fatch please refresh the page')
  }
}
mydata();

// filter by categories
let filtercat = (apidata) => {

  let showoutput = document.getElementsByClassName('products-categories-link');




  for (let i = 0; i < showoutput.length; i++){
    showoutput[i].addEventListener('click', () => {

      // add active class and remove------------
      for (let i = 0; i < showoutput.length; i++) {
        showoutput[i].classList.remove('active');
       }
       showoutput[i].classList.add('active')
//  --------------------------
      
      
      let val = showoutput[i].innerText;
      if (val == "Football") {
        let mydata = apidata.filter((ele) => ele.cat == 'ball');
        
        showwindowdata(mydata);
        filterbycolor(mydata);
        filterbyprice(mydata);
        searchfilter(mydata)
        
      } else if (val == "Sport") {
        
        let mydata = apidata.filter((ele) => ele.cat == 'spo');
        showwindowdata(mydata);
        filterbycolor(mydata);
  filterbyprice(mydata);
  searchfilter(mydata)
        

      } else if (val == 'Sneaker') {
        let mydata = apidata.filter((ele) => ele.cat == 'sneakers');
        showwindowdata(mydata);
        filterbycolor(mydata);
  filterbyprice(mydata);
        searchfilter(mydata);
        

      } else {
        showwindowdata(apidata);
        filterbycolor(apidata);
   

      }

      
   
     

    })
  }

  

  showwindowdata(apidata);
  filterbycolor(apidata);
  filterbyprice(apidata);
searchfilter(apidata);

}
//  filter by color 
const filterbycolor = (mydata) => {
  
  
  let color = document.getElementsByClassName('colors-cat');
  


    for (let i = 0; i < color.length; i++){
      color[i].addEventListener('click', () => {

for (let i = 0; i < color.length; i++) {
  color[i].classList.remove('active');
}
color[i].classList.add('active')
        let val = color[i].innerText.trim();
        if (val == 'White') {
          let newmydata = mydata.filter((ele) => ele.color == 'white');
          showwindowdata(newmydata);
          filterbyprice(newmydata);
        searchfilter(newmydata);
          
        } else if (val == 'Black') {
          let newmydata = mydata.filter((ele) => ele.color == 'black');
          showwindowdata(newmydata);
          filterbyprice(newmydata);
        searchfilter(newmydata);
          
    
        } else if (val == 'Blue') {
         let  newmydata = mydata.filter((ele) => ele.color == 'blue');
          showwindowdata(newmydata);
          filterbyprice(newmydata);
        searchfilter(newmydata);
          
    
        } else  if (val == 'Green'){
          let newmydata = mydata.filter((ele) => ele.color == 'green');
          showwindowdata(newmydata);
          filterbyprice(newmydata);
        searchfilter(newmydata);
          
    
        }else  if (val == 'Orange'){
          let newmydata = mydata.filter((ele) => ele.color == 'orange');
          showwindowdata(newmydata);
          filterbyprice(newmydata);
        searchfilter(newmydata);
          
    
        } else {
          showwindowdata(mydata);
        }
    })
    
      }

      // filterbyprice(mydata);
      // searchfilter(mydata);

  
}
// filter by price 
const filterbyprice = (mydata) => {
  
  let rangefilter = document.getElementById('price-range');
  let showval = document.getElementById('range');
  
  // let maxprice = mydata.map((ele) => ele.price);
  // i put all array value in Math.max function 
  let maxprice = 0;
  let minprice =Number. MAX_VALUE;

  for (let i = 0; i < mydata.length; i++){
    maxprice = Math.max(mydata[i].price, maxprice);
    minprice = Math.min(mydata[i].price, minprice);
 
  }

  rangefilter.min = minprice;
  rangefilter.max = maxprice;
  rangefilter.value = maxprice;
  showval.innerText = `range: ${maxprice}`
  

  rangefilter.addEventListener('input', () => {
   let val = parseInt(rangefilter.value);
    showval.textContent = `range : ${val}`;
    let newmydata = mydata.filter((product) => product.price <= val);
    showwindowdata(newmydata);
    searchfilter(newmydata);

  })


}
// filter by search 
const searchfilter = (apidata) => {
  
  input.addEventListener('input', (e) => {
    e.preventDefault()
    let val = input.value.toUpperCase();
    let newdata = [];
    for (let i = 0; i < apidata.length; i++) {
      if (apidata[i].name.toUpperCase().includes(val)) {
        newdata.push(apidata[i]);
    }
    
   }
showwindowdata(newdata)
  })

}
// show dynamic data 
const showwindowdata = (mydata) => {
  
  return (shop.innerHTML = mydata.map((x) => {
    let { id, name, price, img } = x;
    let search = bucket.find((x) => x.itemid == id);
    return `
  <div class="mx-auto col-md-6 mb-4 col-lg-4 ">
  <div class="featured-container p-3 p-lg-4">
    <img
      src="${img}"
    class="img-fluid"
      alt=""
    />
    <div class="featured-store-link my-5"
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
    </div>
   </div>
   <h6 class="text-capitalize text-center my-2">name : ${name}</h6>
   <h6 class="text-center">
     <span class="">price: ${price} &#8377; </span>
   </h6>

   
 </div>
 
  `

  }).join(""))

  
}
calculationcart();



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
