
let shop = document.getElementById('showdata');
let bucketcount = document.getElementById("cart-item");
let bucket = JSON.parse(localStorage.getItem('data')) || [];
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
    genratedata(apidata);
  } catch (error) {
    console.log("data not fatch");
  }
}
mydata();
let genratedata = (apidata) => {

  let showoutput = document.getElementsByClassName('products-categories-link');
 
 
  for (let i = 0; i < showoutput.length; i++){
  
    showoutput[i].addEventListener('click', () => {
      let val = showoutput[i].innerText;
      
      if (val == "Football") {
       
        let mydata = apidata.filter((ele) => ele.cat == 'ball');
        return (shop.innerHTML = mydata.map((x) => {
          let { id, name, price, img } = x;
          let search = bucket.find((x) => x.itemid == id);
          return `
        <div class="mx-auto col-md-6 mb-4 col-lg-4 ">
        <div class="featured-container p-5">
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
         <h6 class="text-capitalize text-center my-2">${name}</h6>
         <h6 class="text-center">
           <span class="">${price}</span>
         </h6>
      
         
       </div>
       
        `
      
        }).join(""))
      

      } else if (val == "Sport") {
        let mydata = apidata.filter((ele) => ele.cat == 'spo');
        return (shop.innerHTML = mydata.map((x) => {
          let { id, name, price, img } = x;
          let search = bucket.find((x) => x.itemid == id);
          return `
        <div class="mx-auto col-md-6 mb-4 col-lg-4 ">
        <div class="featured-container p-5">
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
         <h6 class="text-capitalize text-center my-2">${name}</h6>
         <h6 class="text-center">
           <span class="">${price}</span>
         </h6>
      
         
       </div>
       
        `
      
        }).join(""))
      

      } else if (val == 'Sneaker') {
        let mydata = apidata.filter((ele) => ele.cat == 'sneakers');
        return (shop.innerHTML = mydata.map((x) => {
          let { id, name, price, img } = x;
          let search = bucket.find((x) => x.itemid == id);
          return `
        <div class="mx-auto col-md-6 mb-4 col-lg-4 ">
        <div class="featured-container p-5">
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
         <h6 class="text-capitalize text-center my-2">${name}</h6>
         <h6 class="text-center">
           <span class="">${price}</span>
         </h6>
      
         
       </div>
       
        `
      
        }).join(""))
      
      } else {
        return (shop.innerHTML = apidata.map((x) => {
          let { id, name, price, img } = x;
         let search =bucket.find((x)=>x.itemid == id);
        return `
        <div class="mx-auto col-md-6 mb-4 col-lg-4 ">
        <div class="featured-container p-5">
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
         <h6 class="text-capitalize text-center my-2">${name}</h6>
         <h6 class="text-center">
           <span class="">${price}</span>
         </h6>
      
         
       </div>
       
        `
      
      }).join(""))
      }
    })


  }



  return (shop.innerHTML = apidata.map((x) => {
    let { id, name, price, img } = x;
   let search =bucket.find((x)=>x.itemid == id);
  return `
  <div class="mx-auto col-md-6 mb-4 col-lg-4 ">
  <div class="featured-container p-5">
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
   <h6 class="text-capitalize text-center my-2">${name}</h6>
   <h6 class="text-center">
     <span class="">${price}</span>
   </h6>

   
 </div>
 
  `

}).join(""))


}
