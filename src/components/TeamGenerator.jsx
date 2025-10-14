// SRC/COMPONENTS/TEAMGENERATOR.JSX
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TeamGenerator.css';

const TeamGenerator = ({ pokemons }) => {
    const [team, setTeam] = useState([]);
    const [teamBalance, setTeamBalance] = useState({});
    const [generationMode, setGenerationMode] = useState('balanced'); // balanced, offensive, defensive, mixed

    // Tipos de Pokémon y sus colores
    const typeColors = {
        fire: '#FF6B6B',
        water: '#4ECDC4',
        grass: '#45B7D1',
        electric: '#FFE66D',
        psychic: '#A8E6CF',
        ice: '#B4E7CE',
        dragon: '#96CEB4',
        dark: '#FFEAA7',
        fairy: '#DDA0DD',
        normal: '#D3D3D3',
        fighting: '#CD5C5C',
        flying: '#87CEEB',
        poison: '#98D8C8',
        ground: '#F4A460',
        rock: '#BC8F8F',
        bug: '#9ACD32',
        ghost: '#DDA0DD',
        steel: '#C0C0C0'
    };

    // Calcular balance del equipo
    const calculateTeamBalance = (teamPokemons) => {
        if (teamPokemons.length === 0) return {};

        const types = {};
        const totalStats = { hp: 0, attack: 0, defense: 0, speed: 0 };

        teamPokemons.forEach(pokemon => {
            pokemon.types.forEach(type => {
                types[type.type.name] = (types[type.type.name] || 0) + 1;
            });

            totalStats.hp += pokemon.stats[0].base_stat;
            totalStats.attack += pokemon.stats[1].base_stat;
            totalStats.defense += pokemon.stats[2].base_stat;
            totalStats.speed += pokemon.stats[5].base_stat;
        });

        const avgStats = {
            hp: Math.round(totalStats.hp / teamPokemons.length),
            attack: Math.round(totalStats.attack / teamPokemons.length),
            defense: Math.round(totalStats.defense / teamPokemons.length),
            speed: Math.round(totalStats.speed / teamPokemons.length)
        };

        return { types, avgStats };
    };

    // Generar equipo automático con MUCHA MÁS VARIEDAD
    const generateTeam = () => {
        if (pokemons.length < 6) return;

        let selectedTeam = [];
        const usedIds = new Set();
        const availablePokemons = [...pokemons];

        // Función auxiliar para seleccionar Pokémon aleatorio
        const getRandomPokemon = (filterFn = () => true) => {
            const filtered = availablePokemons.filter(p => !usedIds.has(p.id) && filterFn(p));
            if (filtered.length === 0) return null;
            
            const randomIndex = Math.floor(Math.random() * filtered.length);
            const selected = filtered[randomIndex];
            usedIds.add(selected.id);
            return selected;
        };

        // Función para mezclar array
        const shuffleArray = (array) => {
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        };

        // Estrategias MEJORADAS con mucha más variedad
        const strategies = {
            balanced: () => {
                // Estrategia balanceada con variedad de tipos
                const typeGroups = {
                    offensive: ['fire', 'fighting', 'dragon', 'electric'],
                    defensive: ['steel', 'rock', 'ground', 'water'],
                    special: ['psychic', 'ghost', 'fairy', 'dark'],
                    utility: ['normal', 'flying', 'bug', 'poison']
                };

                // Seleccionar 1-2 de cada grupo
                Object.values(typeGroups).forEach(types => {
                    const count = Math.floor(Math.random() * 2) + 1; // 1 o 2
                    for (let i = 0; i < count && selectedTeam.length < 6; i++) {
                        const pokemon = getRandomPokemon(p => 
                            p.types.some(t => types.includes(t.type.name))
                        );
                        if (pokemon) selectedTeam.push(pokemon);
                    }
                });

                // Completar con Pokémon aleatorios
                while (selectedTeam.length < 6) {
                    const pokemon = getRandomPokemon();
                    if (pokemon) selectedTeam.push(pokemon);
                }
            },
            offensive: () => {
                // Estrategia ofensiva con variedad
                const offensiveTypes = ['fire', 'fighting', 'dragon', 'electric', 'dark', 'ice'];
                
                offensiveTypes.forEach(type => {
                    if (selectedTeam.length < 6) {
                        const pokemon = getRandomPokemon(p => 
                            p.types.some(t => t.type.name === type) && 
                            (p.stats[1].base_stat > 80 || p.stats[3].base_stat > 80)
                        );
                        if (pokemon) selectedTeam.push(pokemon);
                    }
                });

                // Completar con Pokémon de alto ataque
                while (selectedTeam.length < 6) {
                    const pokemon = getRandomPokemon(p => 
                        p.stats[1].base_stat > 90 || p.stats[3].base_stat > 90
                    );
                    if (pokemon) selectedTeam.push(pokemon);
                }
            },
            defensive: () => {
                // Estrategia defensiva con variedad
                const defensiveTypes = ['steel', 'rock', 'ground', 'water', 'grass', 'fairy'];
                
                defensiveTypes.forEach(type => {
                    if (selectedTeam.length < 6) {
                        const pokemon = getRandomPokemon(p => 
                            p.types.some(t => t.type.name === type) && 
                            (p.stats[2].base_stat > 80 || p.stats[4].base_stat > 80)
                        );
                        if (pokemon) selectedTeam.push(pokemon);
                    }
                });

                // Completar con Pokémon de alta defensa
                while (selectedTeam.length < 6) {
                    const pokemon = getRandomPokemon(p => 
                        p.stats[2].base_stat > 90 || p.stats[4].base_stat > 90
                    );
                    if (pokemon) selectedTeam.push(pokemon);
                }
            },
            mixed: () => {
                // Estrategia completamente aleatoria con variedad de generaciones
                const generations = {
                    gen1: pokemons.filter(p => p.id <= 151),
                    gen2: pokemons.filter(p => p.id > 151 && p.id <= 251),
                    gen3: pokemons.filter(p => p.id > 251 && p.id <= 386),
                    gen4: pokemons.filter(p => p.id > 386 && p.id <= 493),
                    gen5: pokemons.filter(p => p.id > 493 && p.id <= 649),
                    gen6: pokemons.filter(p => p.id > 649 && p.id <= 721),
                    gen7: pokemons.filter(p => p.id > 721 && p.id <= 809),
                    gen8: pokemons.filter(p => p.id > 809 && p.id <= 898),
                    gen9: pokemons.filter(p => p.id > 898)
                };

                // Seleccionar de diferentes generaciones
                Object.values(generations).forEach(genPokemons => {
                    if (genPokemons.length > 0 && selectedTeam.length < 6) {
                        const shuffled = shuffleArray(genPokemons);
                        const pokemon = shuffled.find(p => !usedIds.has(p.id));
                        if (pokemon) {
                            selectedTeam.push(pokemon);
                            usedIds.add(pokemon.id);
                        }
                    }
                });

                // Completar con Pokémon aleatorios
                while (selectedTeam.length < 6) {
                    const pokemon = getRandomPokemon();
                    if (pokemon) selectedTeam.push(pokemon);
                }
            }
        };

        strategies[generationMode]();

        // Mezclar el equipo final para más variedad
        selectedTeam = shuffleArray(selectedTeam);

        setTeam(selectedTeam);
        setTeamBalance(calculateTeamBalance(selectedTeam));
    };

    // Limpiar equipo
    const clearTeam = () => {
        setTeam([]);
        setTeamBalance({});
    };

    // Actualizar balance cuando cambie el equipo
    useEffect(() => {
        setTeamBalance(calculateTeamBalance(team));
    }, [team]);

    return (
        <motion.div 
            className="team-generator"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="team-generator-header">
                <h2>🎮 Generador de Equipos Pokémon</h2>
                <p>Crea equipos balanceados y estratégicos</p>
            </div>

            <div className="generation-controls">
                <div className="mode-selector">
                    <label htmlFor="mode-select">Estrategia:</label>
                    <select 
                        id="mode-select"
                        value={generationMode} 
                        onChange={(e) => setGenerationMode(e.target.value)}
                        className="mode-select"
                    >
                        <option value="balanced">⚖️ Equilibrado</option>
                        <option value="offensive">⚔️ Ofensivo</option>
                        <option value="defensive">🛡️ Defensivo</option>
                        <option value="mixed">🎲 Mixto</option>
                    </select>
                </div>

                <div className="action-buttons">
                    <motion.button 
                        onClick={generateTeam}
                        className="generate-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        🎲 Generar Equipo
                    </motion.button>
                    
                    <motion.button 
                        onClick={clearTeam}
                        className="clear-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        🗑️ Limpiar
                    </motion.button>
                </div>
            </div>

            {team.length > 0 && (
                <motion.div 
                    className="team-display"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <h3>Tu Equipo Pokémon</h3>
                    
                    <div className="team-slots">
                        {team.map((pokemon, index) => (
                            <motion.div 
                                key={`${pokemon.id}-${index}`}
                                className="team-pokemon"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="team-pokemon-img">
                                    <img 
                                        src={pokemon.sprites.front_default} 
                                        alt={pokemon.name}
                                        className="pokemon-sprite"
                                    />
                                </div>
                                <div className="team-pokemon-info">
                                    <h4 className="team-pokemon-name">
                                        {pokemon.name.toUpperCase()}
                                    </h4>
                                    <div className="team-pokemon-types">
                                        {pokemon.types.map((type, typeIndex) => (
                                            <span 
                                                key={typeIndex}
                                                className="team-type-badge"
                                                style={{ backgroundColor: typeColors[type.type.name] || '#ccc' }}
                                            >
                                                {type.type.name}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="team-pokemon-stats">
                                        <span>HP: {pokemon.stats[0].base_stat}</span>
                                        <span>ATK: {pokemon.stats[1].base_stat}</span>
                                        <span>DEF: {pokemon.stats[2].base_stat}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {Object.keys(teamBalance).length > 0 && (
                        <motion.div 
                            className="team-balance"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <h4>📊 Balance del Equipo</h4>
                            
                            <div className="balance-stats">
                                <div className="stats-grid">
                                    <div className="stat-item">
                                        <span className="stat-label">HP Promedio:</span>
                                        <span className="stat-value">{teamBalance.avgStats?.hp || 0}</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-label">Ataque Promedio:</span>
                                        <span className="stat-value">{teamBalance.avgStats?.attack || 0}</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-label">Defensa Promedio:</span>
                                        <span className="stat-value">{teamBalance.avgStats?.defense || 0}</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-label">Velocidad Promedio:</span>
                                        <span className="stat-value">{teamBalance.avgStats?.speed || 0}</span>
                                    </div>
                                </div>

                                <div className="type-distribution">
                                    <h5>Distribución de Tipos:</h5>
                                    <div className="type-chart">
                                        {Object.entries(teamBalance.types || {}).map(([type, count]) => (
                                            <div key={type} className="type-bar">
                                                <span className="type-name">{type}</span>
                                                <div className="type-progress">
                                                    <div 
                                                        className="type-fill"
                                                        style={{ 
                                                            width: `${(count / team.length) * 100}%`,
                                                            backgroundColor: typeColors[type] || '#ccc'
                                                        }}
                                                    ></div>
                                                </div>
                                                <span className="type-count">{count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            )}

            {team.length === 0 && (
                <div className="no-team">
                    <p>🎮 Selecciona una estrategia y genera tu equipo Pokémon</p>
                    <div className="strategy-tips">
                        <div className="tip">
                            <strong>⚖️ Equilibrado:</strong> Mezcla de tipos ofensivos, defensivos y especiales
                        </div>
                        <div className="tip">
                            <strong>⚔️ Ofensivo:</strong> Pokémon con alto ataque y tipos agresivos
                        </div>
                        <div className="tip">
                            <strong>🛡️ Defensivo:</strong> Pokémon resistentes y tipos defensivos
                        </div>
                        <div className="tip">
                            <strong>🎲 Mixto:</strong> Variedad de generaciones y tipos aleatorios
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default TeamGenerator;