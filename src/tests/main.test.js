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

jest.setTimeout(8000);
describe("Application launch", () => {
    const app = new Application({
        path: electronPath,
        args: [appPath]
    });
    beforeEach(() => {
        
        return app.start();
    });

    afterEach(() => {
        if (app && app.isRunning()) {
            return app.stop();
        }
    });

    it('shows an initial window', async () => {
        const count = await app.client.getWindowCount();
        return assert.equal(count, 1);
      });

      it('has the correct title', async () => {
        const title = await app.client.waitUntilWindowLoaded().getTitle();
        return assert.equal(title, '');
      });
      
});
