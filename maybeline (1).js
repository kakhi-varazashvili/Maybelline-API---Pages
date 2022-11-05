let main = document.querySelector(".main")
let sel = document.querySelector("select")
let inp = document.querySelector("input")
let arr2 = []
let arr3 = []
fetch("https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline")
.then(x=> x.json())
.then(arr=>{
    arr2 = arr
    arr3 = [].concat(arr2)
    DisplayItems(arr2)
})

sel.addEventListener("change",function(){
    if(sel.value == "zrdadobit"){
       arr2.sort(function(a,b){
        return a.price - b.price
       })
       DisplayItems(arr2)
    }
    else if(sel.value == "klebadobit"){
        arr2.sort(function(b,a){
            return a.price - b.price
     })
     DisplayItems(arr2)
 }
 else{
    DisplayItems(arr3)
    console.log(arr3)
 }
})

function DisplayItems(arr){
    
    main.innerHTML = ""
    for(var i of arr){
        var tmp = `
        <div class="card" style="width: 18rem;">
  <img src="${i.image_link}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${i.name}</h5>
    <p class="card-text">${i.description}</p>
    <button class="show">show more</button>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">${i.product_type}</li>
    <li class="list-group-item">${i.rating}</li>
    <li class="list-group-item">${i.brand}</li>
  </ul>
  <div class="card-body">
    <a href="${i.product_link}" class="card-link">Product Link</a>
    <a href="#" class="card-link">${i.price}$</a>
  </div>
</div>
        `
        main.innerHTML +=tmp
    }
    let btns = document.querySelectorAll(".show")
    for(let i of btns){
        i.addEventListener("click",function(){
            let myp = i.parentNode.children[1]
            console.log(myp)
            if(this.innerText == "show more"){
                myp.style.height = "auto"
                this.innerText = "show less"
                myp.style.overflow = "auto"
            }
            else{
                myp.style.height = "100px"
                this.innerText = "show more"
                myp.style.overflow = "hidden"
            }
        })
    }
}
inp.addEventListener("keyup",function(e){
    if(e.code == "Backspace"){
      arr2 = [].concat(arr3)
    }
    arr2 = arr2.filter(x=> x.name.toLowerCase().startsWith(inp.value.toLowerCase()))
    DisplayItems(arr2)
})






// function x(){
//     setTimeout(() => {

//     }, 1500);
// }
// x()