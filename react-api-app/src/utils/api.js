import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

// Endpoint 1: Get paginated pokemon list
export const getPokemonList = async (limit = 20, offset = 0) => {
  const response = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
  return response.data;
};

// Endpoint 2: Get all types (for filter)
export const getAllTypes = async () => {
  const response = await api.get('/type?limit=50');
  return response.data;
};

// Endpoint 3: Get individual pokemon details (name + types + stats + sprites)
export const getPokemonDetail = async (nameOrId) => {
  const response = await api.get(`/pokemon/${nameOrId}`);
  return response.data;
};

// Endpoint 4: Get pokemon by type
export const getPokemonByType = async (typeName) => {
  const response = await api.get(`/type/${typeName}`);
  return response.data;
};

// Extract ID from pokemon URL
export const extractIdFromUrl = (url) => {
  const parts = url.split('/').filter(Boolean);
  return parseInt(parts[parts.length - 1]);
};

// Get official artwork URL from ID
export const getOfficialArtwork = (id) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

// Get animated sprite URL  
export const getAnimatedSprite = (id) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};

// Fetch details for a batch of pokemon (by name or id)
export const getPokemonBatch = async (namesOrIds) => {
  const promises = namesOrIds.map(nameOrId => getPokemonDetail(nameOrId));
  const results = await Promise.allSettled(promises);
  return results
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value);
};
