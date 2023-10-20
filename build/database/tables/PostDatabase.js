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
exports.PostDatabase = void 0;
const Posts_1 = require("../../models/Posts");
const BaseDatabase_1 = require("../BaseDatabase");
const UserDatabase_1 = require("./UserDatabase");
class PostDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.insertPost = (postDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.TABLE_POST)
                .insert(postDB);
        });
        this.findPostById = (id) => __awaiter(this, void 0, void 0, function* () {
            const [result] = yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.TABLE_POST)
                .select()
                .where({ id });
            return result;
        });
        this.updatePost = (postDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.TABLE_POST)
                .update(postDB)
                .where({ id: postDB.id });
        });
        this.deletePostById = (id) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(PostDatabase.TABLE_POST)
                .delete()
                .where({ id });
        });
        this.findPostCreatorById = (id) => __awaiter(this, void 0, void 0, function* () {
            const [result] = yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.TABLE_POST)
                .select(`${PostDatabase.TABLE_POST}.id`, `${PostDatabase.TABLE_POST}.content`, `${PostDatabase.TABLE_POST}.likes`, `${PostDatabase.TABLE_POST}.dislikes`, `${PostDatabase.TABLE_POST}.comments_post`, `${PostDatabase.TABLE_POST}.
                created_at`, `${PostDatabase.TABLE_POST}.updated_at`, `${PostDatabase.TABLE_POST}.creator_id`, `${UserDatabase_1.UserDatabase.TABLE_USER}.name as creator_name`)
                .join(`${UserDatabase_1.UserDatabase.TABLE_USER}`, `${PostDatabase.TABLE_POST}.creator_id`, "=", `${UserDatabase_1.UserDatabase.TABLE_USER}.id`)
                .where({ [`${PostDatabase.TABLE_POST}.id`]: id });
            return result;
        });
        this.findLikeDislike = (likeDislikeDB) => __awaiter(this, void 0, void 0, function* () {
            const [result] = yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.TABLE_POST_LIKES_DISLIKES)
                .select()
                .where({
                user_id: likeDislikeDB.user_id,
                post_id: likeDislikeDB.post_id
            });
            if (result === undefined) {
                return undefined;
            }
            else if (result.like === 1) {
                return Posts_1.POST_LIKE.ON_LIKED;
            }
            else {
                return Posts_1.POST_LIKE.ON_DISLIKED;
            }
        });
        this.removeLikeDislike = (likeDislikeDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.TABLE_POST_LIKES_DISLIKES)
                .delete()
                .where({
                user_id: likeDislikeDB.user_id,
                post_id: likeDislikeDB.post_id
            });
        });
        this.updatedLikeDislike = (likeDislikeDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.TABLE_POST_LIKES_DISLIKES)
                .update(likeDislikeDB)
                .where({
                user_id: likeDislikeDB.user_id,
                post_id: likeDislikeDB.post_id
            });
        });
        this.insertLikeDislike = (likeDislikeDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.TABLE_POST_LIKES_DISLIKES)
                .insert(likeDislikeDB);
        });
    }
    getPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.TABLE_POST)
                .select(`${PostDatabase.TABLE_POST}.id`, `${PostDatabase.TABLE_POST}.creator_id`, `${PostDatabase.TABLE_POST}.content`, `${PostDatabase.TABLE_POST}.likes`, `${PostDatabase.TABLE_POST}.dislikes`, `${PostDatabase.TABLE_POST}.comments_post`, `${PostDatabase.TABLE_POST}.created_at`, `${PostDatabase.TABLE_POST}.updated_at`, `${UserDatabase_1.UserDatabase.TABLE_USER}.name as creator_name`)
                .join(`${UserDatabase_1.UserDatabase.TABLE_USER}`, `${PostDatabase.TABLE_POST}.creator_id`, "=", `${UserDatabase_1.UserDatabase.TABLE_USER}.id`).orderBy("likes", "desc");
            return result;
        });
    }
}
exports.PostDatabase = PostDatabase;
PostDatabase.TABLE_POST = "posts";
PostDatabase.TABLE_POST_LIKES_DISLIKES = "post_likes_dislikes";
PostDatabase.TABLE_COMMENTS = "comments";
//# sourceMappingURL=PostDatabase.js.map