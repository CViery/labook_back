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
exports.CommentController = void 0;
const BaseError_1 = require("../errors/BaseError");
const createComment_dto_1 = require("../dto/comment/createComment.dto");
const zod_1 = require("zod");
const getComment_dto_1 = require("../dto/comment/getComment.dto");
const deleteComment_dto_1 = require("../dto/comment/deleteComment.dto");
const likeOrDislikeComment_dto_1 = require("../dto/comment/likeOrDislikeComment.dto");
const getLikeDislike_dto_1 = require("../dto/comment/getLikeDislike.dto");
class CommentController {
    constructor(commentBusiness) {
        this.commentBusiness = commentBusiness;
        this.createComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = createComment_dto_1.CreateCommentSchema.parse({
                    id: req.params.id,
                    token: req.headers.authorization,
                    content: req.body.content
                });
                if (input.content.length > 480) {
                    res.status(400).send("O conteúdo do post não pode exceder 480 caracteres.");
                    return;
                }
                const output = yield this.commentBusiness.createComment(input);
                res.status(201).send({
                    message: "Comentário criado com sucesso!",
                    output
                });
            }
            catch (error) {
                console.log(error);
                if (error instanceof zod_1.ZodError) {
                    res.status(400).send(error.issues);
                }
                else if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
        this.getComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = getComment_dto_1.GetCommentSchema.parse({
                    id: req.params.id,
                    token: req.headers.authorization
                });
                const output = yield this.commentBusiness.getComment(input);
                res.status(200).send(output);
            }
            catch (error) {
                console.log(error);
                if (error instanceof zod_1.ZodError) {
                    res.status(400).send(error.issues);
                }
                else if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
        this.deleteComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = deleteComment_dto_1.DeleteCommentSchema.parse({
                    commentId: req.params.commentId,
                    postId: req.params.postId,
                    token: req.headers.authorization
                });
                const output = yield this.commentBusiness.deleteComment(input);
                res.status(200).send({
                    message: "Comentário deletado com sucesso!",
                    output
                });
            }
            catch (error) {
                console.log(error);
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
        this.likeOrDislikeComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = likeOrDislikeComment_dto_1.LikeOrDislikeCommentSchema.parse({
                    commentId: req.params.id,
                    token: req.headers.authorization,
                    like: req.body.like
                });
                const output = yield this.commentBusiness.likeOrDislikeComment(input);
                let message;
                if (input.like) {
                    message = "Comentário curtido com sucesso!";
                }
                else {
                    message = "Comentário descurtido com sucesso!";
                }
                res.status(200).send({
                    message,
                    output
                });
            }
            catch (error) {
                console.log(error);
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
        this.getLikeDislikeComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = getLikeDislike_dto_1.GetLikeDislikeSchema.parse({
                    userId: req.params.userId,
                    commentId: req.params.commentId,
                    token: req.headers.authorization
                });
                const output = yield this.commentBusiness.getLikeDislikeComment(input);
                res.status(200).send(output);
            }
            catch (error) {
                console.log(error);
                if (error instanceof zod_1.ZodError) {
                    res.status(400).send(error.issues);
                }
                else if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
    }
}
exports.CommentController = CommentController;
//# sourceMappingURL=CommentController.js.map