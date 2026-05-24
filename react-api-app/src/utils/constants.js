export const TYPE_COLORS = {
  normal:   { bg: '#A8A878', text: '#fff', card: 'rgba(168, 168, 120, 0.15)', border: 'rgba(168, 168, 120, 0.4)' },
  fire:     { bg: '#F08030', text: '#fff', card: 'rgba(240, 128, 48, 0.15)',  border: 'rgba(240, 128, 48, 0.4)' },
  water:    { bg: '#6890F0', text: '#fff', card: 'rgba(104, 144, 240, 0.15)', border: 'rgba(104, 144, 240, 0.4)' },
  electric: { bg: '#F8D030', text: '#000', card: 'rgba(248, 208, 48, 0.15)',  border: 'rgba(248, 208, 48, 0.4)' },
  grass:    { bg: '#78C850', text: '#fff', card: 'rgba(120, 200, 80, 0.15)',  border: 'rgba(120, 200, 80, 0.4)' },
  ice:      { bg: '#98D8D8', text: '#000', card: 'rgba(152, 216, 216, 0.15)', border: 'rgba(152, 216, 216, 0.4)' },
  fighting: { bg: '#C03028', text: '#fff', card: 'rgba(192, 48, 40, 0.15)',   border: 'rgba(192, 48, 40, 0.4)' },
  poison:   { bg: '#A040A0', text: '#fff', card: 'rgba(160, 64, 160, 0.15)',  border: 'rgba(160, 64, 160, 0.4)' },
  ground:   { bg: '#E0C068', text: '#000', card: 'rgba(224, 192, 104, 0.15)', border: 'rgba(224, 192, 104, 0.4)' },
  flying:   { bg: '#A890F0', text: '#fff', card: 'rgba(168, 144, 240, 0.15)', border: 'rgba(168, 144, 240, 0.4)' },
  psychic:  { bg: '#F85888', text: '#fff', card: 'rgba(248, 88, 136, 0.15)',  border: 'rgba(248, 88, 136, 0.4)' },
  bug:      { bg: '#A8B820', text: '#fff', card: 'rgba(168, 184, 32, 0.15)',  border: 'rgba(168, 184, 32, 0.4)' },
  rock:     { bg: '#B8A038', text: '#fff', card: 'rgba(184, 160, 56, 0.15)',  border: 'rgba(184, 160, 56, 0.4)' },
  ghost:    { bg: '#705898', text: '#fff', card: 'rgba(112, 88, 152, 0.15)',  border: 'rgba(112, 88, 152, 0.4)' },
  dragon:   { bg: '#7038F8', text: '#fff', card: 'rgba(112, 56, 248, 0.15)',  border: 'rgba(112, 56, 248, 0.4)' },
  dark:     { bg: '#705848', text: '#fff', card: 'rgba(112, 88, 72, 0.15)',   border: 'rgba(112, 88, 72, 0.4)' },
  steel:    { bg: '#B8B8D0', text: '#000', card: 'rgba(184, 184, 208, 0.15)', border: 'rgba(184, 184, 208, 0.4)' },
  fairy:    { bg: '#EE99AC', text: '#000', card: 'rgba(238, 153, 172, 0.15)', border: 'rgba(238, 153, 172, 0.4)' },
  stellar:  { bg: '#40B5A5', text: '#fff', card: 'rgba(64, 181, 165, 0.15)',  border: 'rgba(64, 181, 165, 0.4)' },
  unknown:  { bg: '#68A090', text: '#fff', card: 'rgba(104, 160, 144, 0.15)', border: 'rgba(104, 160, 144, 0.4)' },
  shadow:   { bg: '#3D3D3D', text: '#fff', card: 'rgba(61, 61, 61, 0.15)',    border: 'rgba(61, 61, 61, 0.4)' },
};

export const getTypeColor = (type) => {
  return TYPE_COLORS[type] || TYPE_COLORS.normal;
};

export const STAT_LABELS = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  'special-attack': 'SP.ATK',
  'special-defense': 'SP.DEF',
  speed: 'SPD',
};

export const ITEMS_PER_PAGE = 20;

// Excluded types (shadow/unknown are not real game types)
export const EXCLUDED_TYPES = ['shadow', 'unknown'];
