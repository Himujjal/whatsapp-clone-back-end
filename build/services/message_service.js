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
exports.updateMessage = exports.createMessage = exports.updateMessagesReceivedByIds = exports.getMessageById = exports.getMessagesToFrom = void 0;
var message_model_1 = __importDefault(require("../models/message_model"));
function getMessagesToFrom(to, from) {
    return __awaiter(this, void 0, void 0, function () {
        var messages, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, message_model_1.default.find({
                            to: { $in: [to, from] },
                            from: { $in: [to, from] },
                        })];
                case 1:
                    messages = _a.sent();
                    return [2 /*return*/, messages];
                case 2:
                    err_1 = _a.sent();
                    throw new Error("Error getting messages : " + err_1.message);
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getMessagesToFrom = getMessagesToFrom;
function getMessageById(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, message_model_1.default.findById(id)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getMessageById = getMessageById;
function updateMessagesReceivedByIds(ids) {
    return __awaiter(this, void 0, void 0, function () {
        var messages;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, message_model_1.default.update({
                        _id: { $in: ids },
                    }, {
                        received: true,
                    })];
                case 1:
                    messages = _a.sent();
                    return [2 /*return*/, messages];
            }
        });
    });
}
exports.updateMessagesReceivedByIds = updateMessagesReceivedByIds;
function createMessage(_a) {
    var message = _a.message, to = _a.to, toName = _a.toName, fromName = _a.fromName, from = _a.from, timestamp = _a.timestamp;
    return __awaiter(this, void 0, void 0, function () {
        var resMessage, err_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, message_model_1.default.create({
                            to: to,
                            toName: toName,
                            from: from,
                            fromName: fromName,
                            message: message,
                            timestamp: timestamp,
                            received: false,
                        })];
                case 1:
                    resMessage = _b.sent();
                    return [2 /*return*/, resMessage];
                case 2:
                    err_2 = _b.sent();
                    throw new Error("Error creating messages : " + err_2.message);
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createMessage = createMessage;
function updateMessage(id) {
    return __awaiter(this, void 0, void 0, function () {
        var resMessage, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, message_model_1.default.findByIdAndUpdate(id, { received: true })];
                case 1:
                    resMessage = _a.sent();
                    return [2 /*return*/, resMessage];
                case 2:
                    err_3 = _a.sent();
                    throw new Error("Error updating messages : " + err_3.message);
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateMessage = updateMessage;
