import {imagekit}  from '../utils/imagekit.js'
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
      folder: 'productos', // opcional: organiza tus imágenes en carpetas
    });

    return res.status(200).json({ url: result.url });
  } catch (err) {
    console.error('❌ Error al subir imagen:', err.message);
    return res.status(500).json({ error: 'Error interno al subir imagen' });
  }
};
