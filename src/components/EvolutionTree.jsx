// SRC/COMPONENTS/EVOLUTIONTREE.JSX
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './EvolutionTree.css';

const EvolutionTree = ({ pokemon, allPokemons = [] }) => {
    const [evolutionChain, setEvolutionChain] = useState(null);
    const [selectedEvolution, setSelectedEvolution] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [animationPhase, setAnimationPhase] = useState('idle');

    // Simular cadena de evoluciones (en una app real, esto vendría de la API)
    const mockEvolutionChains = {
        1: { // Bulbasaur
            id: 1,
            name: 'bulbasaur',
            evolves_to: [
                {
                    id: 2,
                    name: 'ivysaur',
                    evolves_to: [
                        {
                            id: 3,
                            name: 'venusaur',
                            evolves_to: []
                        }
                    ]
                }
            ]
        },
        4: { // Charmander
            id: 4,
            name: 'charmander',
            evolves_to: [
                {
                    id: 5,
                    name: 'charmeleon',
                    evolves_to: [
                        {
                            id: 6,
                            name: 'charizard',
                            evolves_to: []
                        }
                    ]
                }
            ]
        },
        7: { // Squirtle
            id: 7,
            name: 'squirtle',
            evolves_to: [
                {
                    id: 8,
                    name: 'wartortle',
                    evolves_to: [
                        {
                            id: 9,
                            name: 'blastoise',
                            evolves_to: []
                        }
                    ]
                }
            ]
        },
        25: { // Pikachu
            id: 25,
            name: 'pikachu',
            evolves_to: [
                {
                    id: 26,
                    name: 'raichu',
                    evolves_to: []
                }
            ]
        },
        133: { // Eevee
            id: 133,
            name: 'eevee',
            evolves_to: [
                {
                    id: 134,
                    name: 'vaporeon',
                    evolves_to: []
                },
                {
                    id: 135,
                    name: 'jolteon',
                    evolves_to: []
                },
                {
                    id: 136,
                    name: 'flareon',
                    evolves_to: []
                }
            ]
        }
    };

    // Obtener cadena de evolución
    useEffect(() => {
        if (pokemon) {
            setIsLoading(true);
            // Simular carga de API
            setTimeout(() => {
                const chain = mockEvolutionChains[pokemon.id] || {
                    id: pokemon.id,
                    name: pokemon.name,
                    evolves_to: []
                };
                setEvolutionChain(chain);
                setSelectedEvolution(pokemon);
                setIsLoading(false);
                setAnimationPhase('loading');
            }, 1000);
        }
    }, [pokemon]);

    // Renderizar nodo de evolución
    const renderEvolutionNode = (evolution, level = 0, isActive = false) => {
        if (!evolution) return null;

        const pokemonData = allPokemons.find(p => p.id === evolution.id) || {
            id: evolution.id,
            name: evolution.name,
            sprites: { front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution.id}.png` },
            types: [{ type: { name: 'normal' } }]
        };

        return (
            <motion.div
                key={evolution.id}
                className={`evolution-node level-${level} ${isActive ? 'active' : ''}`}
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                    duration: 0.6, 
                    delay: level * 0.2,
                    type: "spring",
                    stiffness: 100
                }}
                whileHover={{ 
                    scale: 1.1,
                    rotateY: 5,
                    transition: { duration: 0.3 }
                }}
                onClick={() => setSelectedEvolution(pokemonData)}
            >
                <div className="evolution-card">
                    <motion.img
                        src={pokemonData.sprites.front_default}
                        alt={pokemonData.name}
                        className="evolution-sprite"
                        animate={isActive ? {
                            rotate: [0, 5, -5, 0],
                            scale: [1, 1.05, 1]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    
                    <div className="evolution-info">
                        <h4 className="evolution-name">
                            {pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}
                        </h4>
                        <div className="evolution-types">
                            {pokemonData.types.map((type, index) => (
                                <span 
                                    key={index} 
                                    className={`type-badge type-${type.type.name}`}
                                >
                                    {type.type.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Efectos especiales para evolución activa */}
                    {isActive && (
                        <motion.div
                            className="active-effects"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <div className="glow-ring" />
                            <div className="sparkles">
                                {Array.from({ length: 8 }, (_, i) => (
                                    <motion.div
                                        key={i}
                                        className="sparkle"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ 
                                            opacity: [0, 1, 0],
                                            scale: [0, 1, 0],
                                            rotate: 360
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: i * 0.2
                                        }}
                                    >
                                        ✨
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Renderizar evoluciones hijas */}
                {evolution.evolves_to && evolution.evolves_to.length > 0 && (
                    <div className="evolution-children">
                        {evolution.evolves_to.map((child, index) => (
                            <React.Fragment key={child.id}>
                                {index > 0 && (
                                    <motion.div
                                        className="evolution-branch"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ delay: 0.5 + level * 0.2 }}
                                    />
                                )}
                                {renderEvolutionNode(child, level + 1)}
                            </React.Fragment>
                        ))}
                    </div>
                )}
            </motion.div>
        );
    };

    // Animación de evolución
    const triggerEvolutionAnimation = () => {
        setAnimationPhase('evolving');
        setTimeout(() => {
            setAnimationPhase('complete');
            setTimeout(() => {
                setAnimationPhase('idle');
            }, 2000);
        }, 3000);
    };

    if (!pokemon) {
        return (
            <div className="evolution-tree">
                <div className="evolution-placeholder">
                    <h3>🌳 Árbol de Evoluciones</h3>
                    <p>Selecciona un Pokémon para ver su línea evolutiva</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div 
            className="evolution-tree"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="evolution-header">
                <h3>🌳 Árbol de Evoluciones</h3>
                <div className="evolution-controls">
                    <motion.button
                        onClick={triggerEvolutionAnimation}
                        className="evolve-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={animationPhase !== 'idle'}
                    >
                        ⚡ Simular Evolución
                    </motion.button>
                </div>
            </div>

            {isLoading ? (
                <div className="evolution-loading">
                    <motion.div
                        className="loading-pokeball"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                        🎯
                    </motion.div>
                    <p>Cargando línea evolutiva...</p>
                </div>
            ) : (
                <div className="evolution-container">
                    <AnimatePresence>
                        {evolutionChain && (
                            <motion.div
                                className="evolution-tree-visual"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                {renderEvolutionNode(evolutionChain)}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            {/* Panel de información del Pokémon seleccionado */}
            {selectedEvolution && (
                <motion.div
                    className="evolution-details"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h4>📋 Información Detallada</h4>
                    <div className="pokemon-details-grid">
                        <div className="detail-item">
                            <span className="detail-label">Nombre:</span>
                            <span className="detail-value">{selectedEvolution.name}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">ID:</span>
                            <span className="detail-value">#{selectedEvolution.id}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Tipos:</span>
                            <span className="detail-value">
                                {selectedEvolution.types.map(t => t.type.name).join(', ')}
                            </span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Estadísticas:</span>
                            <div className="stats-mini">
                                <span>HP: {selectedEvolution.stats?.[0]?.base_stat || 'N/A'}</span>
                                <span>ATK: {selectedEvolution.stats?.[1]?.base_stat || 'N/A'}</span>
                                <span>DEF: {selectedEvolution.stats?.[2]?.base_stat || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Efectos de animación de evolución */}
            <AnimatePresence>
                {animationPhase === 'evolving' && (
                    <motion.div
                        className="evolution-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="evolution-lights">
                            {Array.from({ length: 20 }, (_, i) => (
                                <motion.div
                                    key={i}
                                    className="light-beam"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ 
                                        opacity: [0, 1, 0],
                                        scale: [0, 1, 0],
                                        rotate: 360
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.1
                                    }}
                                />
                            ))}
                        </div>
                        <motion.div
                            className="evolution-text"
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.2, 1] }}
                            transition={{ duration: 0.5 }}
                        >
                            ¡EVOLUCIONANDO!
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default EvolutionTree;
