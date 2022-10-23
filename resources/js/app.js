// for client side code
import axios from "axios";
import Noty from "noty";
import moment from "moment";

import { initAdmin } from "./admin";

let addToCart = document.querySelectorAll(".add-to-cart");
let cartCounter = document.querySelector("#Cartcounter");

function updateCart(pizza) {
  //server pe request dal do bhai
  //ajax call....using library -> axios

  axios
    .post("/update-cart", pizza)
    .then((res) => {
      // console.log(res);
      new Noty({
        //   theme: "mint",
        type: "success",
        timeout: 1000,
        text: "Added to Cart",
        progressBar: false,
      }).show();
      cartCounter.innerText = res.data.totalQty;
    })
    .catch((err) => {
      new Noty({
        //   theme: "mint",
        type: "error",
        timeout: 1000,
        text: "Something Went Wrong",
        progressBar: false,
      }).show();
    });
}

addToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let pizza = JSON.parse(btn.dataset.pizza);
    // console.log(pizza)
    updateCart(pizza);
  });
});

//remove alert mes
const alertMsg = document.querySelector("#success-alert");

if (alertMsg) {
  setTimeout(() => {
    alertMsg.remove();
  }, 2000);
}

// for dynamic single order page .. ..change order status initiated by admin

let statuses = document.querySelectorAll(".status_line");
// console.log(statuses);

let hiddenInput = document.querySelector("#hiddenInput");

let order = hiddenInput ? hiddenInput.value : null;

order = JSON.parse(order);
let time = document.createElement("small");

// console.log(order);

function updateStatus(order) {
  statuses.forEach((status) => {
    status.classList.remove("step-completed");
    status.classList.remove("current-step");
  });

  let stepCompleted = true;

  statuses.forEach((status) => {
    let dataStat = status.dataset.status;

    if (stepCompleted) {
      status.classList.add("step-completed");
    }
    if (dataStat === order.status) {
      stepCompleted = false;
      time.innerText = moment(order.updatedAt).format("hh:mm A");
      status.appendChild(time);
      if (status.nextElementSibling) {
        status.nextElementSibling.classList.add("current-step");
      }
    }
  });
}

updateStatus(order);

//Socket Client side

let socket = io();

if (order) {
  socket.emit("join", `order_${order._id}`);
}

//Join bhai ham order page pe aa gaye ye lo order id iske nam ki room bana do join karo baba

//For Admin

let adminAreaPath = window.location.pathname;
console.log(adminAreaPath);

if (adminAreaPath.includes("admin")) {
  initAdmin(socket);

  socket.emit("join", "adminRoom");
}

//For Client
socket.on("orderUpdated", (data) => {
  const updatedOrder = { ...order };
  updatedOrder.updatedAt = moment().format();
  updatedOrder.status = data.status;
  updateStatus(updatedOrder);
  new Noty({
    //   theme: "mint",
    type: "success",
    timeout: 1000,
    text: "Order Updated ",
    progressBar: false,
  }).show();
  // console.log(data);
});
