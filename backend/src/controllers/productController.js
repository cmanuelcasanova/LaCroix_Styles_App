import { db } from "../models/index.js";

export const createProduct = async (req, res) => {
  try {
    
    const { title, imageUrl, talla, precio,userId, categoryId } = req.body;
    const product = await db.Product.create({ title, imageUrl, talla, precio, userId, categoryId });
    res.status(201).json(product);
  } catch (err) {
    console.error("❌ Error al crear tarea:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await db.Product.findAll({
      include: [
    {
      model: db.User,
      attributes: ['id', 'username', 'email'], 
    },
    {
      model: db.Category,
      attributes: ['id', 'name'],
    },

  ],
    });
    res.status(201).json(product);
  } catch (err) {
    console.error("❌ Error al consultar tareas:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const findProduct = async (req, res) => {
  try {
    
    const product = await db.Product.findByPk(req.params.id);
    res.status(201).json(product);
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



export const findCategory = async (req, res) => {


 try {
    const category = await db.Category.findAll({

      attributes: ['id', 'name']
    });

    const {id, name} = category
    res.status(201).json(category);
  } catch (err) {
    console.error("❌ Error al consultar Categorias:", err.message);
    res.status(500).json({ error: err.message });
  }
};



export const findTags = async (req, res) => {

 
 try {
    const Tags = await db.Tag.findAll();
    res.status(201).json(Tags);
  } catch (err) {
    console.error("❌ Error al consultar Tags:", err.message);
    res.status(500).json({ error: err.message });
  }
};