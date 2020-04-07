const PerformWritingJson = require("../../viewmodel/perform/writing/PerformWritingJson");
const WriteJson = require("../../model/output/WriteJson");

describe("Tests for class PerformReadingCsv class", () => {
    let jsonWriter;
    beforeEach(() => {
        jsonWriter = new PerformWritingJson();
    });

    test("should create ReadCsv reader", () => {
        expect(jsonWriter.getWriter() instanceof WriteJson).toBeTruthy();
    });
});
