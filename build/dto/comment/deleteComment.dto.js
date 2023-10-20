"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCommentSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.DeleteCommentSchema = zod_1.default.object({
    commentId: zod_1.default.string().min(1),
    postId: zod_1.default.string().min(1),
    token: zod_1.default.string().min(1)
}).transform(data => data);
//# sourceMappingURL=deleteComment.dto.js.map