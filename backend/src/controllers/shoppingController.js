import { where } from "sequelize";
import { db } from "../models/index.js";


export const getShopping = async (req, res) => {

  try {
    const Items = await db.Shopping.findAll({ where: {userId:req.user.id}, 
      include: [
    {
      model: db.Product,  attributes: ['id'],
       include: [
        {
        model: db.product_images,
        attributes: ['imageurl', 'order'],
        separate: true,
        order: [['order', 'ASC']],
    }]},
    {
      model: db.Talla,
      attributes: ['name'], 
    }]
    });
    res.status(201).json(Items);
  } catch (err) {
    console.error("❌ Error al consultar BD:", err.message);
    res.status(500).json({ error: err.message });
  }
};


export const createShopping = async (req, res) => {

  try {

    const { title, talla, cantidad, precio ,productId, mode } = req.body;
    const tallaRecord = await db.Talla.findOne({ where: { name: talla } });
    if (!tallaRecord) return res.status(400).json({ error: "Talla no válida" });

    const existing = await db.Shopping.findOne({where: { userId:req.user.id , productId: productId, tallaId: tallaRecord.id }});


    if (!existing) {
    
      const nuevo = await db.Shopping.create({userId:req.user.id, productId, tallaId: tallaRecord.id, title, cantidad, precio });
      

      return res.status(201).json(nuevo);
    }else{

      if(mode==='user'){
         existing.cantidad = existing.cantidad + 1;
        await existing.save();
        return res.status(200).json(existing);
      }
      if(mode==='sync'){
        return res.status(200).json({ message: "Ítem ya sincronizado, no se duplicó" });
      }

      return res.status(400).json({ error: "Modo no reconocido" });
    }
  }catch (err){
    console.error("❌ Error al crear Item del Carrito:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const deleteItems = async (req, res) => {

 

    const {talla} = req.body;
    const tallaRecord = await db.Talla.findOne({ where: { name: talla } });
    

    if (!tallaRecord) return res.status(400).json({ error: "Talla no válida" });
   
   try {
    const item = await db.Shopping.destroy({ where: { 
      userId: req.user.id,
      productId: req.params.productId,
      tallaId: tallaRecord.id
    } });
    res.status(204).send();
  } catch (err) {
    console.error("❌ Error al eliminar Item del Carrito:", err.message);
    res.status(500).json({ error: err.message });
  }
};



export const updateItems = async (req, res) => {

    const {talla , tipo} = req.body;
    const tallaRecord = await db.Talla.findOne({ where: { name: talla } });
    if (!tallaRecord) return res.status(400).json({ error: "Talla no válida" });

   try {
    const item = await db.Shopping.findOne( {where: { 
      userId: req.user.id,
      productId: req.params.productId,
      tallaId: tallaRecord.id
    } });
    if (item) {
     
      if(tipo ==='ADD') {item.cantidad = item.cantidad + 1;}
      if(tipo ==='SUB') {item.cantidad = item.cantidad - 1;}
      await item.save();
    }

    res.status(204).send(true);
  } catch (err) {
    console.error("❌ Error al Actualizar Item del Carrito:", err.message);
    res.status(500).json({ error: err.message });
  }
};