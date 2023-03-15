"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const get_url_shortener_1 = __importDefault(require("./controllers/get-url-shortener"));
const post_url_1 = __importDefault(require("./controllers/post-url"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.post('/', post_url_1.default);
app.get('/', get_url_shortener_1.default);
app.listen(port, () => {
    console.log(`Listening on port ${port}: http://localhost:${port}`);
});
