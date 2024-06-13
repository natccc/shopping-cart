const Cart = require("./cart");
const axios = require("axios");

const fetchOrderData = async (orderURL) => {
  try {
    const response = await axios.get(orderURL);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    throw error;
  }
};

const getSubtotal = async (orderURL) => {
  const cart = new Cart();
  try {
    const orderData = await fetchOrderData(orderURL);
    cart.setItems(orderData);
    console.log(`Total: ${cart.calculateSubtotal()}`);
    return cart;
  } catch (error) {
    console.error(`Error initializing cart: ${error.message}`);
  }
};

getSubtotal(
  "https://spareroom.github.io/recruitment/docs/cart-kata/data-set-1.json"
);

module.exports = getSubtotal;
