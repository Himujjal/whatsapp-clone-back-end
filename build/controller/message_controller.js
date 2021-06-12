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
var jwt_middleware_1 = require("../middlewares/jwt_middleware");
var message_service_1 = require("../services/message_service");
var user_service_1 = require("../services/user_service");
var messageRouter = express_1.default.Router();
messageRouter.use(cors_1.default());
messageRouter.use(jwt_middleware_1.verifyToken);
messageRouter.get("/", function (req, res) {
    res.json({ test: "complete" });
});
// new message
messageRouter.post("/create", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, message, to, toName, timestamp, officer, user, from, fromName, mess, newMessage, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, message = _a.message, to = _a.to, toName = _a.toName, timestamp = _a.timestamp, officer = _a.officer;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, user_service_1.getUserByUsername(req.username, officer)];
            case 2:
                user = _b.sent();
                from = user._id;
                fromName = user.username;
                mess = {
                    message: message,
                    to: to,
                    toName: toName,
                    from: from,
                    fromName: fromName,
                    timestamp: timestamp,
                };
                return [4 /*yield*/, message_service_1.createMessage(mess)];
            case 3:
                newMessage = _b.sent();
                res.status(200).json(newMessage);
                return [3 /*break*/, 5];
            case 4:
                err_1 = _b.sent();
                res.status(402).json({ err: err_1.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// update messages as seen
messageRouter.post("/update_messages", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ids_1;
    return __generator(this, function (_a) {
        try {
            ids_1 = req.body.ids;
            message_service_1.updateMessagesReceivedByIds(ids_1).then(function (_) {
                res.status(200).json({ ids: ids_1 });
            });
        }
        catch (err) {
            res.status(404).json({ err: err.message });
        }
        return [2 /*return*/];
    });
}); });
// update a message as seen
messageRouter.get("/update_message/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var message, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, message_service_1.updateMessage(req.params.id)];
            case 1:
                message = _a.sent();
                res.status(200).json(message);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(404).json({ err: err_2.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// get message by id
messageRouter.get("/get/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var message, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, message_service_1.getMessageById(req.params.id)];
            case 1:
                message = _a.sent();
                res.json(message);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(405).json({ err: err_3.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// get all messages from-to
messageRouter.get("/get_from_to/:from/:to", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, from, to, messages, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, from = _a.from, to = _a.to;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, message_service_1.getMessagesToFrom(to, from)];
            case 2:
                messages = _b.sent();
                res.json(messages);
                return [3 /*break*/, 4];
            case 3:
                err_4 = _b.sent();
                res.status(405).json({ err: err_4.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = messageRouter;
