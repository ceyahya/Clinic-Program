// check for saved colors
let mainColor = window.localStorage.getItem("mainColor")
if (window.localStorage.getItem("mainColor")) {
    document.documentElement.style.setProperty('--js-color', mainColor)
    // colors remove active class
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active")
        if (element.dataset.color === mainColor) {
            element.classList.add("active")
        }
    });
}
// check for saved colors
// sitting btn active class
let settings = document.getElementById("settings")
settings.onclick = function () {
    let settingBox = document.getElementById("settingBox")
    settingBox.classList.toggle("active")
    this.classList.toggle("active")
}
// sitting btn active class
// switch colors
let color = document.querySelectorAll(".colors-list li")
color.forEach(li => {
    li.addEventListener("click", (event) => {
        document.documentElement.style.setProperty('--js-color', event.target.dataset.color)
        // mainColor to local storage
        window.localStorage.setItem("mainColor", event.target.dataset.color)
        // colors remove active class
        event.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active")
        });
        // add active class
        event.target.classList.add("active")
    })
})
// switch colors
// clientContainer
let submitBtn = document.getElementById("submit");
let saveBtn = document.getElementById("save");
let clientContainer = [];
let clientName = document.getElementById("clientName");
let clientPhone = document.getElementById("clientPhone");
let clientCategory = document.getElementById("clientCategory");
let clientPayment = document.getElementById("clientPayment");
let clientInfo = document.getElementById("clientInfo");
// display clients function
function displayClients() {
    let clientData = "";
    for (let index = 0; index < clientContainer.length; index++) {
        clientData += `<tr>
                            <td class="col">${index}</td>
                            <td class="col">${clientContainer[index].name}</td>
                            <td class="col">${clientContainer[index].phone}</td>
                            <td class="col">${clientContainer[index].category}</td>
                            <td class="col">${clientContainer[index].payment}</td>
                            <td class="col">${clientContainer[index].info}</td>
                            <td class="col"><button onclick="editBtn(${index})" class="btn btn-outline-success my-2 mx-2 text-white" type="edit">Edit</button>
                            <button onclick="deleteBtn(${index})"class="btn btn-outline-danger my-2 mx-2 text-white" type="delete">Delete</button></td>
                        </tr>`
        document.querySelector("tbody").innerHTML = clientData
    }
}
// display none function
function displayNone() {
    let clientData = "";
    document.querySelector("tbody").innerHTML = clientData
}
// clintContainer from localstorage
if (JSON.parse(window.localStorage.getItem("clientContainer"))=="") {
    displayNone()
} else {
    clientContainer = JSON.parse(window.localStorage.getItem("clientContainer"))
    displayClients()
}
// clear inputs function
function clearInputs() {
    clientName.value = "";
    clientPhone.value = "";
    clientCategory.value = "";
    clientPayment.value = "";
    clientInfo.value = "";
}
// clientContainer
// submit btn click
submitBtn.addEventListener("click", function addClient() {
    let client = {
        name: clientName.value,
        phone: clientPhone.value,
        category: clientCategory.value,
        payment: clientPayment.value,
        info: clientInfo.value
    }
    clientContainer.push(client)
    window.localStorage.setItem("clientContainer",JSON.stringify(clientContainer))
    // show cients
    if (JSON.parse(window.localStorage.getItem("clientContainer"))=="") {
        displayNone()
    } else {
        displayClients()
    }
    // show cients
    // clear inputs
    clearInputs()
    // clear inputs
})
// submit btn click
// edit function
function editBtn(index) {
    window.scrollTo(0,657)
    clientContainer = JSON.parse(window.localStorage.getItem("clientContainer"))
    clientName.value = clientContainer[index].name;
    clientPhone.value = clientContainer[index].phone;
    clientCategory.value = clientContainer[index].category;
    clientPayment.value = clientContainer[index].payment;
    clientInfo.value = clientContainer[index].info;
    submitBtn.style.display = "none"
    saveBtn.style.display = "block"
    saveBtn.addEventListener("click", function editClient() {
        let client = {
            name: clientName.value,
            phone: clientPhone.value,
            category: clientCategory.value,
            payment: clientPayment.value,
            info: clientInfo.value
        }
        console.log(client)
        clientContainer.splice(index, 1, client)
        window.localStorage.setItem("clientContainer",JSON.stringify(clientContainer))
        // show cients
        if (JSON.parse(window.localStorage.getItem("clientContainer"))=="") {
            displayNone()
        } else {
            displayClients()
        }
        // show cients
        // clear inputs
        clearInputs()
        // clear inputs
        submitBtn.style.display = "block"
        saveBtn.style.display = "none"
        window.scrollTo(0,1314)
    })
}
// edit function
// delete function
function deleteBtn(index) {
    clientContainer = JSON.parse(window.localStorage.getItem("clientContainer"))
    clientContainer.splice(index, 1)
    window.localStorage.setItem("clientContainer",JSON.stringify(clientContainer))
    if (JSON.parse(window.localStorage.getItem("clientContainer"))=="") {
        displayNone()
    } else {
        displayClients()
    }
}
// delete function
// search function
let search = document.getElementById("search")
search.addEventListener("focus", function () {
    window.scrollTo(0,1314)
})
search.addEventListener("keyup", function () {
    clientContainer = JSON.parse(window.localStorage.getItem("clientContainer"))
    let clientData = "";
    for (let index = 0; index < clientContainer.length; index++) {
        if (clientContainer[index].name.includes(search.value)
            || clientContainer[index].phone.includes(search.value) || clientContainer[index].category.includes(search.value)) {
            clientData += `<tr>
                                <td class="col">${index}</td>
                                <td class="col">${clientContainer[index].name}</td>
                                <td class="col">${clientContainer[index].phone}</td>
                                <td class="col">${clientContainer[index].category}</td>
                                <td class="col">${clientContainer[index].payment}</td>
                                <td class="col">${clientContainer[index].info}</td>
                                <td class="col"><button onclick="editBtn(${index})" class="btn btn-outline-success my-2 mx-2 text-white" type="edit">Edit</button>
                                <button onclick="deleteBtn(${index})"class="btn btn-outline-danger my-2 mx-2 text-white" type="delete">Delete</button></td>
                            </tr>`
        }
        document.querySelector("tbody").innerHTML = clientData
    }
})
// search function