import { sequelize } from '../config/Postgres.js';
import { Task } from './task_Postgres.js';
import { User } from './user_Postgres.js';


User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

export const db = {
  sequelize,
  Task,
  User
};

