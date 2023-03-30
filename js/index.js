let json = localStorage.getItem("carrito")
produc = JSON.parse(json)
const carrito = produc 
console.log(carrito)
if(carrito==null){
    const carFalso = []
    localStorage.setItem("carrito",JSON.stringify(carFalso))
    location. reload()
}
function categorias(){
    fetch("https://api.escuelajs.co/api/v1/categories")
            .then(Response => Response.json())
            .then(data => {
                data.forEach(element => {
                    document.getElementById("list-categorias").innerHTML += `<a onclick="urlLocal('https://api.escuelajs.co/api/v1/products/?categoryId=${element.id}')" href="categorias.html" class="list-group-item list-group-item-action list-group-item-info">${element.name}</a>`
                }); 
            })
}
function productos1(){
    fetch("https://api.escuelajs.co/api/v1/products?offset=0&limit=9")
        .then(Response => Response.json())
        .then(data => {
            data.forEach(element => {
                document.getElementById("Productos").innerHTML += `<div class="card" style="width: 18rem;">
                    <img src="${element.images[0]}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${element.title}</h5>
                      <p class="card-text">${element.description}</p>
                      <p class="card-text">Precio:<span class="fw-bold">${element.price}</span></p>
                      <div class = "d-flex flex-column">
                        <button class="btn btn-primary" onclick="AgregarCarrito(${element.id})">Agregar al Carrito</button>
                        <label for="" class="fw-bold">Cantidad: </label> 
                        <input type="number" class="btn btn-outline-info" min="0" value="0" id="${element.id}"></input>
                      </div>
                    </div>
                </div>`
            });
        })
}
function productos2(){
    limpiar()
    fetch("https://api.escuelajs.co/api/v1/products?offset=9&limit=9")
        .then(Response => Response.json())
        .then(data => {
            data.forEach(element => {
                document.getElementById("Productos").innerHTML += `<div class="card" style="width: 18rem;">
                    <img src="${element.images[0]}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${element.title}</h5>
                      <p class="card-text">${element.description}</p>
                      <p class="card-text">Precio:<span class="fw-bold">${element.price}</span></p>
                      <div class = "d-flex flex-column">
                        <button class="btn btn-primary" onclick="AgregarCarrito(${element.id})">Agregar al Carrito</button>
                        <label for="" class="fw-bold">Cantidad: </label> 
                        <input type="number" class="btn btn-outline-info" min="0" value="0" id="${element.id}"></input>
                      </div>
                    </div>
                </div>`
            });
        })
}
function productos3(){
    limpiar()
    fetch("https://api.escuelajs.co/api/v1/products?offset=18&limit=9")
        .then(Response => Response.json())
        .then(data => {
            data.forEach(element => {
                document.getElementById("Productos").innerHTML += `<div class="card" style="width: 18rem;">
                    <img src="${element.images[0]}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${element.title}</h5>
                      <p class="card-text">${element.description}</p>
                      <p class="card-text">Precio:<span class="fw-bold">${element.price}</span></p>
                      <div class = "d-flex flex-column">
                        <button class="btn btn-primary" onclick="AgregarCarrito(${element.id})">Agregar al Carrito</button>
                        <label for="" class="fw-bold">Cantidad: </label> 
                        <input type="number" class="btn btn-outline-info" min="0" value="0" id="${element.id}"></input>
                      </div>
                    </div>
                </div>`
            });
        })
}
function limpiar(){
    document.getElementById("Productos").innerHTML = ""
}
function urlLocal(url){
    localStorage.setItem("urlCategorias",url)
}
function getCategorias(){
    let url = localStorage.getItem("urlCategorias")
    fetch(url)
        .then(Response => Response.json())
        .then(data => {
            document.getElementById("titulo-categoria").innerHTML = `Productos de categoria ${data[0].category.name}`
            data.forEach(element => {
                document.getElementById("Categorias").innerHTML += `<div class="card" style="width: 18rem;">
                    <img src="${element.images[0]}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${element.title}</h5>
                      <p class="card-text">${element.description}</p>
                      <p class="card-text">Precio:<span class="fw-bold">${element.price}</span></p>
                      <p class="card-text"><b>Categoria: </b>${element.category.name}</p>
                      <div class = "d-flex flex-column">
                        <button class="btn btn-primary" onclick="AgregarCarrito(${element.id})">Agregar al Carrito</button>
                        <label for="" class="fw-bold">Cantidad: </label> 
                        <input type="number" class="btn btn-outline-info" min="0" value="0" id="${element.id}"></input>
                      </div>
                    </div>
                </div>`
            });
        })
}
function autoCompletProductos(){
    fetch("https://api.escuelajs.co/api/v1/products")
        .then(response => response.json())
        .then(data => {
            let textoBuscar = document.getElementById("txtBuscar").value
            if(textoBuscar.length >=2){
                let lista = `<div class="list-group">`
                const filtroProducto = data.filter(filtrarProductos)
                filtroProducto.forEach(element => {
                    lista += `<a onclick="urlProducto('https://api.escuelajs.co/api/v1/products/${element.id}'),urlLocal('https://api.escuelajs.co/api/v1/products/?categoryId=${element.category.id}')" href="detalleProducto.html" class="list-group-item list-group-item-action">${element.title} <img id="icono${element.title}" src="${element.images[0]}"style="width: 20%"></a>`
                });
                lista += `</div>`
                document.getElementById("listBusqueda").innerHTML = lista
                document.getElementById("listBusqueda").style  = `position: absolute;top: 70px;width: 32%;right:170px;z-index:9999;height: 380px;overflow: auto;`
            }else{
                document.getElementById("listBusqueda").innerHTML = ""
            }
        })
}
function filtrarProductos(element){
    let textoBuscar = document.getElementById("txtBuscar").value
    let name  = element.title.toLowerCase()
    return name.includes(textoBuscar.toLowerCase())
}
function searchProducto(){
    document.getElementById("txtBuscar").addEventListener("search", (event) =>{
        document.getElementById("listBusqueda").innerHTML = ""
        document.getElementById("listBusqueda").style = "overflow:hidden;"
        document.getElementById("txtBuscar").value = ""
    })
}
function urlProducto(url){
    localStorage.setItem("urlProducto",url)
}
function getDetalleProducto(){
    let url = localStorage.getItem("urlProducto")
    fetch(url)
        .then(Response => Response.json())
        .then(data => {
                document.getElementById("DetalleProducto").innerHTML = `<div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                  <div class="col-md-4 d-flex align-content-center">
                    <img src="${data.images[0]}" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${data.title}</h5>
                      <p class="card-text">${data.description}</p>
                      <p class="card-text"><b>Precio: </b>${data.price}</p>
                      <p class="card-text"><b>Categoria: </b>${data.category.name}</p>
                      <div class = "d-flex flex-column">
                            <button type="button" class="btn btn-outline-info" onclick="AgregarCarrito(${data.id})">Agregar al carrito</button>
                            <label for="" class="fw-bold">Cantidad: </label> 
                            <input type="number" class="btn btn-outline-info" min="0" value="0" id="${data.id}"></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
        })
}
function getRecomendados(){
    let url = localStorage.getItem("urlCategorias")
    fetch(url)
        .then(Response => Response.json())
        .then(data => {
            data.forEach(element => {
                document.getElementById("Categorias").innerHTML += `<div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                  <div class="col-md-4 d-flex align-content-center">
                    <img src="${element.images[0]}" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${element.title}</h5>
                      <p class="card-text">${element.description}</p>
                      <p class="card-text"><b>Precio: </b>${element.price}</p>
                      <p class="card-text"><b>Categoria: </b>${element.category.name}</p>
                      <div class = "d-flex flex-column">
                            <button type="button" class="btn btn-outline-info" onclick="AgregarCarrito(${element.id})">Agregar al carrito</button>
                            <label for="" class="fw-bold">Cantidad: </label> 
                            <input type="number" class="btn btn-outline-info" min="0" value="0" id="${element.id}"></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
            });
        })
}
function AgregarCarrito(id){
  fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
    .then(response => response.json())
    .then(data => {
         nombre = data.title;
         precio = data.price;
         imagen = data.images[0];
         cantidad = parseInt(document.getElementById(`${id}`).value);
         pro = {
            "nombre": nombre,
            "precio": precio,
            "imagen": imagen,
            "cantidad": cantidad
         }
         if(cantidad==0){
            Swal.fire("Agregar Carrito","Ingrese la cantidad","info")
         }else{
            Swal.fire("Agregar Carrito","Producto agregado","success")
            carrito.push(pro);
            localStorage.setItem("carrito",JSON.stringify(carrito))
            listarCarrito()
            document.getElementById(`${id}`).value = 0
         }
    })
}
function listarCarrito(){
  let json = localStorage.getItem("carrito")
  productos = JSON.parse(json)
  console.log(productos)
  document.getElementById("list-carrito").innerHTML = ""
  productos.forEach((element,i) => {
      document.getElementById("list-carrito").innerHTML += `<div class="card border-info mb-3" style="max-width: 540px; border-bottom-left-radius: 9.25rem!important;
      border-top-left-radius: 10.25rem!important;">
      <div class="row g-0">
        <div class="col-md-4" style="display: flex;">
          <img src="${element.imagen}" class="img-fluid rounded-start" alt="..." style="border-bottom-left-radius: 9.25rem!important;
          border-top-left-radius: 10.25rem!important;">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <div style="margin-bottom: -28px;">
              <h5 class="card-title">${element.nombre}</h5>
              <button type="button" onclick="eliminarDelCarrito(${i})" class="btn-close" style="position: relative;
              top: -48px;
              left: 197px;"></button>
            </div>
            <p style="margin-bottom: 0rem;"><b>Precio: </b>${element.precio+" "+from}</p>
            <p style="margin-bottom: 0rem;"><b>Cantidad: </b>${element.cantidad}</p>
            <p style="margin-bottom: 0rem;"><b>Total: </b>${element.cantidad*element.precio+" "+from}</p>
          </div>
        </div>
      </div>
    </div>`
  });
  total()
}
function eliminarDelCarrito(i){
    carrito.splice(i, 1)
    localStorage.setItem("carrito",JSON.stringify(carrito))
    listarCarrito()
}
function total(){
  let total = 0
  carrito.forEach(element => {
    total += element.cantidad*element.precio
  });
  document.getElementById('total').innerHTML = `Total de la compra: ${total+" "+from}`
}
function finalizarCompra(){
  Swal.fire("Compra","Compra exitosa","success")
  carrito.length = 0
  localStorage.setItem("carrito",JSON.stringify(carrito))
  listarCarrito()
}
let from = "USD"
function cambiarMoneda(to){
  let nuevoPrecio = 0
  var myHeaders = new Headers();
  myHeaders.append("apikey", "4XpWr6jKK5xgLzeuXaEYigoDYxnXCHrW");
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };
  carrito.forEach(element => {
    fetch(`https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${element.precio}`, requestOptions)
    .then(response => response.json())
    .then(data => {
        nuevoPrecio = data.result
        element.precio = nuevoPrecio
    })
  });
  from = to
  localStorage.setItem("carrito",JSON.stringify(carrito))
  listarCarrito()
}

