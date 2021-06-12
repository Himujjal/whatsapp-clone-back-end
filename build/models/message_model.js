"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var messageSchema = new mongoose_1.default.Schema({
    message: String,
    from: String,
    fromName: String,
    to: String,
    toName: String,
    timestamp: String,
    received: Boolean
});
exports.default = mongoose_1.default.model("message", messageSchema);
