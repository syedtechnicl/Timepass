import jwt from "jsonwebtoken";
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User is not Authenticated",
      });
    }
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }
    console.log(decode);
    req.id = decode.userId; // const req ={id}
    next();
  } catch (err) {
    console.log(err.message);
  }
};

export default isAuthenticated;
