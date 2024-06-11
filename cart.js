class Cart {
  constructor() {
    this.items = {};
    this.prices = {
      A: 50,
      B: 35,
      C: 25,
      D: 12,
    };
    this.bulkPrices = {
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
    addItem(code, quantity) {
      if(this.items[code]) {
        this.items[code]+= quantity
      }
      else {
          this.items[code] = quantity
      }
  }
  calculateSubTotal() {
    let total = 0;
      for (const code in this.items) {
          if (!this.prices[code]) continue
          const count = this.items[code]
          if (this.bulkPrices[code]) {
              const bulk = this.bulkPrices[code]
              total += Math.floor(count / bulk.quantity) * bulk.price;
              total += count % bulk.quantity * this.prices[code];
          } else {
              total += count * this.prices[code];
          }
      }
    return total;
  }
}
module.exports = Cart