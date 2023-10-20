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
exports.CommentBusiness = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
const NotFoundError_1 = require("../errors/NotFoundError");
const Comments_1 = require("../models/Comments");
const Posts_1 = require("../models/Posts");
const Users_1 = require("../models/Users");
const UnauthorizedError_1 = require("../errors/UnauthorizedError");
class CommentBusiness {
    constructor(commentDatabase, postDatabase, idGenerator, tokenManager) {
        this.commentDatabase = commentDatabase;
        this.postDatabase = postDatabase;
        this.idGenerator = idGenerator;
        this.tokenManager = tokenManager;
        this.createComment = (input) => __awaiter(this, void 0, void 0, function* () {
            const { id, token, content } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("O campo 'token' é obrigatório.");
            }
            if (content.length === 0) {
                throw new BadRequestError_1.BadRequestError("O campo 'content' não pode estar vazio.");
            }
            const tokenPayload = this.tokenManager.getPayload(token);
            if (!tokenPayload) {
                throw new BadRequestError_1.BadRequestError("Token inválido ou expirado.");
            }
            const post = yield this.commentDatabase.findPost(id);
            if (!post) {
                throw new NotFoundError_1.NotFoundError("Post não encontrado.");
            }
            const commentId = this.idGenerator.generate();
            const creatorId = tokenPayload.id;
            const creatorName = tokenPayload.name;
            const comment = new Comments_1.Comment(commentId, id, content, 0, 0, new Date().toISOString(), new Date().toISOString(), creatorId, creatorName);
            const newCommentDB = comment.toCommentDB();
            yield this.commentDatabase.insertComment(newCommentDB);
            const updateCommentCount = new Posts_1.Post(post.id, post.content, post.likes, post.dislikes, post.comments_post, post.created_at, post.updated_at, post.creator_id, post.creator_name);
            updateCommentCount.addCommentsPosts();
            const postDB = updateCommentCount.toDBModel();
            yield this.postDatabase.updatePost(postDB);
            const output = undefined;
            return output;
        });
        this.getComment = (input) => __awaiter(this, void 0, void 0, function* () {
            const { id, token } = input;
            if (token === undefined) {
                throw new BadRequestError_1.BadRequestError("O campo 'token' é obrigatório.");
            }
            const tokenPayload = this.tokenManager.getPayload(token);
            if (tokenPayload === null) {
                throw new BadRequestError_1.BadRequestError("'token' inválido");
            }
            const commentsDB = yield this.commentDatabase.getComment(id);
            if (!commentsDB) {
                throw new NotFoundError_1.NotFoundError("'id' não encontrado");
            }
            const comments = commentsDB.map((commentDB) => {
                const comment = new Comments_1.Comment(commentDB.id, commentDB.post_id, commentDB.content, commentDB.likes, commentDB.dislikes, commentDB.created_at, commentDB.updated_at, commentDB.creator_id, commentDB.creator_name);
                return comment.toModel();
            });
            const output = comments;
            return output;
        });
        this.deleteComment = (input) => __awaiter(this, void 0, void 0, function* () {
            const { commentId, postId, token } = input;
            if (token === undefined) {
                throw new BadRequestError_1.BadRequestError("O campo 'token' é obrigatório.");
            }
            const tokenPayload = this.tokenManager.getPayload(token);
            if (tokenPayload === null) {
                throw new BadRequestError_1.BadRequestError("'token' inválido");
            }
            const commentToDeleteDB = yield this.commentDatabase.findComment(commentId);
            if (!commentToDeleteDB) {
                throw new NotFoundError_1.NotFoundError("'id' não encontrado");
            }
            const creatorId = tokenPayload.id;
            if (tokenPayload.role !== Users_1.USER_ROLES.ADMIN &&
                commentToDeleteDB.creator_id !== creatorId) {
                throw new BadRequestError_1.BadRequestError("usuário não autorizado a deletar este post");
            }
            yield this.commentDatabase.deleteComment(commentId);
            const post = yield this.commentDatabase.findPost(postId);
            if (!post) {
                throw new NotFoundError_1.NotFoundError("Post não encontrado.");
            }
            const updateCommentCount = new Posts_1.Post(post.id, post.content, post.likes, post.dislikes, post.comments_post, post.created_at, post.updated_at, post.creator_id, post.creator_name);
            updateCommentCount.removeCommentsPosts();
            const postDB = updateCommentCount.toDBModel();
            yield this.postDatabase.updatePost(postDB);
            const output = undefined;
            return output;
        });
        this.likeOrDislikeComment = (input) => __awaiter(this, void 0, void 0, function* () {
            const { commentId, token, like } = input;
            if (token === undefined) {
                throw new BadRequestError_1.BadRequestError("O campo 'token' é obrigatório.");
            }
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError("'token' inválido");
            }
            const commentDBWithCreatorName = yield this.commentDatabase.findCommentWithCreatorId(commentId);
            if (!commentDBWithCreatorName) {
                throw new NotFoundError_1.NotFoundError("'id' não encontrado");
            }
            const comment = new Comments_1.Comment(commentDBWithCreatorName.id, commentDBWithCreatorName.post_id, commentDBWithCreatorName.content, commentDBWithCreatorName.likes, commentDBWithCreatorName.dislikes, commentDBWithCreatorName.created_at, commentDBWithCreatorName.updated_at, commentDBWithCreatorName.creator_id, commentDBWithCreatorName.creator_name);
            const likeDB = like ? 1 : 0;
            const likeDislikeCommentsDB = {
                user_id: payload.id,
                comments_id: commentId,
                like: likeDB
            };
            const likeDislikeExists = yield this.commentDatabase.findLikeDislike(likeDislikeCommentsDB);
            if (likeDislikeExists === Comments_1.COMMENT_LIKE.ON_LIKED) {
                if (like) {
                    yield this.commentDatabase.removeLikeDislike(likeDislikeCommentsDB);
                    comment.removeLike();
                }
                else {
                    yield this.commentDatabase.updateLikeDislike(likeDislikeCommentsDB);
                    comment.removeLike();
                    comment.addDislike();
                }
            }
            else if (likeDislikeExists === Comments_1.COMMENT_LIKE.ON_DISLIKED) {
                if (!like) {
                    yield this.commentDatabase.removeLikeDislike(likeDislikeCommentsDB);
                    comment.removeDislike();
                }
                else {
                    yield this.commentDatabase.updateLikeDislike(likeDislikeCommentsDB);
                    comment.removeDislike();
                    comment.addLike();
                }
            }
            else {
                yield this.commentDatabase.likeOrDislikeComment(likeDislikeCommentsDB);
                like ? comment.addLike() : comment.addDislike();
            }
            const updateCommentDB = comment.toCommentDB();
            yield this.commentDatabase.updateComment(updateCommentDB);
            const output = undefined;
            return output;
        });
        this.getLikeDislikeComment = (input) => __awaiter(this, void 0, void 0, function* () {
            const { commentId, userId, token } = input;
            const userToken = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new UnauthorizedError_1.UnauthorizedError("Token inválido ou expirado. Faça login novamente.");
            }
            const likeDislikeDB = {
                user_id: userToken.id,
                comments_id: commentId,
                like: 1
            };
            const likeDislikeExists = yield this.commentDatabase.findLikeDislike(likeDislikeDB);
            return likeDislikeExists;
        });
    }
}
exports.CommentBusiness = CommentBusiness;
//# sourceMappingURL=CommentBusiness.js.map