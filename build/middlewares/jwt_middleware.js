"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config"));
function verifyToken(req, res, next) {
    var bearerHeader = req.headers["authorization"] || req.headers["Authorization"];
    if (bearerHeader != null) {
        if (typeof bearerHeader == "string") {
            var token_1 = bearerHeader.split(" ")[1];
            jsonwebtoken_1.default.verify(token_1, config_1.default.jwtSecret, function (err, authData) {
                if (err) {
                    res.status(401).json({ err: "Error authentication" });
                }
                else {
                    req.token = token_1;
                    req.username = authData.username;
                    next();
                }
            });
        }
        else {
            res.status(401).json({ err: "Error authentication" });
        }
    }
    else {
        res.status(401).json({ err: "Error authentication" });
    }
}
exports.verifyToken = verifyToken;
