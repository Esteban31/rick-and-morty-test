import axios from 'axios';
import redisClient from '../services/redis.config.js';
import { Character } from '../models/Character.js';

export const getCharacters = async (args) => {
  const cacheKey = JSON.stringify(args);
  const cached = await redisClient.get(cacheKey);

  if (cached) {
    console.log('🧠 Cache hit');
    return JSON.parse(cached);
  }

  console.log('🌐 Fetching from API...');
  const { data } = await axios.post('https://rickandmortyapi.com/graphql', {
    query: `
      {
        characters(filter: {
          name: "${args.name || ''}",
          status: "${args.status || ''}",
          species: "${args.species || ''}",
          gender: "${args.gender || ''}"
        }) {
          results {
            id
            name
            status
            species
            gender
            origin {
              name
            }
          }
        }
      }
    `
  });

  const characters = data.data.characters.results.map(c => ({
    id: c.id,
    name: c.name,
    status: c.status,
    species: c.species,
    gender: c.gender,
    origin: c.origin.name
  }));

  // Guardar en DB si no existen
  for (const char of characters) {
    await Character.upsert(char);
  }

  // Cachear por 1 hora
  await redisClient.set(cacheKey, JSON.stringify(characters), { EX: 3600 });

  return characters;
};
