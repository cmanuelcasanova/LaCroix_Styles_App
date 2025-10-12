import { db } from "../models/index.js";
import { Op, where } from "sequelize";


export const createProduct = async (req, res) => {

  
  try {
    
    const { title, imagesUrl, marca, talla, precio,userId, seccionId,color, category } = req.body;
    const product = await db.Product.create({ title, precio, marca: marca?.name , domain: marca?.domain, userId, seccionId,color, category });
    

    for (const tallaarray of talla) {
      await db.Product_Talla.create({ProductId: product.id, TallaId: tallaarray });
    }

  
    for (const Imagen of imagesUrl) {
   
      await db.product_images.create({productId: product.id, imageurl: Imagen.url, order: Imagen.order   });
    }

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

   {
    model: db.Talla,
    attributes: ['name','id'],
    through: { attributes: [] }  
  },
      
  {
    model: db.product_images,
    attributes: ['imageurl', 'order'],
    separate: true,
    order: [['order', 'ASC']],

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
    
    const product = await db.Product.findByPk(req.params.id, { 
      include: [ 
        {
          model: db.Talla,
          attributes: ['name','id'],
          through: { attributes: [] },
        },

        {
          model: db.product_images,
          attributes: ['id','imageurl', 'order'],
          separate: true,
          order: [['order', 'ASC']],
        },


]}) ;
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
    
    const { title, imagesUrl, marca , talla, precio,userId, seccionId,color, category, id } = req.body;
   
    const product = await db.Product.update({ title, precio, userId, marca: marca?.name, domain: marca?.domain, seccionId,color, category }, {where: {id}});
    

    for (const tallas of talla) {

      await db.Product_Talla.findOrCreate({where: { ProductId: id, TallaId: tallas }});

    }  


    for (const Imagen of imagesUrl) {
   
      await db.product_images.create({productId: id, imageurl: Imagen.url, order: Imagen.order   });
    }
    
    
    res.status(201).json(product);
  } catch (err) {
    console.error("❌ Error al actualizar Producto:", err.message);
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