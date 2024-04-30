var productNameInput = document.getElementById("productNameInput")
var productPriceInput = document.getElementById("productPriceInput")
var productCategoryInput = document.getElementById("productCategoryInput")
var productDescInput = document.getElementById("productDescInput")

var productContainer ;

if (localStorage.getItem('myProducts') != null) {
    productContainer = JSON.parse(localStorage.getItem('myProducts'));
    displayProduct(productContainer);
}
else{
    productContainer = [];
}

function addProduct(){
    if(validateProductName()==true){
    var product = {
        name : productNameInput.value ,
        price: productPriceInput.value ,
        category: productCategoryInput.value,
        desc: productDescInput.value 
    }
    productContainer.push(product) ;
    localStorage.setItem("myProducts", JSON.stringify(productContainer))
    clearForm();
    displayProduct(productContainer)
}
else{
    alert("product name invalid")
}
}

function clearForm(){
    productNameInput.value ="",
    productPriceInput.value ="",
    productCategoryInput.value = "",
    productDescInput.value = ""
}

function displayProduct(productList) { 
    var cartoona = ``;
    for(var i =0;i<productList.length ;i++)
    {
        cartoona +=`<tr>
        <td>${i}</td>
        <td>${productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].category}</td>
        <td>${productList[i].desc}</td>
        <td> <button onclick="setFormForUpdate(${i})" class="btn btn-outline-warning">update</button> </td>
        <td> <button onclick="deleteProduct(${i})" class="btn btn-outline-danger">delete</button> </td>
    </tr>`
    }
    document.getElementById('tableBody').innerHTML =cartoona;
 }

function searchProduct(searchTerm){
    var searchResult=[]
    for (var i=0; i<productContainer.length ; i++){
    if(productContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase())==true){
        searchResult.push(productContainer[i])
    }
}
    displayProduct(searchResult)
    
}

function deleteProduct(deletedTerm){
    productContainer.splice(deletedTerm,1);
    localStorage.setItem("myProducts", JSON.stringify(productContainer))
    displayProduct(productContainer)
}

function setFormForUpdate(updatedTerm){
    productNameInput.value =productContainer[updatedTerm].name;
    productPriceInput.value =productContainer[updatedTerm].price;
    productCategoryInput.value = productContainer[updatedTerm].category;
    productDescInput.value = productContainer[updatedTerm].desc;

    updatedIndex = updatedTerm;

    document.getElementById("updatebtn").classList.remove('d-none');
    document.getElementById("addbtn").classList.add('d-none');

}

function updateProduct(){
    productContainer[updatedIndex].name = productNameInput.value;
    productContainer[updatedIndex].price = productPriceInput.value;
    productContainer[updatedIndex].category = productCategoryInput.value;
    productContainer[updatedIndex].desc = productDescInput.value;

    localStorage.setItem("myProducts",JSON.stringify(productContainer));
    clearForm();
    displayProduct(productContainer);

    document.getElementById("addbtn").classList.remove('d-none');
    document.getElementById("updatebtn").classList.add('d-none');

}

function validateProductName(){
    var regex=/^[A-Z][a-z]{3,8}/
    if(regex.test(productNameInput.value)==true){
        productNameInput.classList.replace("is-invalid","is-valid")
        return true;
    }
    else{
        productNameInput.classList.add("is-invalid")
        return false;
    }
}
