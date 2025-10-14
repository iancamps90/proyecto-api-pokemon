// SRC/COMPONENTS/TEAMGENERATOROPTIMIZED.JSX
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TeamGeneratorOptimized.css';

const TeamGeneratorOptimized = ({ pokemons }) => {
    const [team, setTeam] = useState([]);
    const [teamBalance, setTeamBalance] = useState({});
    const [generationMode, setGenerationMode] = useState('balanced');
    const [availablePokemons, setAvailablePokemons] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);

    // Tipos de Pokémon y sus colores
    const typeColors = {
        fire: '#FF6B6B', water: '#4ECDC4', grass: '#45B7D1', electric: '#FFE66D',
        psychic: '#A8E6CF', ice: '#B4E7CE', dragon: '#96CEB4', dark: '#FFEAA7',
        fairy: '#DDA0DD', normal: '#D3D3D3', fighting: '#CD5C5C', flying: '#87CEEB',
        poison: '#98D8C8', ground: '#F4A460', rock: '#BC8F8F', bug: '#9ACD32',
        ghost: '#DDA0DD', steel: '#C0C0C0'
    };

    useEffect(() => {
        setAvailablePokemons(pokemons);
    }, [pokemons]);

    // Calcular balance del equipo
    const calculateTeamBalance = useCallback((teamPokemons) => {
        if (teamPokemons.length === 0) return {};

        const types = {};
        const totalStats = { hp: 0, attack: 0, defense: 0, speed: 0 };

        teamPokemons.forEach(pokemon => {
            pokemon.types.forEach(type => {
                types[type.type.name] = (types[type.type.name] || 0) + 1;
            });

            totalStats.hp += pokemon.stats[0]?.base_stat || 0;
            totalStats.attack += pokemon.stats[1]?.base_stat || 0;
            totalStats.defense += pokemon.stats[2]?.base_stat || 0;
            totalStats.speed += pokemon.stats[5]?.base_stat || 0;
        });

        const avgStats = {
            hp: Math.round(totalStats.hp / teamPokemons.length),
            attack: Math.round(totalStats.attack / teamPokemons.length),
            defense: Math.round(totalStats.defense / teamPokemons.length),
            speed: Math.round(totalStats.speed / teamPokemons.length)
        };

        return { types, avgStats };
    }, []);

    useEffect(() => {
        setTeamBalance(calculateTeamBalance(team));
    }, [team, calculateTeamBalance]);

    // Generar equipo ULTRA OPTIMIZADO
    const generateTeam = useCallback(() => {
        if (availablePokemons.length < 6) {
            console.warn("No hay suficientes Pokémon disponibles para generar un equipo.");
            return;
        }

        setIsGenerating(true);

        // Usar requestAnimationFrame para no bloquear UI
        requestAnimationFrame(() => {
            const selectedTeam = [];
            const usedIds = new Set();
            const maxAttempts = 50; // Límite para evitar loops infinitos

            // Función simple y rápida
            const getRandomPokemon = (filterFn = () => true) => {
                const available = availablePokemons.filter(p => !usedIds.has(p.id) && filterFn(p));
                if (available.length === 0) return null;
                
                const randomIndex = Math.floor(Math.random() * available.length);
                const selected = available[randomIndex];
                usedIds.add(selected.id);
                return selected;
            };

            // Estrategias SIMPLIFICADAS
            const strategies = {
                balanced: () => {
                    // Añadir 6 Pokémon aleatorios rápidamente
                    for (let i = 0; i < 6 && selectedTeam.length < 6; i++) {
                        const pokemon = getRandomPokemon();
                        if (pokemon) selectedTeam.push(pokemon);
                    }
                },
                offensive: () => {
                    // Pokémon con buen ataque
                    for (let i = 0; i < 6 && selectedTeam.length < 6; i++) {
                        const pokemon = getRandomPokemon(p => p.stats[1]?.base_stat > 70);
                        if (pokemon) {
                            selectedTeam.push(pokemon);
                        } else {
                            // Si no hay más con buen ataque, añadir cualquiera
                            const anyPokemon = getRandomPokemon();
                            if (anyPokemon) selectedTeam.push(anyPokemon);
                        }
                    }
                },
                defensive: () => {
                    // Pokémon con buena defensa
                    for (let i = 0; i < 6 && selectedTeam.length < 6; i++) {
                        const pokemon = getRandomPokemon(p => p.stats[2]?.base_stat > 70);
                        if (pokemon) {
                            selectedTeam.push(pokemon);
                        } else {
                            const anyPokemon = getRandomPokemon();
                            if (anyPokemon) selectedTeam.push(anyPokemon);
                        }
                    }
                },
                mixed: () => {
                    // Completamente aleatorio
                    for (let i = 0; i < 6 && selectedTeam.length < 6; i++) {
                        const pokemon = getRandomPokemon();
                        if (pokemon) selectedTeam.push(pokemon);
                    }
                }
            };

            strategies[generationMode]();
            setTeam(selectedTeam);
            setIsGenerating(false);
        });
    }, [availablePokemons, generationMode]);

    const clearTeam = () => {
        setTeam([]);
    };

    return (
        <motion.div 
            className="team-generator-optimized"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="team-generator-header">
                <h2>🎮 Generador de Equipos Pokémon</h2>
                <p>Crea el equipo perfecto para tu aventura.</p>
            </div>

            <div className="generation-controls">
                <select 
                    value={generationMode} 
                    onChange={(e) => setGenerationMode(e.target.value)}
                    className="mode-selector"
                    disabled={isGenerating}
                >
                    <option value="balanced">⚖️ Equilibrado</option>
                    <option value="offensive">⚔️ Ofensivo</option>
                    <option value="defensive">🛡️ Defensivo</option>
                    <option value="mixed">🎲 Mixto</option>
                </select>
                
                <motion.button 
                    onClick={generateTeam} 
                    className="generate-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isGenerating}
                >
                    {isGenerating ? '🔄 Generando...' : '🎲 Generar Equipo'}
                </motion.button>
                
                <motion.button 
                    onClick={clearTeam} 
                    className="clear-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isGenerating}
                >
                    🗑️ Limpiar
                </motion.button>
            </div>

            <AnimatePresence>
                {team.length > 0 && (
                    <motion.div 
                        className="team-display"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3>🏆 Tu Equipo ({team.length}/6)</h3>
                        
                        <div className="team-slots">
                            {team.map((pokemon, index) => (
                                <motion.div 
                                    key={pokemon.id} 
                                    className="team-pokemon"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    style={{ 
                                        background: `linear-gradient(135deg, ${typeColors[pokemon.types[0]?.type.name] || '#ccc'}20, ${typeColors[pokemon.types[1]?.type.name] || typeColors[pokemon.types[0]?.type.name] || '#bbb'}40)`
                                    }}
                                >
                                    <div className="pokemon-slot-number">{index + 1}</div>
                                    <img 
                                        src={pokemon.sprites.front_default} 
                                        alt={pokemon.name} 
                                        className="team-pokemon-img" 
                                    />
                                    <span className="team-pokemon-name">{pokemon.name}</span>
                                    <div className="pokemon-types">
                                        {pokemon.types.map((type, idx) => (
                                            <span 
                                                key={idx} 
                                                className="type-badge" 
                                                style={{ backgroundColor: typeColors[type.type.name] }}
                                            >
                                                {type.type.name}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="team-summary">
                            <h4>📊 Balance del Equipo</h4>
                            <div className="stats-grid">
                                <div className="stat-item">
                                    <span className="stat-label">❤️ HP Promedio:</span> 
                                    <span className="stat-value">{teamBalance.avgStats?.hp || 0}</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">⚔️ Ataque Promedio:</span> 
                                    <span className="stat-value">{teamBalance.avgStats?.attack || 0}</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">🛡️ Defensa Promedio:</span> 
                                    <span className="stat-value">{teamBalance.avgStats?.defense || 0}</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">⚡ Velocidad Promedio:</span> 
                                    <span className="stat-value">{teamBalance.avgStats?.speed || 0}</span>
                                </div>
                            </div>
                            
                            <div className="type-distribution">
                                <h5>🎨 Distribución de Tipos:</h5>
                                <div className="type-badges-container">
                                    {Object.entries(teamBalance.types || {}).map(([type, count]) => (
                                        <motion.span 
                                            key={type} 
                                            className="type-badge" 
                                            style={{ backgroundColor: typeColors[type] }}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            {type} ({count})
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {team.length === 0 && !isGenerating && (
                <motion.div 
                    className="team-placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="placeholder-content">
                        <div className="placeholder-icon">🎮</div>
                        <p>¡Genera un equipo para empezar tu aventura!</p>
                        <p className="placeholder-subtitle">Selecciona una estrategia y haz clic en "Generar Equipo"</p>
                    </div>
                </motion.div>
            )}

            {isGenerating && (
                <motion.div 
                    className="generating-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="generating-content">
                        <div className="loading-spinner"></div>
                        <p>🎲 Generando equipo {generationMode}...</p>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default TeamGeneratorOptimized;
