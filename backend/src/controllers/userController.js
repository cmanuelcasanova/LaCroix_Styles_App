import { db } from "../models/index.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { Resend } from 'resend';
import crypto from 'crypto';


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


export const recoverypass = async (req, res) => {

  try {

    const { email } = req.body;



      const user = await db.User.findOne({
      where: { email: email },
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const token = crypto.randomBytes(30).toString('hex');

    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 3600000);
    await user.save();


    const resend = new Resend(process.env.RESEND_API_KEY);
    const url_recovery = process.env.RESEND_URL_FRONT+"?token="+token;


    await resend.emails.send({
    from: 'LaCroix Styles <onboarding@resend.dev>', 
    to: email,
    subject: 'Recuperación de Contraseña',
    html: `
      <h1>Has solicitado restablecer tu contraseña</h1>
      <p>Haz clic en el siguiente enlace para continuar:</p>
      <a href="${url_recovery}">${url_recovery}</a>
     
    `,
  });
   
    
   
    res.status(200).json({ message: "Correo de recuperacion enviado" });
  } catch (error) {
    res.status(500).json({ message: "Error al recuperar", error });
  }
};



export const updateuser = async (req, res) => {

  try {

    const { password_new, token } = req.body

      

    const user = await db.User.findOne({
      where: { 
          resetPasswordToken: token,
       },
      attributes: { exclude: ["password"] },
    });

    
    
    if (!user) {
      return res.status(400).json({ msg: "El token es inválido" });
    }

    const ahora = new Date();
    const fechaExpiracion = new Date(user.resetPasswordExpires);

   
    if (ahora > fechaExpiracion) {
      return res.status(400).json({ msg: "El enlace ha expirado. Solicita uno nuevo." });
    }


    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password_new, saltRounds);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
    from: 'Seguridad LaCroix Styles <onboarding@resend.dev>',
    to: user.email,
    subject: 'Tu contraseña ha sido actualizada',
    html: `
      <h1>Hola, ${user.username}</h1>
      <p>Te informamos que la contraseña de tu cuenta ha sido cambiada exitosamente.</p>
      <p>Si **no has sido tú**, por favor contacta con nuestro equipo de soporte de inmediato.</p>
      <hr />
      <p>Este es un mensaje automático, no es necesario responder.</p>
    `,
});

   

    res.status(200).json({ message: "Password Actualizado" });
  } catch (error) {
    res.status(500).json({ message: "Error al recuperar", error });
  }
};