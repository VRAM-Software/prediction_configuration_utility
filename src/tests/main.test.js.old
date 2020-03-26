const Application = require("spectron").Application;
const path = require("path");
const assert = require("assert");

let electronPath = path.join(
    __dirname,
    "..",
    "..",
    "node_modules",
    ".bin",
    "electron"
);
const appPath = path.join(__dirname, "..", "..");


describe("Application launch", () => {
    jest.setTimeout(100000);
    let app;
    beforeEach(() => {
        app = new Application({
            path: electronPath,
            args: [appPath]
        });
        return app.start();
    });

    afterEach(() => {
        if (app && app.isRunning()) {
            return app.stop();
        }
    });

    it('shows an initial window', () => {
        return app.client.getWindowCount().then(function(count) {
            assert.equal(count, 1);
        })
      });

    //   it('has the correct title', async () => {
    //     const title = await app.client.waitUntilWindowLoaded().getTitle();
    //     return assert.equal(title, '');
    //   });
      
});
