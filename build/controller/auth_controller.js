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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config"));
var auth_service_1 = require("../services/auth_service");
var user_service_1 = require("../services/user_service");
var authRouter = express_1.default.Router();
authRouter.use(cors_1.default());
authRouter.post("/register", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, email, image, user, newUser, token, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password, email = _a.email, image = _a.image;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, user_service_1.getUserByUsername(username)];
            case 2:
                user = _b.sent();
                if (!(user != null)) return [3 /*break*/, 3];
                throw new Error("User already present");
            case 3: return [4 /*yield*/, user_service_1.createNewUser(username, password, email, image)];
            case 4:
                newUser = _b.sent();
                if (newUser) {
                    token = jsonwebtoken_1.default.sign({ username: username }, config_1.default.jwtSecret, {
                        expiresIn: "7d",
                    });
                    res.json({
                        token: token,
                        _id: newUser._id,
                        username: newUser.username,
                        lastSeen: newUser.lastSeen,
                    });
                }
                else {
                    throw new Error("Error creating new user");
                }
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                err_1 = _b.sent();
                res.status(403).json({ err: err_1.message });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
authRouter.post("/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, user, token, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_service_1.getUserByUsername(username, false)];
            case 2:
                user = _b.sent();
                if (password == user.password) {
                    token = jsonwebtoken_1.default.sign({ username: username }, config_1.default.jwtSecret, {
                        expiresIn: "7d",
                    });
                    res.json({
                        token: token,
                        _id: user._id,
                        username: user.username,
                        lastSeen: user.lastSeen,
                        email: user.email,
                        image: user.image,
                        officer: user.officer,
                    });
                }
                else {
                    throw new Error("Password doesn't match");
                }
                return [3 /*break*/, 4];
            case 3:
                err_2 = _b.sent();
                res.status(401).json({ err: err_2.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
authRouter.post("/refresh_token", function (req, res) {
    res.json('{"hello": "world"}');
});
authRouter.post("/forgot_password", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, info, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, auth_service_1.forgotPassword(username, password)];
            case 2:
                info = _b.sent();
                res.status(200).json(info);
                return [3 /*break*/, 4];
            case 3:
                err_3 = _b.sent();
                res.status(400).json({ err: err_3.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
authRouter.get("/reset/:token", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, user, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.params.token;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_service_1.getUserByToken(token)];
            case 2:
                user = _a.sent();
                if (user) {
                    res.redirect(config_1.default.redirectURL);
                }
                else {
                    res.send("<p>Something is wrong. Try again <a href=" + config_1.default.redirectURL + ">Click on this Link</a></p>");
                }
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                res.status(400).json({ err: err_4.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = authRouter;
