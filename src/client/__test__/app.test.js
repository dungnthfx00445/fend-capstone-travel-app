const { expect } = require("@jest/globals");

describe("Test handleSubmit()", () => {
  const { handleSubmit } = require("../js/app");

  it("the function handleSubmit() should exist", async () => {
    expect(handleSubmit).toBeDefined();
  });
  it("the function handleSubmit() should be a function", async () => {
    expect(typeof handleSubmit).toBe("function");
  });
});
