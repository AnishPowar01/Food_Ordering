// for client side code
import axios from 'axios'

let addToCart = document.querySelectorAll('.add-to-cart')

function updateCart(pizza)
{
    //server pe request dal do bhai
    //ajax call....using library -> axios

    axios.post('/update-cart',pizza).then(res => {
        console.log(res)
    })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {

       
        let pizza = JSON.parse( btn.dataset.pizza)
        // console.log(pizza)
        updateCart(pizza)
        
    })
})