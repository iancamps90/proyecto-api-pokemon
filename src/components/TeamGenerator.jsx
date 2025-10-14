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

    // Generar equipo automático
    const generateTeam = () => {
        if (pokemons.length < 6) return;

        let selectedTeam = [];
        const usedIds = new Set();

        // Estrategias de generación
        const strategies = {
            balanced: () => {
                // 2 ofensivos, 2 defensivos, 2 equilibrados
                const offensive = pokemons.filter(p => p.stats[1].base_stat > 100);
                const defensive = pokemons.filter(p => p.stats[2].base_stat > 100);
                const balanced = pokemons.filter(p => 
                    p.stats[1].base_stat >= 80 && p.stats[2].base_stat >= 80
                );

                [offensive, defensive, balanced].forEach(category => {
                    for (let i = 0; i < 2 && selectedTeam.length < 6; i++) {
                        const random = category[Math.floor(Math.random() * category.length)];
                        if (random && !usedIds.has(random.id)) {
                            selectedTeam.push(random);
                            usedIds.add(random.id);
                        }
                    }
                });
            },
            offensive: () => {
                const offensive = pokemons
                    .filter(p => p.stats[1].base_stat > 90)
                    .sort((a, b) => b.stats[1].base_stat - a.stats[1].base_stat);
                
                for (let i = 0; i < Math.min(6, offensive.length); i++) {
                    selectedTeam.push(offensive[i]);
                }
            },
            defensive: () => {
                const defensive = pokemons
                    .filter(p => p.stats[2].base_stat > 90)
                    .sort((a, b) => b.stats[2].base_stat - a.stats[2].base_stat);
                
                for (let i = 0; i < Math.min(6, defensive.length); i++) {
                    selectedTeam.push(defensive[i]);
                }
            },
            mixed: () => {
                // Aleatorio pero evitando duplicados de tipos
                const shuffled = [...pokemons].sort(() => Math.random() - 0.5);
                const usedTypes = new Set();

                shuffled.forEach(pokemon => {
                    if (selectedTeam.length < 6) {
                        const hasNewType = pokemon.types.some(type => !usedTypes.has(type.type.name));
                        if (hasNewType) {
                            selectedTeam.push(pokemon);
                            pokemon.types.forEach(type => usedTypes.add(type.type.name));
                        }
                    }
                });
            }
        };

        strategies[generationMode]();
        
        // Completar con Pokémon aleatorios si no llegamos a 6
        const remainingSlots = 6 - selectedTeam.length;
        if (remainingSlots > 0) {
            const availablePokemons = pokemons.filter(p => !usedIds.has(p.id));
            const shuffled = [...availablePokemons].sort(() => Math.random() - 0.5);
            
            for (let i = 0; i < Math.min(remainingSlots, shuffled.length); i++) {
                selectedTeam.push(shuffled[i]);
            }
        }

        setTeam(selectedTeam);
    };

    // Remover Pokémon del equipo
    const removeFromTeam = (pokemonId) => {
        setTeam(prev => prev.filter(p => p.id !== pokemonId));
    };

    // Añadir Pokémon al equipo
    const addToTeam = (pokemon) => {
        if (team.length >= 6) return;
        if (team.some(p => p.id === pokemon.id)) return;
        
        setTeam(prev => [...prev, pokemon]);
    };

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
                <div className="generation-controls">
                    <select 
                        value={generationMode} 
                        onChange={(e) => setGenerationMode(e.target.value)}
                        className="mode-selector"
                    >
                        <option value="balanced">⚖️ Equilibrado</option>
                        <option value="offensive">⚔️ Ofensivo</option>
                        <option value="defensive">🛡️ Defensivo</option>
                        <option value="mixed">🎲 Mixto</option>
                    </select>
                    <button onClick={generateTeam} className="generate-btn">
                        🎲 Generar Equipo
                    </button>
                    <button onClick={() => setTeam([])} className="clear-btn">
                        🗑️ Limpiar
                    </button>
                </div>
            </div>

            {/* Equipo actual */}
            <div className="current-team">
                <h3>Equipo Actual ({team.length}/6)</h3>
                <div className="team-slots">
                    {Array.from({ length: 6 }, (_, index) => (
                        <div key={index} className="team-slot">
                            <AnimatePresence>
                                {team[index] ? (
                                    <motion.div
                                        className="team-pokemon"
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        exit={{ scale: 0, rotate: 180 }}
                                        transition={{ duration: 0.3 }}
                                        style={{
                                            background: `linear-gradient(135deg, ${team[index].types.map(t => typeColors[t.type.name] || '#ccc').join(', ')})`
                                        }}
                                    >
                                        <img 
                                            src={team[index].sprites.front_default} 
                                            alt={team[index].name}
                                            className="team-pokemon-img"
                                        />
                                        <span className="team-pokemon-name">{team[index].name}</span>
                                        <button 
                                            onClick={() => removeFromTeam(team[index].id)}
                                            className="remove-pokemon"
                                        >
                                            ✕
                                        </button>
                                    </motion.div>
                                ) : (
                                    <div className="empty-slot">
                                        <span>+</span>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>

            {/* Estadísticas del equipo */}
            {team.length > 0 && (
                <motion.div 
                    className="team-stats"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h3>📊 Estadísticas del Equipo</h3>
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
                    
                    {/* Distribución de tipos */}
                    <div className="type-distribution">
                        <h4>🎨 Distribución de Tipos</h4>
                        <div className="types-grid">
                            {Object.entries(teamBalance.types || {}).map(([type, count]) => (
                                <div 
                                    key={type} 
                                    className="type-badge"
                                    style={{ backgroundColor: typeColors[type] || '#ccc' }}
                                >
                                    {type} ({count})
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Lista de Pokémon para seleccionar */}
            <div className="pokemon-selection">
                <h3>🎯 Seleccionar Pokémon</h3>
                <div className="pokemon-grid">
                    {pokemons.slice(0, 20).map(pokemon => (
                        <motion.div
                            key={pokemon.id}
                            className="selectable-pokemon"
                            onClick={() => addToTeam(pokemon)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                background: `linear-gradient(135deg, ${pokemon.types.map(t => typeColors[t.type.name] || '#ccc').join(', ')})`
                            }}
                        >
                            <img 
                                src={pokemon.sprites.front_default} 
                                alt={pokemon.name}
                                className="selectable-img"
                            />
                            <span className="selectable-name">{pokemon.name}</span>
                            <div className="selectable-stats">
                                <span>ATK: {pokemon.stats[1].base_stat}</span>
                                <span>DEF: {pokemon.stats[2].base_stat}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default TeamGenerator;
