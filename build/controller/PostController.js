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
exports.PostController = void 0;
const createPost_dto_1 = require("../dto/post/createPost.dto");
const zod_1 = require("zod");
const BaseError_1 = require("../errors/BaseError");
const getPost_dto_1 = require("../dto/post/getPost.dto");
const deletePost_dto_1 = require("../dto/post/deletePost.dto");
const likeOrDislikePost_dto_1 = require("../dto/post/likeOrDislikePost.dto");
const getLikeDislike_dto_1 = require("../dto/post/getLikeDislike.dto");
class PostController {
    constructor(postBusiness) {
        this.postBusiness = postBusiness;
        this.createPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = createPost_dto_1.CreatePostSchema.parse({
                    content: req.body.content,
                    token: req.headers.authorization
                });
                if (input.content.length > 480) {
                    res.status(400).send("O conteúdo do post não pode exceder 480 caracteres.");
                    return;
                }
                const output = yield this.postBusiness.createPost(input);
                res.status(201).send({
                    message: "Postagem realizada com sucesso!",
                    data: output
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
        this.getPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = getPost_dto_1.GetPostSchema.parse({
                    token: req.headers.authorization
                });
                const output = yield this.postBusiness.getPosts(input);
                res.status(201).send(output);
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
        this.deletePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = deletePost_dto_1.DeletePostSchema.parse({
                    token: req.headers.authorization,
                    idToDelete: req.params.id
                });
                const output = yield this.postBusiness.deletePost(input);
                res.status(200).send({
                    messege: "Postagem deletada com sucesso!",
                    data: output
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
        this.likeOrDislikePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = likeOrDislikePost_dto_1.LikeOrDislikePostSchema.parse({
                    postId: req.params.id,
                    token: req.headers.authorization,
                    like: req.body.like
                });
                const output = yield this.postBusiness.likeOrDislikePost(input);
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
        this.getLikeDislike = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = getLikeDislike_dto_1.GetLikeDislikeSchema.parse({
                    postId: req.params.postId,
                    userId: req.params.userId,
                    token: req.headers.authorization
                });
                const output = yield this.postBusiness.getLikeDislike(input);
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
exports.PostController = PostController;
//# sourceMappingURL=PostController.js.map