// SRC/COMPONENTS/COMPACTFILTERS.JSX
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CompactFilters.css';

const CompactFilters = ({ pokemons, onFilteredPokemons, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [sortBy, setSortBy] = useState('id');
    const [showAdvanced, setShowAdvanced] = useState(false);

    // Tipos de Pokémon con iconos
    const typeIcons = {
        fire: '🔥', water: '💧', grass: '🌱', electric: '⚡', 
        psychic: '🔮', ice: '❄️', dragon: '🐉', dark: '🌙',
        fairy: '🧚', normal: '⚪', fighting: '👊', flying: '🕊️',
        poison: '☠️', ground: '🏔️', rock: '🗿', bug: '🐛',
        ghost: '👻', steel: '⚙️'
    };

    const availableTypes = Object.keys(typeIcons);

    // Filtrar Pokémon
    useEffect(() => {
        let filtered = [...pokemons];

        // Filtro por texto
        if (searchTerm) {
            filtered = filtered.filter(pokemon =>
                pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filtro por tipos
        if (selectedTypes.length > 0) {
            filtered = filtered.filter(pokemon =>
                selectedTypes.some(type =>
                    pokemon.types.some(pokemonType => pokemonType.type.name === type)
                )
            );
        }

        // Ordenamiento
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'attack':
                    return (b.stats[1]?.base_stat || 0) - (a.stats[1]?.base_stat || 0);
                case 'defense':
                    return (b.stats[2]?.base_stat || 0) - (a.stats[2]?.base_stat || 0);
                case 'speed':
                    return (b.stats[5]?.base_stat || 0) - (a.stats[5]?.base_stat || 0);
                default:
                    return a.id - b.id;
            }
        });

        onFilteredPokemons(filtered);
        onSearch(searchTerm);
    }, [pokemons, searchTerm, selectedTypes, sortBy, onFilteredPokemons, onSearch]);

    const toggleType = (type) => {
        setSelectedTypes(prev =>
            prev.includes(type)
                ? prev.filter(t => t !== type)
                : [...prev, type]
        );
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedTypes([]);
        setSortBy('id');
    };

    return (
        <motion.div 
            className="compact-filters"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Barra de búsqueda principal */}
            <div className="search-bar">
                <div className="search-input-wrapper">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Buscar Pokémon..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    {searchTerm && (
                        <button 
                            onClick={() => setSearchTerm('')}
                            className="clear-search"
                        >
                            ✕
                        </button>
                    )}
                </div>
                
                <button 
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="toggle-advanced"
                >
                    {showAdvanced ? '▲' : '▼'} Filtros
                </button>
            </div>

            {/* Filtros compactos */}
            <AnimatePresence>
                {showAdvanced && (
                    <motion.div
                        className="advanced-filters"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Filtros por tipo */}
                        <div className="type-filters">
                            <h4>Tipos:</h4>
                            <div className="type-chips">
                                {availableTypes.map(type => (
                                    <motion.button
                                        key={type}
                                        className={`type-chip ${selectedTypes.includes(type) ? 'selected' : ''}`}
                                        onClick={() => toggleType(type)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        data-type={type}
                                    >
                                        <span className="type-icon">{typeIcons[type]}</span>
                                        <span className="type-name">{type}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Ordenamiento */}
                        <div className="sort-controls">
                            <h4>Ordenar por:</h4>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="sort-select"
                            >
                                <option value="id">ID</option>
                                <option value="name">Nombre</option>
                                <option value="attack">Ataque</option>
                                <option value="defense">Defensa</option>
                                <option value="speed">Velocidad</option>
                            </select>
                        </div>

                        {/* Botón limpiar */}
                        <button onClick={clearFilters} className="clear-btn">
                            🗑️ Limpiar
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Indicadores de filtros activos */}
            {(searchTerm || selectedTypes.length > 0) && (
                <motion.div 
                    className="active-filters"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {searchTerm && (
                        <span className="filter-tag">
                            🔍 "{searchTerm}"
                        </span>
                    )}
                    {selectedTypes.map(type => (
                        <span key={type} className="filter-tag">
                            {typeIcons[type]} {type}
                        </span>
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
};

export default CompactFilters;
