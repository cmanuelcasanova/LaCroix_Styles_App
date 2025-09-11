import { db } from "../models/index.js";


export const getShopping = async (req, res) => {
  try {
    const Items = await db.Shopping.findAll({
    });
    res.status(201).json(Items);
  } catch (err) {
    console.error("❌ Error al consultar BD:", err.message);
    res.status(500).json({ error: err.message });
  }
};


export const createShopping = async (req, res) => {
  try {
    
    const { title, talla, cantidad, precio , userId } = req.body;
    const ItemCar = await db.Shopping.create({ title, talla, cantidad , precio, userId});
    res.status(201).json(ItemCar);
  } catch (err) {
    console.error("❌ Error al crear Item en Carro:", err.message);
    res.status(500).json({ error: err.message });
  }
};
