import cron from 'node-cron';
import axios from 'axios';
import { Character } from '../models/Character.js';

export const updateCharactersJob = () => {
//   cron.schedule('*/30 * * * * *', async () => {
  cron.schedule('0 */12 * * *', async () => {
    console.log('Executing character update job...');

    try {
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

      const apiCharacters = data.data.characters.results.map(c => ({
        id: c.id,
        name: c.name,
        status: c.status,
        species: c.species,
        gender: c.gender,
        origin: c.origin.name
      }));

      for (const apiChar of apiCharacters) {
        const existing = await Character.findByPk(apiChar.id);

        if (!existing) {
          console.log(`New character inserted: ${apiChar.name}`);
          await Character.create(apiChar);
        } else if (
          existing.name !== apiChar.name ||
          existing.status !== apiChar.status ||
          existing.species !== apiChar.species ||
          existing.gender !== apiChar.gender ||
          existing.origin !== apiChar.origin
        ) {
          console.log(`Character Updated: ${apiChar.name}`);
          await existing.update(apiChar);
        }
      }

    } catch (err) {
      console.error('Error updating characters:', err.message);
    }
  });
};
