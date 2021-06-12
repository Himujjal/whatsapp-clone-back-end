"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var products_model_1 = require("./products_model");
var userSchema = new mongoose_1.default.Schema({
    username: String,
    password: String,
    email: String,
    image: String,
    lastSeen: String,
    officer: Boolean,
    // would have used string id array. but since the objects are small.
    // this would do for now
    products: [products_model_1.productSchema],
    resetPasswordExpires: Number,
    resetPasswordToken: String,
});
exports.default = mongoose_1.default.model("user", userSchema);
