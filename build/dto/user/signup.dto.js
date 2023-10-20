"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const MIN_PASSWORD_LENGTH = 7;
const STRONG_PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
exports.SignupSchema = zod_1.default.object({
    name: zod_1.default.string().min(2),
    email: zod_1.default.string().email('O email fornecido não está em um formato válido.'),
    password: zod_1.default.string().min(MIN_PASSWORD_LENGTH).regex(STRONG_PASSWORD_REGEX, 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.')
}).transform(data => data);
//# sourceMappingURL=signup.dto.js.map