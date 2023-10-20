"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenManagerMock = void 0;
const Users_1 = require("../../src/models/Users");
class TokenManagerMock {
    constructor() {
        this.createToken = (payload) => {
            if (payload.id === "id-mock") {
                return "token-mock";
            }
            else if (payload.id === "id-mock-fulano") {
                return "token-mock-fulano";
            }
            else {
                return "token-mock-astrodev";
            }
        };
        this.getPayload = (token) => {
            if (token === "token-mock-fulano") {
                return {
                    id: "id-mock-fulano",
                    name: "Fulano",
                    role: Users_1.USER_ROLES.NORMAL
                };
            }
            else if (token === "token-mock-astrodev") {
                return {
                    id: "id-mock-astrodev",
                    name: "Astrodev",
                    role: Users_1.USER_ROLES.ADMIN
                };
            }
            else {
                return null;
            }
        };
    }
}
exports.TokenManagerMock = TokenManagerMock;
//# sourceMappingURL=TokenManagerMock.js.map