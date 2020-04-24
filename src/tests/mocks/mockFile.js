Object.defineProperty(window, "require", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
        ipcRenderer: {
            on: jest.fn(),
            send: jest.fn(),
        },
    })),
});
