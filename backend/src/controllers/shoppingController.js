import { where } from "sequelize";
import { db } from "../models/index.js";


export const getShopping = async (req, res) => {

  try {
    const Items = await db.Shopping.findAll({ where: {userId:req.user.id}, 
      include: [
    {
      model: db.Product,
      attributes: ['imageUrl'], 
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
    const { title, talla, cantidad, precio ,productId } = req.body;
    const ItemCar = await db.Shopping.findOrCreate
    ({where:{ title, talla, cantidad , precio, userId:req.user.id, productId},

      default:{ title, talla, cantidad , precio } }
    );
    res.status(201).json(ItemCar);
  } catch (err) {
    console.error("❌ Error al crear Item en Carro:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const deleteItems = async (req, res) => {

   
   try {
    const item = await db.Shopping.destroy({ where: { 
      userId: req.user.id,
      productId: req.params.productId} });
    res.status(204).send();
  } catch (err) {
    console.error("❌ Error al eliminar Item del Carrito:", err.message);
    res.status(500).json({ error: err.message });
  }
};


