const axios = require("axios");
const getSubtotal = require("../index");

jest.mock("axios");

describe("getSubtotal", () => {
    test("calculate the subtotal for dataset 1 ", async () => {
    const data = [
      { code: "A", quantity: 3 },
      { code: "B", quantity: 3 },
      { code: "C", quantity: 1 },
      { code: "D", quantity: 2 },
    ];
    axios.get.mockResolvedValue({ data });
    const consoleSpy = jest.spyOn(console, "log");

    await getSubtotal(
      "https://spareroom.github.io/recruitment/docs/cart-kata/data-set-1.json"
    );

    expect(consoleSpy).toHaveBeenCalledWith("Total: 284");

    consoleSpy.mockRestore();
  });

  test("handles error during data fetching", async () => {
    axios.get.mockRejectedValue(new Error("Network error"));

    const consoleSpy = jest.spyOn(console, "error");

    await getSubtotal(
      "https://spareroom.github.io/recruitment/docs/cart-kata/data-set-1.json"
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      "Error fetching data: Network error"
    );
    consoleSpy.mockRestore();
  });
});
