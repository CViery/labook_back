"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const postRouter_1 = require("./routes/postRouter");
const userRouter_1 = require("./routes/userRouter");
const commentRouter_1 = require("./routes/commentRouter");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.listen(Number(process.env.PORT) || 3003, () => {
    console.log(`Servidor rodando na porta ${Number(process.env.PORT) || 3003}`);
});
app.use("/users", userRouter_1.userRouter);
app.use("/posts", postRouter_1.postRouter);
app.use("/comments", commentRouter_1.commentRouter);
app.get("/ping", (req, res) => {
    res.send("Pong!");
});
//# sourceMappingURL=index.js.map