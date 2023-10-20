"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = exports.COMMENT_LIKE = void 0;
var COMMENT_LIKE;
(function (COMMENT_LIKE) {
    COMMENT_LIKE["ON_LIKED"] = "already liked";
    COMMENT_LIKE["ON_DISLIKED"] = "already disliked";
})(COMMENT_LIKE || (exports.COMMENT_LIKE = COMMENT_LIKE = {}));
class Comment {
    constructor(id, postId, content, likes, dislikes, createdAt, updatedAt, creatorId, creatorName) {
        this.id = id;
        this.postId = postId;
        this.content = content;
        this.likes = likes;
        this.dislikes = dislikes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.creatorId = creatorId;
        this.creatorName = creatorName;
        this.addLike = () => {
            this.likes++;
        };
        this.removeLike = () => {
            this.likes--;
        };
        this.addDislike = () => {
            this.dislikes++;
        };
        this.removeDislike = () => {
            this.dislikes--;
        };
    }
    getId() {
        return this.id;
    }
    setId(value) {
        this.id = value;
    }
    getPostId() {
        return this.postId;
    }
    setPostId(value) {
        this.postId = value;
    }
    getContent() {
        return this.content;
    }
    setContent(value) {
        this.content = value;
    }
    getLikes() {
        return this.likes;
    }
    setLikes(value) {
        this.likes = value;
    }
    getDislikes() {
        return this.dislikes;
    }
    setDislikes(value) {
        this.dislikes = value;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    setCreatedAt(value) {
        this.createdAt = value;
    }
    getUpdatedAt() {
        return this.updatedAt;
    }
    setUpdatedAt(value) {
        this.updatedAt = value;
    }
    getCreatorId() {
        return this.creatorId;
    }
    setCreatorId(value) {
        this.creatorId = value;
    }
    getCreatorName() {
        return this.creatorName;
    }
    setCreatorName(value) {
        this.creatorName = value;
    }
    toCommentDB() {
        return {
            id: this.id,
            creator_id: this.creatorId,
            post_id: this.postId,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        };
    }
    toModel() {
        return {
            id: this.id,
            postId: this.postId,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            creator: {
                id: this.creatorId,
                name: this.creatorName
            }
        };
    }
}
exports.Comment = Comment;
//# sourceMappingURL=Comments.js.map