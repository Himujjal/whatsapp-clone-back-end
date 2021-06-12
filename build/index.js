"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// importing
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
var pusher_1 = __importDefault(require("pusher"));
var config_1 = __importDefault(require("./config"));
var message_controller_1 = __importDefault(require("./controller/message_controller"));
var auth_controller_1 = __importDefault(require("./controller/auth_controller"));
var user_controller_1 = __importDefault(require("./controller/user_controller"));
// app config
var app = express_1.default();
var port = process.env.PORT || 9000;
var pusher = new pusher_1.default(config_1.default.puserConfig);
// middleware
app.use(express_1.default.json());
app.use(cors_1.default());
app.use(function (_, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// DB config
mongoose_1.default.connect(config_1.default.mongodbURL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
var db = mongoose_1.default.connection;
db.once("open", function () {
    console.log("MongoDB Connected");
    var msgCollection = db.collection("messages");
    var changeStream = msgCollection.watch();
    changeStream.on("change", function (change) {
        if (change.operationType == "insert") {
            var messageDetails = change.fullDocument;
            pusher.trigger(messageDetails.to + "__" + messageDetails.from, "inserted", messageDetails);
        }
        else {
            console.log(change.operationType, "not supported");
        }
    });
});
// ?????
// api routes
app.get("/", function (_, res) {
    res.status(200).send("server is running fine");
});
app.use("/messages", message_controller_1.default);
app.use("/users", user_controller_1.default);
app.use("/auth", auth_controller_1.default);
// listen
app.listen(port, function () { return console.log("Listening on http://localhost:" + port); });
