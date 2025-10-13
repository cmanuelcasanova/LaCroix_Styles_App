import { db } from "../models/index.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";


export const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await db.User.create({
      username,
      email,
      password: hashedPassword,
      role: "USER"
    });
    res.status(201).json({ userid: user.id, username: user.username });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario", error });
  }
};

export const login = async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email y contraseña requeridos" });
  }

  try {
    const user = await db.User.findOne({ where: { email } });
    
    if (!user)
      return res.status(400).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);


    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = generateToken(user.id, user.role);


    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 1000 * 60 * 60,
    });

    
    res.status(200).json({
      message: "Login exitoso",
      user: user.id,
      username: user.username,
      role: user.role
    });

    
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor" });
  }

};

export const getprofile = async (req, res) => {
  try {
    const userId = req.user.id; 

    const user = await db.User.findOne({
      where: { id: userId },
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({
      username: user.username,
      userId: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error("Error en getProfile:", error);
    res.status(500).json({ message: "Error al obtener perfil" });
  }
};


export const logout = async (req, res) => {

  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/"
    });
    res.status(200).json({ message: "Sesión cerrada" });
  } catch (error) {
    res.status(500).json({ message: "Error cerrar session", error });
  }
};



