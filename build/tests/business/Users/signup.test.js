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
const signup_dto_1 = require("../../../src/dto/user/signup.dto");
const UserDatabaseMock_1 = require("../../mocks/UserDatabaseMock");
const IdGeneratorMock_1 = require("../../mocks/IdGeneratorMock");
const TokenManagerMock_1 = require("../../mocks/TokenManagerMock");
const HashManagerMock_1 = require("../../mocks/HashManagerMock");
const Users_1 = require("../../../src/models/Users");
const ConflictError_1 = require("../../../src/errors/ConflictError");
describe("Testando o cadastro de usuário", () => {
    const userBusiness = new UserBusiness_1.UserBusiness(new UserDatabaseMock_1.UserDatabaseMock(), new IdGeneratorMock_1.IdGeneratorMock(), new TokenManagerMock_1.TokenManagerMock(), new HashManagerMock_1.HashManagerMock());
    test("deve gerar token ao cadastrar", () => __awaiter(void 0, void 0, void 0, function* () {
        const input = signup_dto_1.SignupSchema.parse({
            name: "Ciclana",
            email: "ciclana@email.com",
            password: "Ciclana321@"
        });
        const output = yield userBusiness.signup(input);
        expect(output).toEqual({
            token: "token-mock"
        });
    }));
    test("deve lançar erro ao tentar cadastrar com email já existente", () => __awaiter(void 0, void 0, void 0, function* () {
        const input = signup_dto_1.SignupSchema.parse({
            name: "Fulano",
            email: "fulano@email.com",
            password: "Fulano123@"
        });
        yield expect(userBusiness.signup(input)).rejects.toThrow(ConflictError_1.ConflictError);
    }));
    test("deve criar um token para usuário normal", () => {
        const tokenManager = new TokenManagerMock_1.TokenManagerMock();
        const payload = {
            id: "id-mock-fulano",
            name: "Fulano",
            role: Users_1.USER_ROLES.NORMAL
        };
        const token = tokenManager.createToken(payload);
        expect(token).toBe("token-mock-fulano");
    });
    test("deve comparar uma senha hash", () => __awaiter(void 0, void 0, void 0, function* () {
        const hashManager = new HashManagerMock_1.HashManagerMock();
        const senhaTextoPlano = "fulano123";
        const senhaHash = "hash-mock-fulano";
        const resultado = yield hashManager.compare(senhaTextoPlano, senhaHash);
        expect(resultado).toBe(true);
    }));
});
//# sourceMappingURL=signup.test.js.map