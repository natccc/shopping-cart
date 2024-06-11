const axios = require("axios");
const Cart = require("../cart");

describe("Cart", () => {
  let cart;
  beforeEach(() => {
    cart = new Cart();
  })
  test("return 0 when cart is empty", () => {
    const cart = new Cart();
    expect(cart.calculateSubtotal()).toBe(0);
  });

  test("return the correct subtotal for unit prices", () => {
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
    expect(cart.calculateSubtotal()).toBe(122);
  });

  test("return the correct subtotal for bulk prices", () => {
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
    expect(cart.calculateSubtotal()).toBe(200);
  });

  test("return the correct subtotal for mixed prices", () => {
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
    expect(cart.calculateSubtotal()).toBe(445);
  });

  test("ignores items with invalid codes", () => {
    const data = [
      {
        code: "X",
        quantity: 2,
      },
    ];
    data.forEach((item) => cart.addItem(item.code, item.quantity));
    expect(cart.calculateSubtotal()).toBe(0);
  });
    
    test('allows multiple entries of the same item', () => {
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
        expect(cart.calculateSubtotal()).toBe(190);
      
    })
  test('calculates total for dataset 1 from URL', async () => {
    const url = "https://spareroom.github.io/recruitment/docs/cart-kata/data-set-1.json";
    const response = await axios.get(url);
    response.data.forEach((item) => cart.addItem(item.code, item.quantity));
    expect(cart.calculateSubtotal()).toBe(284);
    })
});
