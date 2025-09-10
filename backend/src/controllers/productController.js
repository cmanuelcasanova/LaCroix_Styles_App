import { db } from "../models/index.js";

export const createProduct = async (req, res) => {
  try {
    
    const { title, imageUrl, talla, precio,userId, seccionId,color, category } = req.body;
    const product = await db.Product.create({ title, imageUrl, talla, precio, userId, seccionId,color, category });
    res.status(201).json(product);
  } catch (err) {
    console.error("❌ Error al crear Producto:", err.message);
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
      model: db.Seccion,
      attributes: ['id', 'name'],
    },

  ],
    });
    res.status(201).json(product);
  } catch (err) {
    console.error("❌ Error al consultar BD:", err.message);
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
    
    const { title, imageUrl, talla, precio,userId, seccionId,color, category, id } = req.body;
    const product = await db.Product.update({ title, imageUrl, talla, precio, userId, seccionId,color, category }, {where: {id}});
    res.status(201).json(product);
  } catch (err) {
    console.error("❌ Error al crear tarea:", err.message);
    res.status(500).json({ error: err.message });
  }
};



export const findSeccion = async (req, res) => {


 try {
    const seccion = await db.Seccion.findAll({

      attributes: ['id', 'name']
    });

    const {id, name} = seccion
    res.status(201).json(seccion);
  } catch (err) {
    console.error("❌ Error al consultar Secciones:", err.message);
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