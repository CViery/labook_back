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
exports.CommentDatabase = void 0;
const Comments_1 = require("../../models/Comments");
const BaseDatabase_1 = require("../BaseDatabase");
const UserDatabase_1 = require("./UserDatabase");
class CommentDatabase extends BaseDatabase_1.BaseDatabase {
    insertComment(post) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(CommentDatabase.TABLE_COMMENT)
                .insert(post);
        });
    }
    findPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [postDB] = yield BaseDatabase_1.BaseDatabase
                .connection(CommentDatabase.TABLE_POST)
                .where({ id: id });
            return postDB;
        });
    }
    getComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase
                .connection(CommentDatabase.TABLE_COMMENT)
                .select(`${CommentDatabase.TABLE_COMMENT}.id`, `${CommentDatabase.TABLE_COMMENT}.post_id`, `${CommentDatabase.TABLE_COMMENT}.content`, `${CommentDatabase.TABLE_COMMENT}.likes`, `${CommentDatabase.TABLE_COMMENT}.dislikes`, `${CommentDatabase.TABLE_COMMENT}.created_at`, `${CommentDatabase.TABLE_COMMENT}.updated_at`, `${CommentDatabase.TABLE_COMMENT}.creator_id`, `${UserDatabase_1.UserDatabase.TABLE_USER}.name as creator_name`).join(`${UserDatabase_1.UserDatabase.TABLE_USER}`, `${CommentDatabase.TABLE_COMMENT}.creator_id`, "=", `${UserDatabase_1.UserDatabase.TABLE_USER}.id`).where({
                post_id: id
            }).orderBy("likes", "desc");
            return result;
        });
    }
    findComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [commentDB] = yield BaseDatabase_1.BaseDatabase
                .connection(CommentDatabase.TABLE_COMMENT)
                .where({ id: id });
            return commentDB;
        });
    }
    updateComment(commentDB) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(CommentDatabase.TABLE_COMMENT)
                .update(commentDB)
                .where({ id: commentDB.id });
        });
    }
    deleteComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(CommentDatabase.TABLE_COMMENT_LIKES_DISLIKES)
                .delete()
                .where({ comments_id: id });
            yield BaseDatabase_1.BaseDatabase
                .connection(CommentDatabase.TABLE_COMMENT)
                .delete()
                .where({ id: id });
        });
    }
    findCommentWithCreatorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield BaseDatabase_1.BaseDatabase
                .connection(CommentDatabase.TABLE_COMMENT)
                .select(`${CommentDatabase.TABLE_COMMENT}.id`, `${CommentDatabase.TABLE_COMMENT}.post_id`, `${CommentDatabase.TABLE_COMMENT}.content`, `${CommentDatabase.TABLE_COMMENT}.likes`, `${CommentDatabase.TABLE_COMMENT}.dislikes`, `${CommentDatabase.TABLE_COMMENT}.created_at`, `${CommentDatabase.TABLE_COMMENT}.updated_at`, `${CommentDatabase.TABLE_COMMENT}.creator_id`, `${UserDatabase_1.UserDatabase.TABLE_USER}.name as creator_name`)
                .join(`${UserDatabase_1.UserDatabase.TABLE_USER}`, `${CommentDatabase.TABLE_COMMENT}.creator_id`, "=", `${UserDatabase_1.UserDatabase.TABLE_USER}.id`)
                .where({ [`${CommentDatabase.TABLE_COMMENT}.id`]: id });
            return result;
        });
    }
    likeOrDislikeComment(likeDislikeCommentsDB) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(CommentDatabase.TABLE_COMMENT_LIKES_DISLIKES)
                .insert(likeDislikeCommentsDB);
        });
    }
    findLikeDislike(likeDislikeCommentsDB) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield BaseDatabase_1.BaseDatabase
                .connection(CommentDatabase.TABLE_COMMENT_LIKES_DISLIKES)
                .select()
                .where({
                user_id: likeDislikeCommentsDB.user_id,
                comments_id: likeDislikeCommentsDB.comments_id
            });
            if (result === undefined) {
                return undefined;
            }
            else if (result.like === 1) {
                return Comments_1.COMMENT_LIKE.ON_LIKED;
            }
            else {
                return Comments_1.COMMENT_LIKE.ON_DISLIKED;
            }
        });
    }
    removeLikeDislike(likeDislikeCommentsDB) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(CommentDatabase.TABLE_COMMENT_LIKES_DISLIKES)
                .delete()
                .where({
                user_id: likeDislikeCommentsDB.user_id,
                comments_id: likeDislikeCommentsDB.comments_id
            });
        });
    }
    updateLikeDislike(likeDislikeCommentsDB) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(CommentDatabase.TABLE_COMMENT_LIKES_DISLIKES)
                .update(likeDislikeCommentsDB)
                .where({
                user_id: likeDislikeCommentsDB.user_id,
                comments_id: likeDislikeCommentsDB.comments_id
            });
        });
    }
}
exports.CommentDatabase = CommentDatabase;
CommentDatabase.TABLE_COMMENT = "comments";
CommentDatabase.TABLE_COMMENT_LIKES_DISLIKES = "comment_likes_dislikes";
CommentDatabase.TABLE_POST = "posts";
//# sourceMappingURL=CommentDatabase.js.map