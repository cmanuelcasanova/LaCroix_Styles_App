import {imagekit}  from '../utils/imagekit.js'
import { db } from "../models/index.js";



export const uploadfiles = async (req, res) => {
  
 
  
  try {

    const result = await Promise.all( req.files.map ( async item => {


      const order= item.fieldname.split("-");
      const fileBuffer = item.buffer;
      const fileName = item.originalname;
      
      if (!fileBuffer || !fileName) {
        return res.status(400).json({ error: 'No se recibió archivo válido' });
      }

      const temp = await imagekit.upload({
        file: fileBuffer,
        fileName,
        folder: `${process.env.IMAGEKIT_FOLDER}`, 
      });

      return { url: temp.url , order: Number(order[1]) }


    }   ) )




    return res.status(200).json(result);


  } catch (err) {
    console.error('❌ Error al subir imagen:', err.message);
    return res.status(500).json({ error: 'Error interno al subir imagen' });
  }
};


export const deleteImage = async (req, res) => {


  const idreq = Number(req.query.id)
 
 
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

    const deleteimagentable = await db.product_images.destroy({ where: { id: idreq}  } );


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





export const update_image = async (req, res) => {


  const { id , order, productId } = req.body
 
  try{
   

    await db.product_images.update(  {order: order} ,{ where: { id: id , productId:productId }  } );

    return res.status(200).json({ message: "Imagen Actualizada" });
  } catch {
    return res.status(401).json({ message: "Error al Actualizar Imagen" });
  }

};

