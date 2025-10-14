// SRC/COMPONENTS/ADVANCEDSTATS.JSX
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale,
    ArcElement,
    PointElement,
    LineElement,
    Filler
} from 'chart.js';
import { Bar, Doughnut, Line, Radar } from 'react-chartjs-2';
import './AdvancedStats.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale,
    ArcElement,
    PointElement,
    LineElement,
    Filler
);

const AdvancedStats = ({ pokemon, pokemons = [] }) => {
    const [selectedChart, setSelectedChart] = useState('radar');
    const [comparisonPokemon, setComparisonPokemon] = useState(null);
    const [showComparison, setShowComparison] = useState(false);

    if (!pokemon) {
        return (
            <div className="advanced-stats">
                <div className="no-pokemon">
                    <div className="no-pokemon-icon">📊</div>
                    <p>Selecciona un Pokémon para ver sus estadísticas avanzadas</p>
                </div>
            </div>
        );
    }

    // Preparar datos para gráficos
    const statsData = {
        labels: ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'],
        datasets: [
            {
                label: pokemon.name,
                data: pokemon.stats.map(stat => stat.base_stat),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 205, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 205, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 2
            }
        ]
    };

    // Datos para gráfico radar
    const radarData = {
        labels: ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'],
        datasets: [
            {
                label: pokemon.name,
                data: pokemon.stats.map(stat => stat.base_stat),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
            }
        ]
    };

    // Datos para gráfico de comparación
    const comparisonData = {
        labels: ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'],
        datasets: [
            {
                label: pokemon.name,
                data: pokemon.stats.map(stat => stat.base_stat),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2
            },
            ...(comparisonPokemon ? [{
                label: comparisonPokemon.name,
                data: comparisonPokemon.stats.map(stat => stat.base_stat),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2
            }] : [])
        ]
    };

    // Datos para gráfico de tipos
    const typeDistribution = pokemons.reduce((acc, p) => {
        p.types.forEach(type => {
            acc[type.type.name] = (acc[type.type.name] || 0) + 1;
        });
        return acc;
    }, {});

    const typeData = {
        labels: Object.keys(typeDistribution),
        datasets: [
            {
                data: Object.values(typeDistribution),
                backgroundColor: [
                    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFE66D', '#A8E6CF',
                    '#B4E7CE', '#96CEB4', '#FFEAA7', '#DDA0DD', '#D3D3D3',
                    '#CD5C5C', '#87CEEB', '#98D8C8', '#F4A460', '#BC8F8F',
                    '#9ACD32', '#C0C0C0'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }
        ]
    };

    // Opciones de configuración para gráficos
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#2c3e50',
                    font: {
                        size: 12,
                        weight: 'bold'
                    }
                }
            },
            title: {
                display: true,
                text: `Estadísticas de ${pokemon.name}`,
                color: '#2c3e50',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 200,
                ticks: {
                    color: '#666'
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                }
            },
            x: {
                ticks: {
                    color: '#666'
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                }
            }
        }
    };

    const radarOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#2c3e50',
                    font: {
                        size: 12,
                        weight: 'bold'
                    }
                }
            },
            title: {
                display: true,
                text: `Perfil de ${pokemon.name}`,
                color: '#2c3e50',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            }
        },
        scales: {
            r: {
                beginAtZero: true,
                max: 200,
                ticks: {
                    color: '#666',
                    stepSize: 50
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                },
                pointLabels: {
                    color: '#2c3e50',
                    font: {
                        size: 11,
                        weight: 'bold'
                    }
                }
            }
        }
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: '#2c3e50',
                    font: {
                        size: 10,
                        weight: 'bold'
                    },
                    usePointStyle: true,
                    padding: 15
                }
            },
            title: {
                display: true,
                text: 'Distribución de Tipos en tu Pokédex',
                color: '#2c3e50',
                font: {
                    size: 14,
                    weight: 'bold'
                }
            }
        }
    };

    // Calcular estadísticas generales
    const totalStats = pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
    const avgStats = Math.round(totalStats / pokemon.stats.length);
    const highestStat = Math.max(...pokemon.stats.map(stat => stat.base_stat));
    const lowestStat = Math.min(...pokemon.stats.map(stat => stat.base_stat));

    return (
        <motion.div 
            className="advanced-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="stats-header">
                <h2>📊 Estadísticas Avanzadas</h2>
                <p>Análisis detallado de {pokemon.name}</p>
            </div>

            {/* Resumen de estadísticas */}
            <div className="stats-summary">
                <div className="summary-card">
                    <div className="summary-icon">💪</div>
                    <div className="summary-content">
                        <h4>Total de Stats</h4>
                        <span className="summary-value">{totalStats}</span>
                    </div>
                </div>
                <div className="summary-card">
                    <div className="summary-icon">📈</div>
                    <div className="summary-content">
                        <h4>Promedio</h4>
                        <span className="summary-value">{avgStats}</span>
                    </div>
                </div>
                <div className="summary-card">
                    <div className="summary-icon">⬆️</div>
                    <div className="summary-content">
                        <h4>Máximo</h4>
                        <span className="summary-value">{highestStat}</span>
                    </div>
                </div>
                <div className="summary-card">
                    <div className="summary-icon">⬇️</div>
                    <div className="summary-content">
                        <h4>Mínimo</h4>
                        <span className="summary-value">{lowestStat}</span>
                    </div>
                </div>
            </div>

            {/* Selector de gráficos */}
            <div className="chart-selector">
                <button 
                    className={`chart-btn ${selectedChart === 'radar' ? 'active' : ''}`}
                    onClick={() => setSelectedChart('radar')}
                >
                    🎯 Radar
                </button>
                <button 
                    className={`chart-btn ${selectedChart === 'bar' ? 'active' : ''}`}
                    onClick={() => setSelectedChart('bar')}
                >
                    📊 Barras
                </button>
                <button 
                    className={`chart-btn ${selectedChart === 'types' ? 'active' : ''}`}
                    onClick={() => setSelectedChart('types')}
                >
                    🎨 Tipos
                </button>
                <button 
                    className={`chart-btn ${selectedChart === 'comparison' ? 'active' : ''}`}
                    onClick={() => setSelectedChart('comparison')}
                >
                    ⚖️ Comparar
                </button>
            </div>

            {/* Gráficos */}
            <div className="charts-container">
                <AnimatePresence mode="wait">
                    {selectedChart === 'radar' && (
                        <motion.div
                            key="radar"
                            className="chart-wrapper"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="chart-container">
                                <Radar data={radarData} options={radarOptions} />
                            </div>
                        </motion.div>
                    )}

                    {selectedChart === 'bar' && (
                        <motion.div
                            key="bar"
                            className="chart-wrapper"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="chart-container">
                                <Bar data={statsData} options={chartOptions} />
                            </div>
                        </motion.div>
                    )}

                    {selectedChart === 'types' && (
                        <motion.div
                            key="types"
                            className="chart-wrapper"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="chart-container">
                                <Doughnut data={typeData} options={doughnutOptions} />
                            </div>
                        </motion.div>
                    )}

                    {selectedChart === 'comparison' && (
                        <motion.div
                            key="comparison"
                            className="chart-wrapper"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="comparison-controls">
                                <select 
                                    value={comparisonPokemon?.id || ''}
                                    onChange={(e) => {
                                        const pokemonId = parseInt(e.target.value);
                                        const selected = pokemons.find(p => p.id === pokemonId);
                                        setComparisonPokemon(selected);
                                    }}
                                    className="comparison-select"
                                >
                                    <option value="">Seleccionar Pokémon para comparar</option>
                                    {pokemons.filter(p => p.id !== pokemon.id).map(p => (
                                        <option key={p.id} value={p.id}>
                                            {p.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="chart-container">
                                <Bar data={comparisonData} options={chartOptions} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Información adicional */}
            <div className="stats-info">
                <h3>💡 Información sobre las Estadísticas</h3>
                <div className="info-grid">
                    <div className="info-card">
                        <h4>❤️ HP (Hit Points)</h4>
                        <p>Determina cuánto daño puede recibir el Pokémon antes de debilitarse.</p>
                    </div>
                    <div className="info-card">
                        <h4>⚔️ Attack</h4>
                        <p>Fuerza de los ataques físicos del Pokémon.</p>
                    </div>
                    <div className="info-card">
                        <h4>🛡️ Defense</h4>
                        <p>Resistencia a ataques físicos del oponente.</p>
                    </div>
                    <div className="info-card">
                        <h4>🧠 Sp. Attack</h4>
                        <p>Fuerza de los ataques especiales del Pokémon.</p>
                    </div>
                    <div className="info-card">
                        <h4>🔮 Sp. Defense</h4>
                        <p>Resistencia a ataques especiales del oponente.</p>
                    </div>
                    <div className="info-card">
                        <h4>⚡ Speed</h4>
                        <p>Determina qué Pokémon ataca primero en combate.</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AdvancedStats;
