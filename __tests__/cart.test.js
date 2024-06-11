const axios = require("axios");
const Cart = require("../cart");

describe("calculateSubTotal", () => {
  test("return 0 when cart is empty", () => {
    const cart = new Cart();
    expect(cart.calculateSubTotal()).toBe(0);
  });

  test("return the correct subtotal when items are calculated by unit price", () => {
    const cart = new Cart();
    const data = [
      {
        code: "A",
        quantity: 1,
      },
      {
        code: "B",
        quantity: 1,
      },
      {
        code: "C",
        quantity: 1,
      },
      {
        code: "D",
        quantity: 1,
      },
    ];
    data.forEach((item) => cart.addItem(item.code, item.quantity));
    expect(cart.calculateSubTotal()).toBe(122);
  });

  test("return the correct subtotal when items are calculated by bulk price", () => {
    const cart = new Cart();
    const data = [
      {
        code: "A",
        quantity: 3,
      },
      {
        code: "B",
        quantity: 2,
      },
    ];
    data.forEach((item) => cart.addItem(item.code, item.quantity));
    expect(cart.calculateSubTotal()).toBe(200);
  });

  test("return the correct subtotal when items are calculated by bulk price and unit price", () => {
    const cart = new Cart();
    const data = [
      {
        code: "A",
        quantity: 5,
      },
      {
        code: "B",
        quantity: 6,
      },
      {
        code: "C",
        quantity: 1,
      },
    ];
    data.forEach((item) => cart.addItem(item.code, item.quantity));
    expect(cart.calculateSubTotal()).toBe(445);
  });

  test("return total while ignoring items with invalid code", () => {
    const cart = new Cart();
    const data = [
      {
        code: "X",
        quantity: 2,
      },
    ];
    data.forEach((item) => cart.addItem(item.code, item.quantity));
    expect(cart.calculateSubTotal()).toBe(0);
  });
    
    test('allow multiple entries of the same item', () => {
        const cart = new Cart();
        const data = [
          {
            code: "A",
            quantity: 2,
          },
          {
            code: "A",
            quantity: 2,
          },
        ];
        data.forEach((item) => cart.addItem(item.code, item.quantity));
        expect(cart.calculateSubTotal()).toBe(190);
      
    })
  test('calculates total for dataset 1', async () => {
    const cart = new Cart();
    const url = "https://spareroom.github.io/recruitment/docs/cart-kata/data-set-1.json";
    const response = await axios.get(url);
    response.data.forEach((item) => cart.addItem(item.code, item.quantity));
    expect(cart.calculateSubTotal()).toBe(284);
    })
});
