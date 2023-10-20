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
const UserBusiness_1 = require("../../../src/business/UserBusiness");
const UserDatabaseMock_1 = require("../../mocks/UserDatabaseMock");
const IdGeneratorMock_1 = require("../../mocks/IdGeneratorMock");
const TokenManagerMock_1 = require("../../mocks/TokenManagerMock");
const HashManagerMock_1 = require("../../mocks/HashManagerMock");
const login_dto_1 = require("../../../src/dto/user/login.dto");
const BadRequestError_1 = require("../../../src/errors/BadRequestError");
describe("Teste de Login do Usuário", () => {
    const userBusiness = new UserBusiness_1.UserBusiness(new UserDatabaseMock_1.UserDatabaseMock(), new IdGeneratorMock_1.IdGeneratorMock(), new TokenManagerMock_1.TokenManagerMock(), new HashManagerMock_1.HashManagerMock());
    test("Login bem-sucedido para usuário válido", () => __awaiter(void 0, void 0, void 0, function* () {
        const input = login_dto_1.LoginSchema.parse({
            email: "astrodev@email.com",
            password: "astrodev99"
        });
        const output = yield userBusiness.login(input);
        expect(output).toEqual({ token: "token-mock-astrodev" });
    }));
    test("Erro ao inserir email inválido", () => __awaiter(void 0, void 0, void 0, function* () {
        const input = login_dto_1.LoginSchema.parse({
            email: "email@invalido.com",
            password: "astrodev99"
        });
        yield expect(userBusiness.login(input)).rejects.toThrow(BadRequestError_1.BadRequestError);
    }));
    test("Erro ao inserir senha inválida", () => __awaiter(void 0, void 0, void 0, function* () {
        const input = login_dto_1.LoginSchema.parse({
            email: "astrodev@email.com",
            password: "senhainvalida"
        });
        yield expect(userBusiness.login(input)).rejects.toThrow(BadRequestError_1.BadRequestError);
    }));
});
//# sourceMappingURL=login.test.js.map