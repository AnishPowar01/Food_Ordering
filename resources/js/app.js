// for client side code
import axios from "axios";
import Noty from "noty";
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

initAdmin();
