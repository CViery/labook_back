"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLikeDislikeSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.GetLikeDislikeSchema = zod_1.default.object({
    token: zod_1.default.string().min(1),
    userId: zod_1.default.string().min(1),
    commentId: zod_1.default.string().min(1)
}).transform(data => data);
//# sourceMappingURL=getLikeDislike.dto.js.map