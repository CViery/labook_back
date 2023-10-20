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
exports.PostBusiness = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
const ForbiddenError_1 = require("../errors/ForbiddenError");
const NotFoundError_1 = require("../errors/NotFoundError");
const UnauthorizedError_1 = require("../errors/UnauthorizedError");
const Posts_1 = require("../models/Posts");
const Users_1 = require("../models/Users");
class PostBusiness {
    constructor(postDatabase, idGenerator, tokenManager) {
        this.postDatabase = postDatabase;
        this.idGenerator = idGenerator;
        this.tokenManager = tokenManager;
        this.createPost = (input) => __awaiter(this, void 0, void 0, function* () {
            const { content, token } = input;
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new UnauthorizedError_1.UnauthorizedError("Token inválido ou expirado. Faça login novamente.");
            }
            const tokenPayload = this.tokenManager.getPayload(token);
            if (tokenPayload === null) {
                throw new BadRequestError_1.BadRequestError("'token' inválido");
            }
            const id = this.idGenerator.generate();
            const creatorId = tokenPayload.id;
            const creatorName = tokenPayload.name;
            const post = new Posts_1.Post(id, content, 0, 0, 0, new Date().toISOString(), new Date().toISOString(), creatorId, creatorName);
            const postDB = post.toDBModel();
            yield this.postDatabase.insertPost(postDB);
            const output = undefined;
            return output;
        });
        this.getPosts = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token } = input;
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new UnauthorizedError_1.UnauthorizedError("Token inválido ou expirado. Faça login novamente.");
            }
            const postsDB = yield this.postDatabase.getPosts();
            const posts = postsDB.map((postsDB) => {
                const post = new Posts_1.Post(postsDB.id, postsDB.content, postsDB.likes, postsDB.dislikes, postsDB.comments_post, postsDB.created_at, postsDB.updated_at, postsDB.creator_id, postsDB.creator_name);
                return post.toModel();
            });
            const output = posts;
            return output;
        });
        this.deletePost = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, idToDelete } = input;
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new UnauthorizedError_1.UnauthorizedError("Token inválido ou expirado. Faça login novamente.");
            }
            const postDB = yield this.postDatabase.findPostById(idToDelete);
            if (!postDB) {
                throw new NotFoundError_1.NotFoundError("Postagem não encontrada.");
            }
            if (payload.role !== Users_1.USER_ROLES.ADMIN) {
                if (payload.id !== postDB.creator_id) {
                    throw new ForbiddenError_1.ForbiddenError("Você não tem permissão para excluir esta postagem");
                }
            }
            yield this.postDatabase.deletePostById(idToDelete);
            const output = undefined;
            return output;
        });
        this.likeOrDislikePost = (input) => __awaiter(this, void 0, void 0, function* () {
            const { postId, token, like } = input;
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new UnauthorizedError_1.UnauthorizedError("Token inválido ou expirado. Faça login novamente.");
            }
            const postDBWithCreatorName = yield this.postDatabase.findPostCreatorById(postId);
            if (!postDBWithCreatorName) {
                throw new NotFoundError_1.NotFoundError("Postagem não encontrada.");
            }
            const post = new Posts_1.Post(postDBWithCreatorName.id, postDBWithCreatorName.content, postDBWithCreatorName.likes, postDBWithCreatorName.dislikes, postDBWithCreatorName.comments_post, postDBWithCreatorName.created_at, postDBWithCreatorName.updated_at, postDBWithCreatorName.creator_id, postDBWithCreatorName.creator_name);
            const likeSQLite = like ? 1 : 0;
            const likeDislikeDB = {
                user_id: payload.id,
                post_id: postId,
                like: likeSQLite
            };
            const likeDislikeExists = yield this.postDatabase.findLikeDislike(likeDislikeDB);
            if (likeDislikeExists === Posts_1.POST_LIKE.ON_LIKED) {
                if (like) {
                    yield this.postDatabase.removeLikeDislike(likeDislikeDB);
                    post.removeLike();
                }
                else {
                    yield this.postDatabase.updatedLikeDislike(likeDislikeDB);
                    post.removeLike();
                    post.addDislike();
                }
            }
            else if (likeDislikeExists === Posts_1.POST_LIKE.ON_DISLIKED) {
                if (!like) {
                    yield this.postDatabase.removeLikeDislike(likeDislikeDB);
                    post.removeDislike();
                }
                else {
                    yield this.postDatabase.updatedLikeDislike(likeDislikeDB);
                    post.removeDislike();
                    post.addLike();
                }
            }
            else {
                yield this.postDatabase.insertLikeDislike(likeDislikeDB);
                like ? post.addLike() : post.addDislike();
            }
            const updatedPostDB = post.toDBModel();
            yield this.postDatabase.updatePost(updatedPostDB);
            const output = undefined;
            return output;
        });
        this.getLikeDislike = (input) => __awaiter(this, void 0, void 0, function* () {
            const { postId, userId, token } = input;
            const userToken = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new UnauthorizedError_1.UnauthorizedError("Token inválido ou expirado. Faça login novamente.");
            }
            const likeDislikeDB = {
                user_id: userToken.id,
                post_id: postId,
                like: 1
            };
            const likeDislikeExists = yield this.postDatabase.findLikeDislike(likeDislikeDB);
            return likeDislikeExists;
        });
    }
}
exports.PostBusiness = PostBusiness;
//# sourceMappingURL=PostBusiness.js.map