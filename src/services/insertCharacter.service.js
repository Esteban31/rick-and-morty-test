// /services/seed.js
import axios from 'axios';
import { sequelize } from '../../database.js';
import { Character } from '../models/Character.js';

const INITIAL_DATA = 15;

const seedDatabase = async () => {
  try {
    console.log('Inserting Data...');

    await sequelize.sync({ force: true });

    const { data } = await axios.post('https://rickandmortyapi.com/graphql', {
      query: `
        {
          characters(page: 1) {
            results {
              id
              name
              status
              species
              gender
              origin { name }
            }
          }
        }
      `
    });

    const characters = data.data.characters.results.slice(0, INITIAL_DATA);

    await Character.bulkCreate(
      characters.map(c => ({
        id: c.id,
        name: c.name,
        status: c.status,
        species: c.species,
        gender: c.gender,
        origin: c.origin.name
      }))
    );

    console.log(`${characters.length} characters inserted successfully.`);
    process.exit(0);
  } catch (err) {
    console.error('Error inserting data:', err.message);
    process.exit(1);
  }
};

seedDatabase();
