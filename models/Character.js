import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const Character = sequelize.define('Character', {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  name: DataTypes.STRING,
  status: DataTypes.STRING,
  species: DataTypes.STRING,
  gender: DataTypes.STRING,
  origin: DataTypes.STRING
});
