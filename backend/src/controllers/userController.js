import { db } from '../models/index.js';

export const createUser = async (req, res) => {

 try {

    const { username, email, password } = req.body;
    const user = await db.User.create({ username, email, password });
    res.status(201).json(user);
  } catch (err) {
    console.error('❌ Error al crear Usuario:', err.message);
    res.status(500).json({ error: err.message });
  }


}



export const findUser = async (req, res) => {

 try {

    
    const user = await db.User.findOne({ where: {id: req.params.id}  });
    res.status(201).json(user);
  } catch (err) {
    console.error('❌ Error al crear Usuario:', err.message);
    res.status(500).json({ error: err.message });
  }


}


export const findUsers = async (req, res) => {

 try {

    const user = await db.User.findAll();
    res.status(201).json(user);
  } catch (err) {
    console.error('❌ Error al crear Usuario:', err.message);
    res.status(500).json({ error: err.message });
  }


}


export const findAllTaskUsers = async (req, res) => {

 try {

    const userWithTasks = await db.User.findByPk(req.params.id, {
  include: db.Task,
});
    res.status(201).json(userWithTasks);
  } catch (err) {
    console.error('❌ Error al crear Usuario:', err.message);
    res.status(500).json({ error: err.message });
  }


}