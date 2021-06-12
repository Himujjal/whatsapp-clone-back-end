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
exports.forgotPassword = void 0;
var user_service_1 = require("./user_service");
var crypto_1 = __importDefault(require("crypto"));
var config_1 = __importDefault(require("../config"));
var nodemailer_1 = __importDefault(require("nodemailer"));
// @ts-ignore
var nodemailer_sendgrid_transport_1 = __importDefault(require("nodemailer-sendgrid-transport"));
var cryptoRandomBytes = function (n) {
    return new Promise(function (res, rej) {
        crypto_1.default.randomBytes(n, function (err, buf) {
            if (err)
                rej(err);
            else {
                var token = buf.toString("hex");
                res(token);
            }
        });
    });
};
var passwordResetMailOptions = function (_a) {
    var to = _a.to, from = _a.from, host = _a.host, token = _a.token;
    return ({
        to: to,
        from: from,
        subject: "Whatsapp-clone Password Reset",
        text: "You are receiving this because you (or someone else) have requested the reset of the password for your account.\nPlease click on the following link, or paste this into your browser to complete the process:\n\n<a href=\"http://" + host + "/auth/reset/" + token + "\">Click on this link</a> \n\nIf the above link doesn't work. Paste this in the browser:\n\nhttp://" + host + "/auth/reset/" + token + "\n\nIf you did not request this, please ignore this email and your password will remain unchanged.",
    });
};
function forgotPassword(username, password) {
    return __awaiter(this, void 0, void 0, function () {
        var token, user, newUser, smtpTransport, mailOptions, info, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, cryptoRandomBytes(20)];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, user_service_1.getUserByUsername(username, false)];
                case 2:
                    user = _a.sent();
                    user.password = password;
                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = Date.now() + 36000000; // 1 hour
                    return [4 /*yield*/, user_service_1.updateUser({
                            id: user._id,
                            username: username,
                            lastSeen: user.lastSeen,
                            email: user.email,
                            image: undefined,
                            resetPasswordToken: token,
                            resetPasswordExpires: Date.now() + 36000000,
                        })];
                case 3:
                    newUser = _a.sent();
                    smtpTransport = nodemailer_1.default.createTransport(nodemailer_sendgrid_transport_1.default({
                        auth: config_1.default.sendGridAuth,
                    }));
                    mailOptions = passwordResetMailOptions({
                        to: newUser.email,
                        from: "himu@tuta.io",
                        host: "localhost:9000",
                        token: token,
                    });
                    return [4 /*yield*/, smtpTransport.sendMail(mailOptions)];
                case 4:
                    info = _a.sent();
                    return [2 /*return*/, info];
                case 5:
                    err_1 = _a.sent();
                    throw err_1;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.forgotPassword = forgotPassword;
