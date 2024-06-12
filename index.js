const Cart = require("./cart");
const axios = require("axios");

const fetchDataAndGetSubtotal = async (url) => {
  try {
    const response = await axios.get(url);
    const data = response.data;
    const cart = new Cart();
    data.forEach((item) => cart.addItem(item.code, item.quantity));
    console.log(`Total: ${cart.calculateSubtotal()}`);
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
};
fetchDataAndGetSubtotal(
  "https://spareroom.github.io/recruitment/docs/cart-kata/data-set-1.json"
);

module.exports= fetchDataAndGetSubtotal