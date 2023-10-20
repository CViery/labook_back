"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBusiness = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
const ConflictError_1 = require("../errors/ConflictError");
const Users_1 = require("../models/Users");
class UserBusiness {
    constructor(userDatabse, idGenerator, tokenManager, hashManager) {
        this.userDatabse = userDatabse;
        this.idGenerator = idGenerator;
        this.tokenManager = tokenManager;
        this.hashManager = hashManager;
        this.signup = (input) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = input;
            const existingUser = yield this.userDatabse.findUserByEmail(email);
            if (existingUser) {
                throw new ConflictError_1.ConflictError("Este e-mail já está em uso. Por favor, escolha outro e-mail.");
            }
            const id = this.idGenerator.generate();
            const hashedPassword = yield this.hashManager.hash(password);
            const user = new Users_1.User(id, name, email, hashedPassword, Users_1.USER_ROLES.NORMAL, new Date().toISOString());
            const userDB = user.toDBModel();
            yield this.userDatabse.insertUser(userDB);
            const payload = {
                id: user.getId(),
                name: user.getName(),
                role: user.getRole()
            };
            const token = this.tokenManager.createToken(payload);
            const output = {
                token
            };
            return output;
        });
        this.login = (input) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = input;
            const userDB = yield this.userDatabse.findUserByEmail(email);
            if (!userDB) {
                throw new BadRequestError_1.BadRequestError("e-mail e/ou senha inválido(s)");
            }
            const user = new Users_1.User(userDB.id, userDB.name, userDB.email, userDB.password, userDB.role, userDB.created_at);
            const hashedPassword = user.getPassword();
            const isPasswordCorrect = yield this.hashManager
                .compare(password, hashedPassword);
            if (!isPasswordCorrect) {
                throw new BadRequestError_1.BadRequestError("E-mail e/ou senha inválidos. Por favor, verifique tente novamente.");
            }
            const payload = {
                id: user.getId(),
                name: user.getName(),
                role: user.getRole()
            };
            const token = this.tokenManager.createToken(payload);
            const output = {
                token
            };
            return output;
        });
    }
}
exports.UserBusiness = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map