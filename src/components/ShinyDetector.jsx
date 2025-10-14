// SRC/COMPONENTS/SHINYDETECTOR.JSX
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ShinyDetector.css';

const ShinyDetector = ({ pokemon, onShinyFound }) => {
    const [isShiny, setIsShiny] = useState(false);
    const [shinyChance, setShinyChance] = useState(0.000244); // 1/4096 chance
    const [detectionAttempts, setDetectionAttempts] = useState(0);
    const [showShinyAnimation, setShowShinyAnimation] = useState(false);
    const [shinyStreak, setShinyStreak] = useState(0);

    // Efectos visuales para Shiny
    const shinyEffects = [
        '✨', '⭐', '🌟', '💫', '⚡', '🔥', '💎', '🌈'
    ];

    // Detectar si un Pokémon es Shiny basado en ID y algoritmo
    const detectShiny = () => {
        if (!pokemon) return false;
        
        setDetectionAttempts(prev => prev + 1);
        
        // Algoritmo mejorado de detección de Shiny
        // Usar el ID del Pokémon como semilla para consistencia
        const seed = pokemon.id + detectionAttempts;
        const random = Math.sin(seed * 12345) * 10000;
        const normalizedRandom = (random - Math.floor(random));
        const isShinyDetected = normalizedRandom < shinyChance;
        
        if (isShinyDetected) {
            setIsShiny(true);
            setShinyStreak(prev => prev + 1);
            setShowShinyAnimation(true);
            
            // Llamar callback si existe
            if (onShinyFound) {
                onShinyFound(pokemon);
            }
            
            // Ocultar animación después de 3 segundos
            setTimeout(() => {
                setShowShinyAnimation(false);
            }, 3000);
        }
        
        return isShinyDetected;
    };

    // Reiniciar detección
    const resetDetection = () => {
        setIsShiny(false);
        setDetectionAttempts(0);
        setShowShinyAnimation(false);
    };

    // Generar sprite Shiny (simulado)
    const getShinySprite = () => {
        if (!pokemon || !isShiny) return pokemon?.sprites?.front_default;
        
        // En la API real, los sprites Shiny tienen una URL diferente
        // Aquí simulamos el efecto con un filtro CSS
        return pokemon.sprites.front_default;
    };

    // Calcular probabilidad de encontrar Shiny
    const calculateShinyProbability = () => {
        const attempts = detectionAttempts;
        const probability = 1 - Math.pow(1 - shinyChance, attempts);
        return Math.min(probability * 100, 99.99);
    };

    // Efectos especiales para Pokémon Shiny
    const renderShinyEffects = () => {
        if (!showShinyAnimation) return null;

        return (
            <div className="shiny-effects-container">
                {Array.from({ length: 20 }, (_, i) => (
                    <motion.div
                        key={i}
                        className="shiny-particle"
                        initial={{ 
                            opacity: 0, 
                            scale: 0,
                            x: Math.random() * 400 - 200,
                            y: Math.random() * 400 - 200
                        }}
                        animate={{ 
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                            rotate: [0, 360],
                            y: [0, -100]
                        }}
                        transition={{ 
                            duration: 2,
                            delay: i * 0.1,
                            repeat: 2
                        }}
                    >
                        {shinyEffects[i % shinyEffects.length]}
                    </motion.div>
                ))}
            </div>
        );
    };

    if (!pokemon) {
        return (
            <div className="shiny-detector">
                <div className="detector-placeholder">
                    <h3>🔍 Shiny Detector</h3>
                    <p>Selecciona un Pokémon para detectar si es Shiny</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div 
            className="shiny-detector"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="detector-header">
                <h3>✨ Shiny Detector</h3>
                <div className="shiny-stats">
                    <span>Intentos: {detectionAttempts}</span>
                    <span>Racha: {shinyStreak}</span>
                </div>
            </div>

            <div className="pokemon-display">
                <motion.div 
                    className={`pokemon-container ${isShiny ? 'shiny' : ''}`}
                    animate={isShiny ? {
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                        boxShadow: [
                            '0 0 20px rgba(255, 215, 0, 0.3)',
                            '0 0 40px rgba(255, 215, 0, 0.8)',
                            '0 0 20px rgba(255, 215, 0, 0.3)'
                        ]
                    } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <img 
                        src={getShinySprite()} 
                        alt={pokemon.name}
                        className={`pokemon-sprite ${isShiny ? 'shiny-sprite' : ''}`}
                    />
                    
                    {isShiny && (
                        <motion.div 
                            className="shiny-badge"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ 
                                type: "spring", 
                                stiffness: 200, 
                                damping: 10 
                            }}
                        >
                            ✨ SHINY ✨
                        </motion.div>
                    )}
                </motion.div>

                {renderShinyEffects()}
            </div>

            <div className="detector-info">
                <div className="pokemon-info">
                    <h4>{pokemon.name.toUpperCase()}</h4>
                    <div className="pokemon-types">
                        {pokemon.types.map((type, index) => (
                            <span key={index} className={`type-badge type-${type.type.name}`}>
                                {type.type.name}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="detection-stats">
                    <div className="stat-item">
                        <span className="stat-label">Probabilidad:</span>
                        <span className="stat-value">{calculateShinyProbability().toFixed(2)}%</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Chance Base:</span>
                        <span className="stat-value">1/4096</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Estado:</span>
                        <span className={`status ${isShiny ? 'shiny' : 'normal'}`}>
                            {isShiny ? '✨ SHINY' : 'Normal'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="detector-controls">
                <motion.button 
                    onClick={detectShiny}
                    className="detect-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isShiny}
                >
                    🔍 Detectar Shiny
                </motion.button>
                
                <motion.button 
                    onClick={resetDetection}
                    className="reset-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    🔄 Reiniciar
                </motion.button>
            </div>

            {isShiny && (
                <motion.div 
                    className="shiny-celebration"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <h3>🎉 ¡FELICIDADES! 🎉</h3>
                    <p>¡Has encontrado un Pokémon Shiny!</p>
                    <p>Racha actual: {shinyStreak}</p>
                </motion.div>
            )}

            <div className="shiny-tips">
                <h4>💡 Tips para encontrar Shinies:</h4>
                <ul>
                    <li>La probabilidad base es de 1 en 4,096</li>
                    <li>Algunos eventos especiales aumentan las probabilidades</li>
                    <li>¡La paciencia es clave!</li>
                    <li>Cada intento aumenta ligeramente tus probabilidades</li>
                </ul>
            </div>
        </motion.div>
    );
};

export default ShinyDetector;
