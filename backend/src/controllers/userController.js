import { db } from "../models/index.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { Resend } from 'resend';
import crypto, { verify } from 'crypto';
import { SendEmail } from "../utils/SendEmail.js";


export const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const token = crypto.randomBytes(30).toString('hex');

    const user = await db.User.create({
      username,
      email,
      password: hashedPassword,
      role: "USER",
      resetPasswordToken:null,
      resetPasswordExpires:null,
      isVerified:false,
      verificationToken:token

    });

    const email_info = {

      email,
      subject: 'Confirma tu cuenta de correo',
      html:
        `
          <p>Bienvenido a LaCroix Styles! Haz click aquí para activar tu cuenta de correo: </p>
          <a href="${process.env.RESEND_URL_FRONT_CONFIRM+"?token="+token}">Verificar Email</a>
        `
    }
    await SendEmail( email_info )


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
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    
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

   
    const email_info = {

      email,
      subject: 'Recuperación de Contraseña',
      html:
        `
          <h1>Has solicitado restablecer tu contraseña</h1>
          <p>Haz clic en el siguiente enlace para continuar:</p>
          <a href="${process.env.URL_FRONT_NEW_FORM+"?token="+token}"> Link nuevo password</a>
        `
    }
    await SendEmail( email_info )

    
  
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

    const email_info = {

      email:user.email,
      subject: 'Password Actualizado',
      html:
        `
          <h1>Hola, ${user.username}</h1>
          <p>Te informamos que la contraseña de tu cuenta ha sido cambiada exitosamente.</p>
          <p>Si <strong>no has sido tú</strong> por favor contacta con nuestro equipo de soporte de inmediato.</p>
          <hr />
          <p>Este es un mensaje automático, no es necesario responder.</p>
         `
    }
    await SendEmail( email_info )
   

    res.status(200).json({ message: "Password Actualizado" });
  } catch (error) {
    res.status(500).json({ message: "Error al recuperar", error });
  }
};


export const verifyEmail = async (req, res) => {

  

  try {

    const { token } = req.body

      if (!token) {
      return res.status(400).json({ msg: "No hay Token valido" });
    }

       const user = await db.User.findOne({
      where: { 
          verificationToken: token,
       },
      attributes: { exclude: ["password"] },
    });

    
    
    if (!user) {
      return res.status(400).json({ msg: "El token es inválido" });
    }


    user.isVerified=true;
    user.verificationToken=null;
    await user.save();




    const email_info = {

      email:user.email,
      subject: 'Tu email ha sido verificado',
      html:
        `
          <h1>Hola, ${user.username}</h1>
          <p>Te informamos que cuenta de correo ha sido verificada exitosamente.</p>
          <p>Si <strong>no has sido tú</strong> por favor contacta con nuestro equipo de soporte de inmediato.</p>
          <hr />
          <p>Este es un mensaje automático, no es necesario responder.</p>
         `
    }
    await SendEmail( email_info )



    res.status(200).json({ message: "Cuenta Verificada" });
  } catch (error) {
    res.status(500).json({ message: "Error al Verificar", error });
  }

}
      

export const resend_email = async (req, res) => {
   
  
  const { email } = req.body;

  try {

  const user = await db.User.findOne({
      where: { email: email },
      attributes: { exclude: ["password"] },
  });

  if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
  }

  if(user.isVerified) {
    return res.status(404).json({ message: "Usuario ya está verificado" });

  }



  const token = crypto.randomBytes(30).toString('hex');

  user.verificationToken=token;
  await user.save();
  

  const email_info = {

      email,
      subject: 'Confirma tu cuenta de correo',
      html:
        `
          <p>Bienvenido a LaCroix Styles! Haz click aquí para activar tu cuenta de correo: </p>
          <a href="${process.env.RESEND_URL_FRONT_CONFIRM+"?token="+token}">Verificar Email</a>
        `
    }
    await SendEmail( email_info )


    res.status(201).json({ userid: user.id, username: user.username });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario", error });
  }
};