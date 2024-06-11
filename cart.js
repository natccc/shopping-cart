class Cart {
  constructor() {
    this.items = [];
    this.itemsTotal = {};
    this.price = {
      A: 50,
      B: 35,
      C: 25,
      D: 12,
    };
    this.bulkPrice = {
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
    this.items.push({ code, quantity });
  }
  calculateSubTotal() {
    let total = 0;
      this.items.forEach((item) => {
          if (this.itemsTotal[item.code]) {
            this.itemsTotal[item.code] += item.quantity;
          } else {
            this.itemsTotal[item.code] = item.quantity;
        }
      });
      for (const code in this.itemsTotal) {
          if(!this.price[code]) continue
          if (this.bulkPrice[code]) {
              total += Math.floor(this.itemsTotal[code] / this.bulkPrice[code].quantity) * this.bulkPrice[code].price;
              total += this.itemsTotal[code] % this.bulkPrice[code].quantity * this.price[code];
              console.log("bulk")
          } else {
              total += this.itemsTotal[code] * this.price[code];
              console.log("no bulk")
          }
      }
    return total;
  }
}
module.exports = Cart