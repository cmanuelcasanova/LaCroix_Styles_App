import { db } from "../models/index.js";

export const createProduct = async (req, res) => {
  try {
    const { title, categoria, imageUrl, talla, precio } = req.body;
    const product = await db.Product.create({ title, categoria, imageUrl, talla, precio, userId: "1" });
    res.status(201).json(product);
  } catch (err) {
    console.error("❌ Error al crear tarea:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await db.Product.findAll();
    res.status(201).json(product);
  } catch (err) {
    console.error("❌ Error al consultar tareas:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const findProduct = async (req, res) => {
  try {
    console.log(req.params.id);
    const task = await db.Product.findByPk(req.params.id);
    res.status(201).json(task);
  } catch (err) {
    console.error("❌ Error al crear tarea:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const task = await db.Product.destroy({ where: { id: req.params.id } });
    res.status(201).json(task);
  } catch (err) {
    console.error("❌ Error al crear tarea:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const UpdateProduct = async (req, res) => {
  try {
    const { title, description, done } = req.body;
    const task = await db.Product.update(
      { title: title, description: description, done: done },
      { where: { id: req.params.id } }
    );
    res.status(201).json(task);
  } catch (err) {
    console.error("❌ Error al crear tarea:", err.message);
    res.status(500).json({ error: err.message });
  }
};
