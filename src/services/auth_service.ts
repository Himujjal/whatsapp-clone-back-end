import { getUserByUsername, updateUser } from "./user_service";
import crypto from "crypto";
import config from "../config";
import nodemailer from "nodemailer";
// @ts-ignore
import sendGridTransport from "nodemailer-sendgrid-transport";

const cryptoRandomBytes = (n: number) => {
  return new Promise<string>((res, rej) => {
    crypto.randomBytes(n, (err, buf) => {
      if (err) rej(err);
      else {
        const token = buf.toString("hex");
        res(token);
      }
    });
  });
};

const passwordResetMailOptions = ({
  to,
  from,
  host,
  token,
}: {
  to: string;
  from: string;
  host: string;
  token: string;
}) => ({
  to,
  from,
  subject: "Whatsapp-clone Password Reset",
  text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.
Please click on the following link, or paste this into your browser to complete the process:

<a href="http://${host}/auth/reset/${token}">Click on this link</a> 

If the above link doesn't work. Paste this in the browser:

http://${host}/auth/reset/${token}

If you did not request this, please ignore this email and your password will remain unchanged.`,
});

export async function forgotPassword(username: string, password: string) {
  try {
    const token = await cryptoRandomBytes(20);
    const user = await getUserByUsername(username, false);
    user.password = password;
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 36000000; // 1 hour
    const newUser = await updateUser({
      id: user._id!,
      username,
      lastSeen: user.lastSeen,
      email: user.email,
      image: undefined,
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + 36000000,
    });
    const smtpTransport = nodemailer.createTransport(
      sendGridTransport({
        auth: config.sendGridAuth(),
      })
    );
    const mailOptions = passwordResetMailOptions({
      to: newUser.email!,
      from: "himu@tuta.io",
      host: "localhost:9000",
      token,
    });
    const info = await smtpTransport.sendMail(mailOptions);
    return info;
  } catch (err) {
    throw err;
  }
}
