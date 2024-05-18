import * as jwt from "jsonwebtoken";
const secret = "abcdefg";

function setUser({ email, id }: { email: any; id: any }) {
  const payload = {
    email,
    id,
  };
  const options = { expiresIn: "1h" };
  return jwt.sign(payload, secret, options);
}

function verifyAccessToken(token) {
  try {
    const decoded = jwt.verify(token, secret);
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export { setUser, verifyAccessToken };
