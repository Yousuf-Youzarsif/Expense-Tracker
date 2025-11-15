//--------------UI mode Change-----------------//

let darkMode = document.querySelector(".fa-solid.fa-moon");
let lightMode = document.querySelector(".fa-solid.fa-sun");
let bodycolor = document.querySelector("body");
let expenseSection = document.querySelector(".expenseSection");
let addNew = document.querySelector(".addNew");
let FSA = document.querySelector(".FSA");
darkMode.addEventListener("click", () => {
  darkMode.style.display = "none";
  lightMode.style.display = "block";
  bodycolor.classList.toggle("active");
  expenseSection.classList.toggle("active");
  addNew.classList.toggle("active");
  FSA.classList.toggle("active");
});
lightMode.addEventListener("click", () => {
  darkMode.style.display = "block";
  lightMode.style.display = "none";
  bodycolor.classList.toggle("active");
  expenseSection.classList.toggle("active");
  addNew.classList.toggle("active");
  FSA.classList.toggle("active");
});

// ----------------------------------------------------
//geting data from server
let listItemContain = document.querySelector(".listItemContain");
let expenseAmt = document.querySelector(".expenseAmt");

function handleCategory(elm) {
  listItemContain.innerHTML += `<div class="listItems">
            <p class="lunchTeam">${elm.expenseName}</p>
            <div class="itemAction">
              <p class="categoryShow">${elm.category}</p>
              <p class="expPrice">₹ ${elm.amount}</p>
              <i class="fa-solid fa-trash" onclick="deleteData('${elm._id}')"></i>
            </div>
          </div>`;
}

let emptyExpense = document.querySelector(".emptyExpense");

async function handlerGetData() {
  try {
    const res = await fetch("http://localhost:5000/expense");
    const dataGet = await res.json();
    console.log(dataGet.data);
    if (dataGet.data.length === 0) {
      emptyExpense.style.display = "block";
    } else {
      emptyExpense.style.display = "none";
    }
    listItemContain.innerHTML = "";
    let filteredExpense = dataGet.data.filter((elm) => {
      handleCategory(elm);
      return elm;
    });
    let allTotal = filteredExpense.reduce((acc, curr) => {
      return (acc += curr.amount);
    }, 0);
    expenseAmt.textContent = allTotal;

    // sub Category section
    let nextCotogry = document.querySelector(".nextCotogry");
    nextCotogry.addEventListener("click", (e) => {
      let categoryFill = e.target.closest("p");

      listItemContain.innerHTML = "";
      let categoryFilter = filteredExpense.filter((elm) => {
        if (elm.category == categoryFill.textContent) {
          handleCategory(elm);
          return elm;
        }
      });

      let totalExpense = categoryFilter.reduce((acc, curr) => {
        return (acc += curr.amount);
      }, 0);
      expenseAmt.textContent = totalExpense;
      if ("All" == categoryFill.textContent) {
        // console.log("yes working");
        dataGet.data.filter((elm) => {
          // console.log(elm.amount);
          handleCategory(elm);
          expenseAmt.textContent = allTotal;
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}
handlerGetData();

// create data from client side and send to backend

let expenseName = document.querySelector("#expenseName");
let addNewExp = document.querySelector(".addNewExp");
let expenseNumber = document.querySelector("#expenseNumber");
let sameInput = document.querySelector(".selectInput");

addNewExp.addEventListener("click", (event) => {
  event.preventDefault();
  handlerCreateData();
});

async function handlerCreateData() {
  try {
    const res = await fetch("http://localhost:5000/expense/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        expenseName: expenseName.value,
        amount: expenseNumber.value,
        category: sameInput.value,
      }),
    });
    handlerGetData();
  } catch (error) {
    console.log(error);
  }
  let category = document.querySelector(".category");
  expenseName.value = "";
  expenseNumber.value = "";
}

// Delete method

async function deleteData(id) {
  try {
    const res = await fetch(`http://localhost:5000/expense/delete/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
  handlerGetData();
}
