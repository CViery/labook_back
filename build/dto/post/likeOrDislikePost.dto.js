"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeOrDislikePostSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.LikeOrDislikePostSchema = zod_1.default.object({
    postId: zod_1.default.string().min(1),
    token: zod_1.default.string().min(1),
    like: zod_1.default.boolean()
}).transform(data => data);
//# sourceMappingURL=likeOrDislikePost.dto.js.map