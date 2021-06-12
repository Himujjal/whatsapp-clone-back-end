"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.getAllUsers = exports.getUserByToken = exports.getUserById = exports.getUserByUsername = exports.updateUser = exports.createNewOfficer = exports.createNewUser = void 0;
var user_model_1 = __importDefault(require("../models/user_model"));
function createNewUser(username, password, email, image) {
    return __awaiter(this, void 0, void 0, function () {
        var newUserObj, user, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    newUserObj = {
                        username: username,
                        password: password,
                        lastSeen: new Date().toUTCString(),
                        officer: false,
                        email: email,
                        image: image,
                        products: [],
                        resetPasswordToken: "",
                        resetPasswordExpires: 0,
                    };
                    return [4 /*yield*/, user_model_1.default.create(newUserObj)];
                case 1:
                    user = _a.sent();
                    delete newUserObj.password;
                    return [2 /*return*/, __assign({ _id: user._id }, newUserObj)];
                case 2:
                    err_1 = _a.sent();
                    throw new Error("Error creating user: " + err_1.message);
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createNewUser = createNewUser;
function createNewOfficer(username, password) {
    return __awaiter(this, void 0, void 0, function () {
        var user, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, user_model_1.default.create({
                            username: username,
                            password: password,
                            lastSeen: new Date().toUTCString(),
                            officer: true,
                        })];
                case 1:
                    user = _a.sent();
                    return [2 /*return*/, {
                            _id: user._id,
                            username: user.username,
                            lastSeen: user.lastSeen,
                            officer: false,
                            resetPasswordToken: user.resetPasswordToken,
                            resetPasswordExpires: user.resetPasswordExpires,
                            products: user.products,
                            email: user.email,
                            image: user.image,
                        }];
                case 2:
                    err_2 = _a.sent();
                    throw new Error("Error creating user: " + err_2.message);
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createNewOfficer = createNewOfficer;
function updateUser(_a) {
    var id = _a.id, username = _a.username, lastSeen = _a.lastSeen, email = _a.email, image = _a.image, resetPasswordToken = _a.resetPasswordToken, resetPasswordExpires = _a.resetPasswordExpires;
    return __awaiter(this, void 0, void 0, function () {
        var newUserObj, err_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    newUserObj = {
                        _id: id,
                        username: username,
                        lastSeen: lastSeen,
                        officer: false,
                        products: [],
                    };
                    if (resetPasswordToken)
                        newUserObj.resetPasswordToken = resetPasswordToken;
                    if (resetPasswordExpires)
                        newUserObj.resetPasswordExpires = resetPasswordExpires;
                    if (image)
                        newUserObj.image = image;
                    if (email)
                        newUserObj.email = email;
                    return [4 /*yield*/, user_model_1.default.findByIdAndUpdate(id, newUserObj)];
                case 1:
                    _b.sent();
                    return [2 /*return*/, {
                            _id: newUserObj._id,
                            username: newUserObj.username,
                            lastSeen: newUserObj.lastSeen,
                            officer: false,
                            resetPasswordToken: newUserObj.resetPasswordToken,
                            resetPasswordExpires: newUserObj.resetPasswordExpires,
                            products: newUserObj.products,
                            email: newUserObj.email,
                            image: newUserObj.image,
                        }];
                case 2:
                    err_3 = _b.sent();
                    throw new Error("Error updating user: " + err_3.message);
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateUser = updateUser;
function getUserByUsername(username, officer) {
    if (officer === void 0) { officer = true; }
    return __awaiter(this, void 0, void 0, function () {
        var filterQuery, user, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    filterQuery = { username: username };
                    if (officer)
                        filterQuery.officer = { $eq: true };
                    return [4 /*yield*/, user_model_1.default.findOne(filterQuery)];
                case 1:
                    user = _a.sent();
                    return [2 /*return*/, user];
                case 2:
                    err_4 = _a.sent();
                    throw new Error("Error updating user: " + err_4.message);
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getUserByUsername = getUserByUsername;
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var user, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, user_model_1.default.findById(id)];
                case 1:
                    user = _a.sent();
                    return [2 /*return*/, user];
                case 2:
                    err_5 = _a.sent();
                    throw new Error("Error updating user: " + err_5.message);
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getUserById = getUserById;
function getUserByToken(resetPasswordToken) {
    return __awaiter(this, void 0, void 0, function () {
        var user, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, user_model_1.default.findOne({ resetPasswordToken: resetPasswordToken })];
                case 1:
                    user = _a.sent();
                    return [2 /*return*/, user];
                case 2:
                    err_6 = _a.sent();
                    throw new Error("Error updating user: " + err_6.message);
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getUserByToken = getUserByToken;
function getAllUsers(username) {
    return __awaiter(this, void 0, void 0, function () {
        var users, res, err_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, user_model_1.default.find({
                            username: { $ne: username },
                            officer: { $eq: true },
                        })];
                case 1:
                    users = _a.sent();
                    users = JSON.parse(JSON.stringify(users));
                    res = users.map(function (u) {
                        var newU = __assign({}, u);
                        delete newU.password;
                        return newU;
                    });
                    return [2 /*return*/, res];
                case 2:
                    err_7 = _a.sent();
                    throw new Error("Error getting all users: " + err_7.message);
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getAllUsers = getAllUsers;
