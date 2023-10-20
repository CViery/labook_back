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
exports.PostDatabaseMock = void 0;
const BaseDatabase_1 = require("../../src/database/BaseDatabase");
const postMock = [
    {
        id: 'post-id-1',
        creator_id: 'user-id-1',
        content: 'Este é o conteúdo do primeiro post.',
        likes: 10,
        dislikes: 2,
        comments_post: 5,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: 'post-id-2',
        creator_id: 'user-id-2',
        content: 'Este é o conteúdo do segundo post.',
        likes: 20,
        dislikes: 1,
        comments_post: 8,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
];
class PostDatabaseMock extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.getPosts = () => __awaiter(this, void 0, void 0, function* () {
            return postMock;
        });
    }
}
exports.PostDatabaseMock = PostDatabaseMock;
//# sourceMappingURL=PostDatabaseMock.js.map