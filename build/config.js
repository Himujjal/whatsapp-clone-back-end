"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    // This is where the actual client will be there
    redirectURL: process.env.REDIRECT_URL || "https://whatsapp-clone-simple.netlify.app",
    // not a big necessity
    emailErrorURL: process.env.BASE_URL || "https://whatsapp-clone-simple.herokuapp.com",
    mongodbURL: process.env.MONGODB ||
        "mongodb+srv://himu:4Q9UOPk2pOebqAcL@Whatsapp-clone.tywgg.mongodb.net/Whatsapp-clone?retryWrites=true&w=majority",
    jwtSecret: process.env.JWT_SECRET || "n2ofin2ofn2fo",
    puserConfig: {
        appId: "1216080",
        key: "92227230285a5ac11574",
        secret: process.env.PUSHER_SECRET || "bd67652118b94e0a3683",
        cluster: "ap2",
        useTLS: true,
    },
    sendGridAuth: {
        api_key: process.env.SENDGRID_AUTH ||
            "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",
    },
};
