import { db } from "../models/index.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, done, userId } = req.body;
    const task = await db.Task.create({ title, description, done, userId });
    res.status(201).json(task);
  } catch (err) {
    console.error("❌ Error al crear tarea:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const task = await db.Task.findAll();
    res.status(201).json(task);
  } catch (err) {
    console.error("❌ Error al consultar tareas:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const findTask = async (req, res) => {
  try {
    console.log(req.params.id);
    const task = await db.Task.findByPk(req.params.id);
    res.status(201).json(task);
  } catch (err) {
    console.error("❌ Error al crear tarea:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await db.Task.destroy({ where: { id: req.params.id } });
    res.status(201).json(task);
  } catch (err) {
    console.error("❌ Error al crear tarea:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const UpdateTask = async (req, res) => {
  try {
    const { title, description, done } = req.body;
    const task = await db.Task.update(
      { title: title, description: description, done: done },
      { where: { id: req.params.id } }
    );
    res.status(201).json(task);
  } catch (err) {
    console.error("❌ Error al crear tarea:", err.message);
    res.status(500).json({ error: err.message });
  }
};
