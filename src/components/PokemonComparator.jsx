// SRC/COMPONENTS/POKEMONCOMPARATOR.JSX
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import './PokemonComparator.css';

// Registrar componentes de Chart.js
ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const PokemonComparator = ({ pokemon1, pokemon2, allPokemons = [] }) => {
    const [comparisonData, setComparisonData] = useState(null);
    const [selectedStat, setSelectedStat] = useState('all');
    const [comparisonMode, setComparisonMode] = useState('radar'); // radar, bars, detailed

    // Calcular datos de comparación
    useEffect(() => {
        if (pokemon1 && pokemon2) {
            const stats1 = pokemon1.stats;
            const stats2 = pokemon2.stats;

            const comparison = {
                pokemon1: {
                    name: pokemon1.name,
                    stats: {
                        hp: stats1[0]?.base_stat || 0,
                        attack: stats1[1]?.base_stat || 0,
                        defense: stats1[2]?.base_stat || 0,
                        spAttack: stats1[3]?.base_stat || 0,
                        spDefense: stats1[4]?.base_stat || 0,
                        speed: stats1[5]?.base_stat || 0
                    },
                    total: stats1.reduce((sum, stat) => sum + (stat.base_stat || 0), 0),
                    types: pokemon1.types.map(t => t.type.name),
                    height: pokemon1.height,
                    weight: pokemon1.weight
                },
                pokemon2: {
                    name: pokemon2.name,
                    stats: {
                        hp: stats2[0]?.base_stat || 0,
                        attack: stats2[1]?.base_stat || 0,
                        defense: stats2[2]?.base_stat || 0,
                        spAttack: stats2[3]?.base_stat || 0,
                        spDefense: stats2[4]?.base_stat || 0,
                        speed: stats2[5]?.base_stat || 0
                    },
                    total: stats2.reduce((sum, stat) => sum + (stat.base_stat || 0), 0),
                    types: pokemon2.types.map(t => t.type.name),
                    height: pokemon2.height,
                    weight: pokemon2.weight
                }
            };

            setComparisonData(comparison);
        }
    }, [pokemon1, pokemon2]);

    // Datos para el gráfico radar
    const radarData = comparisonData ? {
        labels: ['HP', 'Ataque', 'Defensa', 'At. Esp.', 'Def. Esp.', 'Velocidad'],
        datasets: [
            {
                label: comparisonData.pokemon1.name,
                data: [
                    comparisonData.pokemon1.stats.hp,
                    comparisonData.pokemon1.stats.attack,
                    comparisonData.pokemon1.stats.defense,
                    comparisonData.pokemon1.stats.spAttack,
                    comparisonData.pokemon1.stats.spDefense,
                    comparisonData.pokemon1.stats.speed
                ],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 3,
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
            },
            {
                label: comparisonData.pokemon2.name,
                data: [
                    comparisonData.pokemon2.stats.hp,
                    comparisonData.pokemon2.stats.attack,
                    comparisonData.pokemon2.stats.defense,
                    comparisonData.pokemon2.stats.spAttack,
                    comparisonData.pokemon2.stats.spDefense,
                    comparisonData.pokemon2.stats.speed
                ],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 3,
                pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
            }
        ]
    } : null;

    const radarOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: 'white',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: 'white',
                bodyColor: 'white',
                borderColor: 'rgba(255, 215, 0, 0.5)',
                borderWidth: 1
            }
        },
        scales: {
            r: {
                beginAtZero: true,
                max: 255,
                ticks: {
                    color: 'rgba(255, 255, 255, 0.8)',
                    font: {
                        size: 12
                    }
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)'
                },
                angleLines: {
                    color: 'rgba(255, 255, 255, 0.2)'
                },
                pointLabels: {
                    color: 'white',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            }
        }
    };

    // Calcular efectividad de tipos
    const calculateTypeEffectiveness = (attackerTypes, defenderTypes) => {
        const effectivenessChart = {
            fire: { fire: 0.5, water: 0.5, grass: 2, electric: 1, ice: 2, dragon: 0.5, steel: 2 },
            water: { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
            grass: { fire: 0.5, water: 2, grass: 0.5, poison: 0.5, flying: 0.5, bug: 0.5, rock: 2, ground: 2, steel: 0.5, dragon: 0.5 },
            electric: { water: 2, grass: 0.5, electric: 0.5, ground: 0, flying: 2, dragon: 0.5 },
            psychic: { fighting: 2, poison: 2, psychic: 0.5, steel: 0.5 },
            ice: { fire: 0.5, water: 0.5, grass: 2, ice: 0.5, ground: 2, flying: 2, dragon: 2, steel: 0.5 },
            dragon: { dragon: 2, steel: 0.5 },
            dark: { psychic: 2, ghost: 2, dark: 0.5, steel: 0.5 },
            fairy: { fire: 0.5, fighting: 2, poison: 0.5, dragon: 2, dark: 2, steel: 0.5 },
            normal: { rock: 0.5, ghost: 0, steel: 0.5 },
            fighting: { normal: 2, ice: 2, rock: 2, dark: 2, steel: 2, psychic: 0.5, poison: 0.5, flying: 0.5, bug: 0.5, fairy: 0.5, ghost: 0 },
            flying: { electric: 0.5, grass: 2, fighting: 2, bug: 2, rock: 0.5, steel: 0.5 },
            poison: { grass: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fairy: 2 },
            ground: { fire: 2, electric: 2, grass: 0.5, poison: 2, rock: 2, flying: 0, bug: 0.5, steel: 2 },
            rock: { fire: 2, ice: 2, fighting: 0.5, ground: 0.5, flying: 2, bug: 2, steel: 0.5 },
            bug: { fire: 0.5, grass: 2, fighting: 0.5, poison: 0.5, flying: 0.5, psychic: 2, ghost: 0.5, dark: 2, steel: 0.5, fairy: 0.5 },
            ghost: { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
            steel: { fire: 0.5, water: 0.5, electric: 0.5, ice: 2, rock: 2, steel: 0.5, fairy: 2 }
        };

        let totalEffectiveness = 1;
        attackerTypes.forEach(attackerType => {
            defenderTypes.forEach(defenderType => {
                const multiplier = effectivenessChart[attackerType]?.[defenderType] || 1;
                totalEffectiveness *= multiplier;
            });
        });

        return totalEffectiveness;
    };

    // Renderizar comparación de barras
    const renderBarComparison = () => {
        if (!comparisonData) return null;

        const stats = ['hp', 'attack', 'defense', 'spAttack', 'spDefense', 'speed'];
        const statLabels = ['HP', 'Ataque', 'Defensa', 'At. Esp.', 'Def. Esp.', 'Velocidad'];

        return (
            <div className="bar-comparison">
                {stats.map((stat, index) => {
                    const value1 = comparisonData.pokemon1.stats[stat];
                    const value2 = comparisonData.pokemon2.stats[stat];
                    const maxValue = Math.max(value1, value2);
                    const percentage1 = (value1 / 255) * 100;
                    const percentage2 = (value2 / 255) * 100;

                    return (
                        <motion.div
                            key={stat}
                            className="stat-bar-container"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="stat-label">{statLabels[index]}</div>
                            <div className="bars-container">
                                <div className="bar-group">
                                    <div className="bar-label">{comparisonData.pokemon1.name}</div>
                                    <div className="stat-bar">
                                        <motion.div
                                            className="bar-fill pokemon1"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${percentage1}%` }}
                                            transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
                                        />
                                        <span className="bar-value">{value1}</span>
                                    </div>
                                </div>
                                <div className="bar-group">
                                    <div className="bar-label">{comparisonData.pokemon2.name}</div>
                                    <div className="stat-bar">
                                        <motion.div
                                            className="bar-fill pokemon2"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${percentage2}%` }}
                                            transition={{ delay: index * 0.1 + 0.4, duration: 0.8 }}
                                        />
                                        <span className="bar-value">{value2}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        );
    };

    // Renderizar comparación detallada
    const renderDetailedComparison = () => {
        if (!comparisonData) return null;

        const effectiveness1to2 = calculateTypeEffectiveness(
            comparisonData.pokemon1.types,
            comparisonData.pokemon2.types
        );
        const effectiveness2to1 = calculateTypeEffectiveness(
            comparisonData.pokemon2.types,
            comparisonData.pokemon1.types
        );

        return (
            <div className="detailed-comparison">
                <div className="comparison-grid">
                    <div className="comparison-card">
                        <h4>{comparisonData.pokemon1.name}</h4>
                        <div className="card-content">
                            <div className="pokemon-image">
                                <img src={pokemon1.sprites.front_default} alt={pokemon1.name} />
                            </div>
                            <div className="pokemon-info">
                                <div className="info-item">
                                    <span className="label">Total Stats:</span>
                                    <span className="value">{comparisonData.pokemon1.total}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Tipos:</span>
                                    <span className="value">{comparisonData.pokemon1.types.join(', ')}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Altura:</span>
                                    <span className="value">{comparisonData.pokemon1.height / 10}m</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Peso:</span>
                                    <span className="value">{comparisonData.pokemon1.weight / 10}kg</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Efectividad contra {comparisonData.pokemon2.name}:</span>
                                    <span className={`value effectiveness ${effectiveness1to2 > 1 ? 'super' : effectiveness1to2 < 1 ? 'not-very' : 'normal'}`}>
                                        {effectiveness1to2 > 1 ? 'Súper efectivo' : 
                                         effectiveness1to2 < 1 ? 'No muy efectivo' : 'Normal'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="vs-container">
                        <motion.div
                            className="vs-text"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                            VS
                        </motion.div>
                    </div>

                    <div className="comparison-card">
                        <h4>{comparisonData.pokemon2.name}</h4>
                        <div className="card-content">
                            <div className="pokemon-image">
                                <img src={pokemon2.sprites.front_default} alt={pokemon2.name} />
                            </div>
                            <div className="pokemon-info">
                                <div className="info-item">
                                    <span className="label">Total Stats:</span>
                                    <span className="value">{comparisonData.pokemon2.total}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Tipos:</span>
                                    <span className="value">{comparisonData.pokemon2.types.join(', ')}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Altura:</span>
                                    <span className="value">{comparisonData.pokemon2.height / 10}m</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Peso:</span>
                                    <span className="value">{comparisonData.pokemon2.weight / 10}kg</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Efectividad contra {comparisonData.pokemon1.name}:</span>
                                    <span className={`value effectiveness ${effectiveness2to1 > 1 ? 'super' : effectiveness2to1 < 1 ? 'not-very' : 'normal'}`}>
                                        {effectiveness2to1 > 1 ? 'Súper efectivo' : 
                                         effectiveness2to1 < 1 ? 'No muy efectivo' : 'Normal'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (!pokemon1 || !pokemon2) {
        return (
            <div className="pokemon-comparator">
                <div className="comparator-placeholder">
                    <h3>⚖️ Comparador de Pokémon</h3>
                    <p>Selecciona dos Pokémon para compararlos</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div 
            className="pokemon-comparator"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="comparator-header">
                <h3>⚖️ Comparador de Pokémon</h3>
                <div className="comparison-modes">
                    <button 
                        className={`mode-btn ${comparisonMode === 'radar' ? 'active' : ''}`}
                        onClick={() => setComparisonMode('radar')}
                    >
                        📊 Radar
                    </button>
                    <button 
                        className={`mode-btn ${comparisonMode === 'bars' ? 'active' : ''}`}
                        onClick={() => setComparisonMode('bars')}
                    >
                        📈 Barras
                    </button>
                    <button 
                        className={`mode-btn ${comparisonMode === 'detailed' ? 'active' : ''}`}
                        onClick={() => setComparisonMode('detailed')}
                    >
                        📋 Detallado
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {comparisonMode === 'radar' && radarData && (
                    <motion.div
                        key="radar"
                        className="radar-container"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="chart-wrapper">
                            <Radar data={radarData} options={radarOptions} />
                        </div>
                    </motion.div>
                )}

                {comparisonMode === 'bars' && (
                    <motion.div
                        key="bars"
                        className="bars-container"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        {renderBarComparison()}
                    </motion.div>
                )}

                {comparisonMode === 'detailed' && (
                    <motion.div
                        key="detailed"
                        className="detailed-container"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        {renderDetailedComparison()}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default PokemonComparator;
