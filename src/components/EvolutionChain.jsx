// SRC/COMPONENTS/EVOLUTIONCHAIN.JSX
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './EvolutionChain.css';

const EvolutionChain = ({ pokemon }) => {
    const [evolutionChain, setEvolutionChain] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedStage, setSelectedStage] = useState(null);

    // Simular cadena evolutiva basada en el Pokémon
    const getEvolutionChain = (pokemon) => {
        if (!pokemon) return null;

        // Cadenas evolutivas predefinidas para algunos Pokémon populares
        const evolutionChains = {
            // Cadena de Charmander
            4: {
                stages: [
                    { id: 4, name: 'charmander', level: 'Nivel 1', method: 'Pokémon inicial' },
                    { id: 5, name: 'charmeleon', level: 'Nivel 16', method: 'Evolución por nivel' },
                    { id: 6, name: 'charizard', level: 'Nivel 36', method: 'Evolución por nivel' }
                ],
                mega: { id: '6-mega-x', name: 'charizard-mega-x', method: 'Mega Evolución X' }
            },
            // Cadena de Bulbasaur
            1: {
                stages: [
                    { id: 1, name: 'bulbasaur', level: 'Nivel 1', method: 'Pokémon inicial' },
                    { id: 2, name: 'ivysaur', level: 'Nivel 16', method: 'Evolución por nivel' },
                    { id: 3, name: 'venusaur', level: 'Nivel 32', method: 'Evolución por nivel' }
                ]
            },
            // Cadena de Squirtle
            7: {
                stages: [
                    { id: 7, name: 'squirtle', level: 'Nivel 1', method: 'Pokémon inicial' },
                    { id: 8, name: 'wartortle', level: 'Nivel 16', method: 'Evolución por nivel' },
                    { id: 9, name: 'blastoise', level: 'Nivel 36', method: 'Evolución por nivel' }
                ]
            },
            // Cadena de Pikachu
            25: {
                stages: [
                    { id: 172, name: 'pichu', level: 'Nivel 1', method: 'Huevo' },
                    { id: 25, name: 'pikachu', level: 'Amistad', method: 'Alta amistad' },
                    { id: 26, name: 'raichu', level: 'Piedra Trueno', method: 'Piedra evolutiva' }
                ]
            },
            // Cadena de Eevee
            133: {
                stages: [
                    { id: 133, name: 'eevee', level: 'Base', method: 'Pokémon base' },
                    { id: 134, name: 'vaporeon', level: 'Piedra Agua', method: 'Piedra Agua' },
                    { id: 135, name: 'jolteon', level: 'Piedra Trueno', method: 'Piedra Trueno' },
                    { id: 136, name: 'flareon', level: 'Piedra Fuego', method: 'Piedra Fuego' },
                    { id: 196, name: 'espeon', level: 'Amistad día', method: 'Alta amistad + día' },
                    { id: 197, name: 'umbreon', level: 'Amistad noche', method: 'Alta amistad + noche' }
                ]
            }
        };

        // Buscar cadena evolutiva
        for (const [baseId, chain] of Object.entries(evolutionChains)) {
            if (chain.stages.some(stage => stage.id === pokemon.id)) {
                return chain;
            }
        }

        // Si no se encuentra una cadena específica, crear una genérica
        return {
            stages: [
                { id: pokemon.id, name: pokemon.name, level: 'Actual', method: 'Pokémon actual' }
            ]
        };
    };

    useEffect(() => {
        if (pokemon) {
            setLoading(true);
            // Simular carga de datos
            setTimeout(() => {
                const chain = getEvolutionChain(pokemon);
                setEvolutionChain(chain);
                setLoading(false);
            }, 500);
        }
    }, [pokemon]);

    if (!pokemon) {
        return (
            <div className="evolution-chain">
                <div className="no-pokemon">
                    <p>Selecciona un Pokémon para ver su línea evolutiva</p>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="evolution-chain">
                <div className="loading-evolution">
                    <div className="loading-spinner"></div>
                    <p>Cargando línea evolutiva...</p>
                </div>
            </div>
        );
    }

    if (!evolutionChain) {
        return (
            <div className="evolution-chain">
                <div className="no-evolution">
                    <p>No se encontró información evolutiva para {pokemon.name}</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div 
            className="evolution-chain"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="evolution-header">
                <h3>🔄 Línea Evolutiva</h3>
                <p>Evoluciones de {pokemon.name}</p>
            </div>

            <div className="evolution-stages">
                {evolutionChain.stages.map((stage, index) => {
                    const isCurrentPokemon = stage.id === pokemon.id;
                    const isSelected = selectedStage?.id === stage.id;
                    
                    return (
                        <motion.div
                            key={stage.id}
                            className={`evolution-stage ${isCurrentPokemon ? 'current' : ''} ${isSelected ? 'selected' : ''}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setSelectedStage(isSelected ? null : stage)}
                        >
                            <div className="stage-pokemon">
                                <div className="pokemon-sprite">
                                    <img 
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${stage.id}.png`}
                                        alt={stage.name}
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/96x96/ccc/666?text=Pokemon';
                                        }}
                                    />
                                    {isCurrentPokemon && (
                                        <div className="current-indicator">
                                            <span>⭐</span>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="pokemon-info">
                                    <h4 className="pokemon-name">{stage.name}</h4>
                                    <p className="evolution-method">{stage.method}</p>
                                    <p className="evolution-level">{stage.level}</p>
                                </div>
                            </div>

                            {/* Flecha evolutiva */}
                            {index < evolutionChain.stages.length - 1 && (
                                <motion.div 
                                    className="evolution-arrow"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.1 + 0.2 }}
                                >
                                    ➡️
                                </motion.div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Mega Evolución si existe */}
            {evolutionChain.mega && (
                <motion.div 
                    className="mega-evolution"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <h4>🌟 Mega Evolución</h4>
                    <div className="mega-stage">
                        <div className="pokemon-sprite">
                            <img 
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolutionChain.mega.id}.png`}
                                alt={evolutionChain.mega.name}
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/96x96/gold/fff?text=Mega';
                                }}
                            />
                        </div>
                        <div className="pokemon-info">
                            <h4 className="pokemon-name">{evolutionChain.mega.name}</h4>
                            <p className="evolution-method">{evolutionChain.mega.method}</p>
                            <p className="evolution-level">Temporal</p>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Detalles de la etapa seleccionada */}
            <AnimatePresence>
                {selectedStage && (
                    <motion.div
                        className="evolution-details"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h4>📋 Detalles de Evolución</h4>
                        <div className="details-content">
                            <p><strong>Pokémon:</strong> {selectedStage.name}</p>
                            <p><strong>Método:</strong> {selectedStage.method}</p>
                            <p><strong>Requisito:</strong> {selectedStage.level}</p>
                            <p><strong>ID Nacional:</strong> #{selectedStage.id}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Información adicional */}
            <div className="evolution-tips">
                <h4>💡 Tips Evolutivos</h4>
                <ul>
                    <li>Algunos Pokémon evolucionan por nivel, otros por piedras evolutivas</li>
                    <li>La amistad puede ser necesaria para ciertas evoluciones</li>
                    <li>Algunas evoluciones requieren condiciones específicas (día/noche, ubicación)</li>
                    <li>Las Mega Evoluciones son temporales y requieren objetos especiales</li>
                </ul>
            </div>
        </motion.div>
    );
};

export default EvolutionChain;
