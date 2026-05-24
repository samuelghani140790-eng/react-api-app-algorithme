import { useState, useEffect, useCallback, useRef } from 'react';
import {
  getPokemonList,
  getAllTypes,
  getPokemonDetail,
  getPokemonByType,
  extractIdFromUrl,
  getPokemonBatch,
} from '../utils/api';
import { ITEMS_PER_PAGE, EXCLUDED_TYPES } from '../utils/constants';

export const usePokemonDashboard = () => {
  // Master list state
  const [allPokemonNames, setAllPokemonNames] = useState([]); // {name, url}[]
  const [typePokemonMap, setTypePokemonMap] = useState({});   // type -> {name, url}[]
  const [detailsCache, setDetailsCache] = useState({});       // name -> detail

  // UI state
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedPokemon, setDisplayedPokemon] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  // Loading/error state
  const [initialLoading, setInitialLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [typeLoading, setTypeLoading] = useState(false);
  const [error, setError] = useState(null);

  const abortRef = useRef(null);

  // --- INIT: load types and all pokemon names ---
  useEffect(() => {
    const init = async () => {
      setInitialLoading(true);
      setError(null);
      try {
        const [typesData, listData] = await Promise.all([
          getAllTypes(),
          getPokemonList(2000, 0), // get all names at once (lightweight)
        ]);

        const filteredTypes = typesData.results.filter(
          t => !EXCLUDED_TYPES.includes(t.name)
        );
        setTypes(filteredTypes);
        setAllPokemonNames(listData.results);
        setTotalCount(listData.count);
      } catch (err) {
        setError('Failed to load Pokémon data. Please check your connection and try again.');
      } finally {
        setInitialLoading(false);
      }
    };
    init();
  }, []);

  // --- Compute filtered list ---
  const getFilteredList = useCallback(() => {
    let list = [];

    if (selectedType) {
      list = typePokemonMap[selectedType] || [];
    } else {
      list = allPokemonNames;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(p => {
        // search by name
        if (p.name.includes(q)) return true;
        // search by id
        const id = extractIdFromUrl(p.url);
        if (String(id).includes(q)) return true;
        return false;
      });
    }

    return list;
  }, [allPokemonNames, typePokemonMap, selectedType, searchQuery]);

  // --- Fetch details for current page ---
  const fetchPageDetails = useCallback(async (list, page) => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const pageItems = list.slice(start, start + ITEMS_PER_PAGE);

    if (pageItems.length === 0) {
      setDisplayedPokemon([]);
      setPageLoading(false);
      return;
    }

    // Check cache first
    const uncached = pageItems.filter(p => !detailsCache[p.name]);
    
    if (uncached.length > 0) {
      setPageLoading(true);
      try {
        const details = await getPokemonBatch(uncached.map(p => p.name));
        setDetailsCache(prev => {
          const updated = { ...prev };
          details.forEach(d => { updated[d.name] = d; });
          return updated;
        });
      } catch {
        // partial failure is ok
      }
    }

    setPageLoading(false);
  }, [detailsCache]);

  // --- Effect: fetch type pokemon if needed ---
  useEffect(() => {
    if (!selectedType || typePokemonMap[selectedType]) return;

    const fetchType = async () => {
      setTypeLoading(true);
      try {
        const data = await getPokemonByType(selectedType);
        const pokemonList = data.pokemon.map(p => p.pokemon);
        setTypePokemonMap(prev => ({ ...prev, [selectedType]: pokemonList }));
      } catch {
        setError(`Failed to load ${selectedType} type Pokémon.`);
      } finally {
        setTypeLoading(false);
      }
    };
    fetchType();
  }, [selectedType, typePokemonMap]);

  // --- Effect: load page when state changes ---
  useEffect(() => {
    if (initialLoading) return;
    const filteredList = getFilteredList();
    fetchPageDetails(filteredList, currentPage);
  }, [currentPage, selectedType, searchQuery, typePokemonMap, allPokemonNames, initialLoading]);

  // --- Build displayed pokemon from cache ---
  useEffect(() => {
    const filteredList = getFilteredList();
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const pageItems = filteredList.slice(start, start + ITEMS_PER_PAGE);
    const details = pageItems
      .map(p => detailsCache[p.name])
      .filter(Boolean);
    setDisplayedPokemon(details);
  }, [detailsCache, currentPage, selectedType, searchQuery, allPokemonNames, typePokemonMap]);

  // --- Derived values ---
  const filteredList = getFilteredList();
  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
  const filteredTotal = filteredList.length;

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    displayedPokemon,
    types,
    selectedType,
    searchQuery,
    currentPage,
    totalPages,
    filteredTotal,
    totalCount,
    initialLoading,
    pageLoading: pageLoading || typeLoading,
    error,
    handleTypeChange,
    handleSearch,
    handlePageChange,
  };
};
