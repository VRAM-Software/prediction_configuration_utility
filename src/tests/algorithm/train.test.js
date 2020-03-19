const Trainer = require("../../algorithm/train");

describe("test for training algorithm's wrapper class", () => {
  let trainer;
  beforeEach(() => {
    trainer = new Trainer();
  });

  test("translateData should return expected array", () => {
    const data = [
      { weight: 1, size: 1, label: 1 },
      { weight: 2, size: 2, label: 2 }
    ];
    trainer.translateData(data);
    expect(trainer.data).toEqual([
      [1, 1],
      [2, 2]
    ]);
    expect(trainer.labels).toEqual([1, 2]);
  });
});
