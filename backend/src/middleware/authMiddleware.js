import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token, acceso denegado" });
  }

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token inválido" });
  }
};


export const adminMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token, acceso denegado" });
  }

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   
    if(decoded.role === "ADMIN") {next();} 
    else {return res.status(403).json({ message: "Acceso Denegado" }); }
  } catch (err) {
    return res.status(403).json({ message: "Token inválido" });
  }
};