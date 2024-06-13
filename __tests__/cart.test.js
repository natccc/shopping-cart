const axios = require("axios");
const Cart = require("../cart");

describe("Cart", () => {
  let cart;
  beforeEach(() => {
    cart = new Cart();
  });
  
  test("return 0 when cart is empty", () => {
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
    cart.setItems(data)
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
    cart.setItems(data);
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
    cart.setItems(data);
    expect(cart.calculateSubtotal()).toBe(445);
  });

  test("ignores items with invalid codes", () => {
    const data = [
      {
        code: "X",
        quantity: 2,
      },
    ];
    cart.setItems(data);
    expect(cart.calculateSubtotal()).toBe(0);
  });

  test("allows multiple entries of the same item and handles boundary conditions for bulk prices", () => {
    const data = [
      {
        code: "A",
        quantity: 2,
      },
      {
        code: "A",
        quantity: 1,
      },
    ];
    cart.setItems(data);
    expect(cart.calculateSubtotal()).toBe(140);
  });

  test("handles zero quantities", () => {
    const data = [
      {
        code: "A",
        quantity: 0,
      },
    ];
    cart.setItems(data);
    expect(cart.calculateSubtotal()).toBe(0);
  });

  test("handles negative quantities", () => {
    const data = [
      {
        code: "A",
        quantity: -1,
      },
    ];
    cart.setItems(data);
    expect(cart.calculateSubtotal()).toBe(0);
  });

  test("calculates total for dataset 1 from URL", async () => {
    const dataUrl =
      "https://spareroom.github.io/recruitment/docs/cart-kata/data-set-1.json";
    const response = await axios.get(dataUrl);
    cart.setItems(response.data);
    expect(cart.calculateSubtotal()).toBe(284);
  });
});
