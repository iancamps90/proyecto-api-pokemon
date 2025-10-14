// SRC/COMPONENTS/ADVANCEDSEARCH.JSX
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AdvancedSearch.css';

const AdvancedSearch = ({ pokemons, onFilteredPokemons, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [sortBy, setSortBy] = useState('id');
    const [sortOrder, setSortOrder] = useState('asc');
    const [generationFilter, setGenerationFilter] = useState('all');
    const [statFilter, setStatFilter] = useState({ min: 0, max: 255, stat: 'attack' });

    // Tipos de Pokémon disponibles
    const availableTypes = [
        'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon',
        'dark', 'fairy', 'normal', 'fighting', 'flying', 'poison', 'ground',
        'rock', 'bug', 'ghost', 'steel'
    ];

    // Generaciones Pokémon
    const generations = [
        { name: 'Generación I', range: [1, 151] },
        { name: 'Generación II', range: [152, 251] },
        { name: 'Generación III', range: [252, 386] },
        { name: 'Generación IV', range: [387, 493] },
        { name: 'Generación V', range: [494, 649] },
        { name: 'Generación VI', range: [650, 721] },
        { name: 'Generación VII', range: [722, 809] },
        { name: 'Generación VIII', range: [810, 905] },
        { name: 'Generación IX', range: [906, 1010] }
    ];

    // Estadísticas disponibles para filtrado
    const stats = [
        { key: 'hp', name: 'HP', statIndex: 0 },
        { key: 'attack', name: 'Ataque', statIndex: 1 },
        { key: 'defense', name: 'Defensa', statIndex: 2 },
        { key: 'speed', name: 'Velocidad', statIndex: 5 }
    ];

    // Filtrar y ordenar Pokémon
    const filteredPokemons = useMemo(() => {
        let filtered = [...pokemons];

        // Filtro por texto de búsqueda
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

        // Filtro por generación
        if (generationFilter !== 'all') {
            const gen = generations.find(g => g.name === generationFilter);
            if (gen) {
                filtered = filtered.filter(pokemon =>
                    pokemon.id >= gen.range[0] && pokemon.id <= gen.range[1]
                );
            }
        }

        // Filtro por estadísticas
        if (statFilter.min > 0 || statFilter.max < 255) {
            filtered = filtered.filter(pokemon => {
                const statValue = pokemon.stats[statFilter.stat.statIndex]?.base_stat || 0;
                return statValue >= statFilter.min && statValue <= statFilter.max;
            });
        }

        // Ordenamiento
        filtered.sort((a, b) => {
            let aValue, bValue;

            switch (sortBy) {
                case 'name':
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
                    break;
                case 'attack':
                    aValue = a.stats[1].base_stat;
                    bValue = b.stats[1].base_stat;
                    break;
                case 'defense':
                    aValue = a.stats[2].base_stat;
                    bValue = b.stats[2].base_stat;
                    break;
                case 'speed':
                    aValue = a.stats[5].base_stat;
                    bValue = b.stats[5].base_stat;
                    break;
                case 'hp':
                    aValue = a.stats[0].base_stat;
                    bValue = b.stats[0].base_stat;
                    break;
                default:
                    aValue = a.id;
                    bValue = b.id;
            }

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        return filtered;
    }, [pokemons, searchTerm, selectedTypes, sortBy, sortOrder, generationFilter, statFilter]);

    // Manejar cambios en filtros
    const handleTypeToggle = (type) => {
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
        setSortOrder('asc');
        setGenerationFilter('all');
        setStatFilter({ min: 0, max: 255, stat: 'attack' });
    };

    // Notificar cambios a componente padre
    React.useEffect(() => {
        onFilteredPokemons(filteredPokemons);
        onSearch(searchTerm);
    }, [filteredPokemons, onFilteredPokemons, searchTerm, onSearch]);

    return (
        <motion.div 
            className="advanced-search"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="search-header">
                <h2>🔍 Búsqueda y Filtros Avanzados</h2>
                <div className="search-stats">
                    <span>Mostrando {filteredPokemons.length} de {pokemons.length} Pokémon</span>
                </div>
            </div>

            {/* Barra de búsqueda principal */}
            <div className="search-section">
                <div className="search-input-container">
                    <input
                        type="text"
                        placeholder="🔍 Buscar Pokémon por nombre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <div className="search-icon">🔍</div>
                </div>
            </div>

            {/* Filtros */}
            <div className="filters-section">
                {/* Filtro por tipos */}
                <div className="filter-group">
                    <h3>🎨 Filtros por Tipo</h3>
                    <div className="types-filter">
                        {availableTypes.map(type => (
                            <motion.button
                                key={type}
                                className={`type-filter-btn ${selectedTypes.includes(type) ? 'active' : ''}`}
                                onClick={() => handleTypeToggle(type)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                data-type={type}
                            >
                                {type}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Filtro por generación */}
                <div className="filter-group">
                    <h3>🌟 Generación</h3>
                    <select
                        value={generationFilter}
                        onChange={(e) => setGenerationFilter(e.target.value)}
                        className="generation-select"
                    >
                        <option value="all">Todas las generaciones</option>
                        {generations.map(gen => (
                            <option key={gen.name} value={gen.name}>
                                {gen.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Filtro por estadísticas */}
                <div className="filter-group">
                    <h3>📊 Estadísticas</h3>
                    <div className="stats-filter">
                        <select
                            value={statFilter.stat.key}
                            onChange={(e) => {
                                const selectedStat = stats.find(s => s.key === e.target.value);
                                setStatFilter(prev => ({ ...prev, stat: selectedStat }));
                            }}
                            className="stat-select"
                        >
                            {stats.map(stat => (
                                <option key={stat.key} value={stat.key}>
                                    {stat.name}
                                </option>
                            ))}
                        </select>
                        <div className="range-inputs">
                            <input
                                type="range"
                                min="0"
                                max="255"
                                value={statFilter.min}
                                onChange={(e) => setStatFilter(prev => ({ ...prev, min: parseInt(e.target.value) }))}
                                className="range-slider"
                            />
                            <input
                                type="range"
                                min="0"
                                max="255"
                                value={statFilter.max}
                                onChange={(e) => setStatFilter(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                                className="range-slider"
                            />
                            <div className="range-values">
                                <span>Min: {statFilter.min}</span>
                                <span>Max: {statFilter.max}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ordenamiento */}
                <div className="filter-group">
                    <h3>🔄 Ordenar por</h3>
                    <div className="sort-controls">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="sort-select"
                        >
                            <option value="id">ID</option>
                            <option value="name">Nombre</option>
                            <option value="hp">HP</option>
                            <option value="attack">Ataque</option>
                            <option value="defense">Defensa</option>
                            <option value="speed">Velocidad</option>
                        </select>
                        <button
                            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                            className={`sort-order-btn ${sortOrder}`}
                        >
                            {sortOrder === 'asc' ? '↑' : '↓'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Botones de acción */}
            <div className="action-buttons">
                <button onClick={clearFilters} className="clear-btn">
                    🗑️ Limpiar Filtros
                </button>
                <button 
                    onClick={() => console.log('Filtros aplicados:', { searchTerm, selectedTypes, sortBy, sortOrder, generationFilter, statFilter })}
                    className="apply-btn"
                >
                    ✅ Aplicar Filtros
                </button>
            </div>
        </motion.div>
    );
};

export default AdvancedSearch;
