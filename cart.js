class Cart {
  #items;
  #prices;
  #bulkPrices;

  constructor() {
    this.#items = {};
    this.#prices = {
      A: 50,
      B: 35,
      C: 25,
      D: 12,
    };
    this.#bulkPrices = {
      A: {
        quantity: 3,
        price: 140,
      },
      B: {
        quantity: 2,
        price: 60,
      },
    };
  }

  setItems(items) {
    items.forEach(({code, quantity})=>this.addItem(code,quantity))
  }
  addItem(code, quantity) {
    if (quantity <= 0) return;
    if (this.#prices[code]) {
      if (this.#items[code]) {
        this.#items[code] += quantity;
      } else {
        this.#items[code] = quantity;
      }
    }
  }

  calculateSubtotal() {
    let subtotal = 0;
    for (const code in this.#items) {
      const count = this.#items[code];
      if (this.#bulkPrices[code]) {
        const bulk = this.#bulkPrices[code];
        subtotal += Math.floor(count / bulk.quantity) * bulk.price;
        subtotal += (count % bulk.quantity) * this.#prices[code];
      } else {
        subtotal += count * this.#prices[code];
      }
    }
    return subtotal;
  }
}
module.exports = Cart;

