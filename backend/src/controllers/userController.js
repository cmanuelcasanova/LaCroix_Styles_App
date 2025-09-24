import { db } from "../models/index.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ruta del log fuera de src

const logPath = path.join(__dirname, '../../logs/loging.log');

const logStep = (label, data) => {
  fs.appendFileSync(logPath, `[${new Date().toISOString()}] ${label}: ${JSON.stringify(data)}\n`);
};




export const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verifica si el usuario ya existe
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

   logStep('Inicio login', req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    logStep('Datos incompletos', req.body);
    return res.status(400).json({ message: "Email y contraseña requeridos" });
  }
console.log("1111")
  try {
    const user = await db.User.findOne({ where: { email } });
    logStep('Usuario encontrado', user ? { id: user.id, email: user.email } : 'No encontrado');
    console.log("2222")
    if (!user)
      return res.status(400).json({ message: "Usuario no encontrado" });
    console.log("3333")
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("44444")
    logStep('Password match', isMatch);

    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = generateToken(user.id, user.role);
    logStep('Token generado', token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60,
    });

    logStep('Cookie enviada', { userId: user.id });

    res.status(200).json({
      message: "Login exitoso",
      user: user.id,
      username: user.username,
      role: user.role
    });

    logStep('Respuesta enviada', { userId: user.id });
  } catch (err) {
    logStep('Error en login', err.message);
    res.status(500).json({ message: "Error en el servidor" });
  }

};

export const getprofile = async (req, res) => {
  try {
    const userId = req.user.id; // viene del token decodificado por authMiddleware

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
      sameSite: "strict",
    });
    res.status(200).json({ message: "Sesión cerrada" });
  } catch (error) {
    res.status(500).json({ message: "Error cerrar session", error });
  }
};



