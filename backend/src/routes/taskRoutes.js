import express from 'express';
import { createTask, deleteTask, findTask, getTasks, UpdateTask } from '../controllers/taskController.js';

const router = express.Router();

router.get('/tasks', getTasks);
router.get('/tasks/:id', findTask );
router.post('/tasks', createTask);
router.delete('/tasks/:id', deleteTask );
router.patch('/tasks/:id', UpdateTask );



export default router;
