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
exports.UserDatabase = void 0;
const BaseDatabase_1 = require("../BaseDatabase");
class UserDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.insertUser = (userDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(UserDatabase.TABLE_USER)
                .insert(userDB);
        });
        this.findUserByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            const [userDB] = yield BaseDatabase_1.BaseDatabase.connection(UserDatabase.TABLE_USER)
                .select()
                .where({ email });
            return userDB;
        });
    }
}
exports.UserDatabase = UserDatabase;
UserDatabase.TABLE_USER = "users";
//# sourceMappingURL=UserDatabase.js.map