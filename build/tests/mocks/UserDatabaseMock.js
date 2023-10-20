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
exports.UserDatabaseMock = void 0;
const Users_1 = require("../../src/models/Users");
const BaseDatabase_1 = require("../../src/database/BaseDatabase");
const usersMock = [
    {
        id: "id-mock-fulano",
        name: "Fulano",
        email: "fulano@email.com",
        password: "hash-mock-fulano",
        created_at: new Date().toISOString(),
        role: Users_1.USER_ROLES.NORMAL
    },
    {
        id: "id-mock-astrodev",
        name: "Astrodev",
        email: "astrodev@email.com",
        password: "hash-mock-astrodev",
        created_at: new Date().toISOString(),
        role: Users_1.USER_ROLES.ADMIN
    },
];
class UserDatabaseMock extends BaseDatabase_1.BaseDatabase {
    insertUser(newUserDB) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return usersMock.filter(user => user.email === email)[0];
        });
    }
}
exports.UserDatabaseMock = UserDatabaseMock;
//# sourceMappingURL=UserDatabaseMock.js.map