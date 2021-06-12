export default {
  // This is where the actual client will be there
  redirectURL:
    process.env.REDIRECT_URL || "https://whatsapp-clone-simple.netlify.app",
  // not a big necessity
  emailErrorURL:
    process.env.BASE_URL || "https://whatsapp-clone-simple.herokuapp.com",
  mongodbURL: () => process.env.MONGODB!,
  jwtSecret: () => process.env.JWT_SECRET!,
  pusherConfig: () => ({
    appId: "1216080",
    key: process.env.PUSHER_KEY || "92227230285a5ac11574",
    secret: process.env.PUSHER_SECRET!,
    cluster: "ap2",
    useTLS: true,
  }),
  sendGridAuth: () => ({
    api_key: process.env.SENDGRID_AUTH!,
  }),
};
