"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePostSchema = void 0;
const zod_1 = __importDefault(require("zod"));
;
exports.DeletePostSchema = zod_1.default.object({
    token: zod_1.default.string().min(1),
    idToDelete: zod_1.default.string().min(1)
}).transform(data => data);
//# sourceMappingURL=deletePost.dto.js.map