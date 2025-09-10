import jwt from "jsonwebtoken";
export const auth = (req, res, next) => {
  const token = req.header("Authorization");
  //   const token = req.header("Authorization") || req.headers["authorization"];

  //   console.log("token :", token);
  if (!token) {
    return res.status(401).json({
      message: "Access denied. No Token find",
    });
  }
  try {
    const actualToken = token.startsWith("Bearer ")
      ? token.split(" ")[1]
      : token;
    // console.log("actualToken", actualToken);

    const decoded = jwt.verify(actualToken, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error in auth",
    });
  }
};
