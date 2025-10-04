import {imagekit}  from '../utils/imagekit.js'
import { db } from "../models/index.js";
import multer from 'multer';

const upload = multer();
export const uploadfiles = async (req, res) => {
  try {

    
    const fileBuffer = req.file?.buffer;
    const fileName = req.file?.originalname;

    if (!fileBuffer || !fileName) {
      return res.status(400).json({ error: 'No se recibió archivo válido' });
    }

    
    const result = await imagekit.upload({
      file: fileBuffer,
      fileName,
      folder: `${process.env.IMAGEKIT_FOLDER}`, // opcional: organiza tus imágenes en carpetas
    });

    return res.status(200).json({ url: result.url });
  } catch (err) {
    console.error('❌ Error al subir imagen:', err.message);
    return res.status(500).json({ error: 'Error interno al subir imagen' });
  }
};


export const deleteImage = async (req, res) => {
 
  const filePath = req.query.filePath?.toString().trim();

if (!filePath || typeof filePath !== "string") {
  return res.status(400).json({ message: "Parámetro filePath inválido" });
}


 let fileId = ""
  try {
    const files = await imagekit.listFiles({
     searchQuery: `name = "${filePath}" AND path = "${process.env.IMAGEKIT_FOLDER}"`
    });

    fileId = files[0]?.fileId;
  } catch (error) {
    console.error("Error al buscar imagen:", error);
  }
 
  try{
    await imagekit.deleteFile(fileId);
    return res.status(200).json({ message: "Imagen Borrada" });
  } catch {
    return res.status(401).json({ message: "Error al borrar Imagen" });
  }

};

export const homeslice = async (req, res) => {

  
  try {
    const imageshome = await db.homeslice.findAll({});
    res.status(201).json(imageshome);
  } catch (err) {
    console.error("❌ Error al consultar las Imagenes:", err.message);
    res.status(500).json({ error: err.message });
  }
};


