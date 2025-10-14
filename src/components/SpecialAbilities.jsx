// SRC/COMPONENTS/SPECIALABILITIES.JSX
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SpecialAbilities.css';

const SpecialAbilities = ({ pokemon }) => {
    const [selectedAbility, setSelectedAbility] = useState(null);
    const [showAbilityDetails, setShowAbilityDetails] = useState(false);

    // Habilidades especiales por tipo
    const specialAbilities = {
        fire: {
            name: "🔥 Inferno Blast",
            description: "Ataque de fuego devastador que puede quemar al oponente",
            effect: "Aumenta el daño de fuego en 50%",
            cooldown: 3,
            icon: "🔥"
        },
        water: {
            name: "🌊 Tsunami Wave",
            description: "Ola gigante que arrasa todo a su paso",
            effect: "Daño masivo a todos los oponentes",
            cooldown: 4,
            icon: "🌊"
        },
        grass: {
            name: "🌿 Nature's Wrath",
            description: "La naturaleza se alza contra el enemigo",
            effect: "Regenera HP y aumenta defensa",
            cooldown: 3,
            icon: "🌿"
        },
        electric: {
            name: "⚡ Thunder Storm",
            description: "Tormenta eléctrica que paraliza al oponente",
            effect: "Paraliza y causa daño continuo",
            cooldown: 3,
            icon: "⚡"
        },
        psychic: {
            name: "🧠 Mind Control",
            description: "Controla la mente del oponente",
            effect: "Confunde al enemigo por 2 turnos",
            cooldown: 4,
            icon: "🧠"
        },
        ice: {
            name: "❄️ Absolute Zero",
            description: "Congela al oponente con frío extremo",
            effect: "Congela y reduce velocidad",
            cooldown: 3,
            icon: "❄️"
        },
        dragon: {
            name: "🐉 Dragon Fury",
            description: "La furia ancestral del dragón",
            effect: "Daño masivo que ignora defensas",
            cooldown: 5,
            icon: "🐉"
        },
        dark: {
            name: "🌑 Shadow Strike",
            description: "Ataque desde las sombras",
            effect: "Ataque crítico garantizado",
            cooldown: 3,
            icon: "🌑"
        },
        fairy: {
            name: "✨ Fairy Dust",
            description: "Polvo mágico que confunde al oponente",
            effect: "Reduces stats del oponente",
            cooldown: 2,
            icon: "✨"
        },
        fighting: {
            name: "👊 Combo Strike",
            description: "Serie de golpes devastadores",
            effect: "Múltiples ataques consecutivos",
            cooldown: 3,
            icon: "👊"
        },
        flying: {
            name: "🦅 Sky Dive",
            description: "Ataque aéreo desde las alturas",
            effect: "Ataque que no puede ser bloqueado",
            cooldown: 3,
            icon: "🦅"
        },
        poison: {
            name: "☠️ Toxic Cloud",
            description: "Nube tóxica que envenena gradualmente",
            effect: "Envenenamiento que dura varios turnos",
            cooldown: 2,
            icon: "☠️"
        },
        ground: {
            name: "🏔️ Earthquake",
            description: "Terremoto que sacude la tierra",
            effect: "Daño masivo a todos los tipos voladores",
            cooldown: 4,
            icon: "🏔️"
        },
        rock: {
            name: "🪨 Rock Slide",
            description: "Avalancha de rocas desde arriba",
            effect: "Alta probabilidad de hacer retroceder",
            cooldown: 3,
            icon: "🪨"
        },
        bug: {
            name: "🐛 Swarm Attack",
            description: "Enjambre de insectos ataca al oponente",
            effect: "Múltiples ataques débiles pero efectivos",
            cooldown: 2,
            icon: "🐛"
        },
        ghost: {
            name: "👻 Phantom Strike",
            description: "Ataque fantasma que atraviesa defensas",
            effect: "Atraviesa protecciones y barreras",
            cooldown: 4,
            icon: "👻"
        },
        steel: {
            name: "⚙️ Iron Defense",
            description: "Defensa de acero impenetrable",
            effect: "Reduce drásticamente el daño recibido",
            cooldown: 3,
            icon: "⚙️"
        },
        normal: {
            name: "⭐ Hyper Beam",
            description: "Rayo hiper energético devastador",
            effect: "Daño masivo pero requiere descanso",
            cooldown: 5,
            icon: "⭐"
        }
    };

    const getPokemonAbilities = () => {
        if (!pokemon || !pokemon.types) return [];
        
        return pokemon.types.map(type => {
            const ability = specialAbilities[type.type.name];
            return ability ? { ...ability, type: type.type.name } : null;
        }).filter(Boolean);
    };

    const abilities = getPokemonAbilities();

    return (
        <motion.div 
            className="special-abilities"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="abilities-header">
                <h3>🌟 Habilidades Especiales</h3>
                <p>Poderes únicos de {pokemon?.name}</p>
            </div>

            {abilities.length > 0 ? (
                <div className="abilities-grid">
                    {abilities.map((ability, index) => (
                        <motion.div
                            key={index}
                            className="ability-card"
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                setSelectedAbility(ability);
                                setShowAbilityDetails(true);
                            }}
                            style={{
                                background: `linear-gradient(135deg, 
                                    ${getTypeColor(ability.type)}20, 
                                    ${getTypeColor(ability.type)}40)`
                            }}
                        >
                            <div className="ability-icon">{ability.icon}</div>
                            <h4 className="ability-name">{ability.name}</h4>
                            <p className="ability-description">{ability.description}</p>
                            <div className="ability-cooldown">
                                ⏱️ {ability.cooldown} turnos
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="no-abilities">
                    <p>No hay habilidades especiales disponibles</p>
                </div>
            )}

            {/* Modal de detalles de habilidad */}
            <AnimatePresence>
                {showAbilityDetails && selectedAbility && (
                    <motion.div
                        className="ability-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowAbilityDetails(false)}
                    >
                        <motion.div
                            className="ability-modal"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="modal-header">
                                <h3>{selectedAbility.icon} {selectedAbility.name}</h3>
                                <button 
                                    className="close-btn"
                                    onClick={() => setShowAbilityDetails(false)}
                                >
                                    ✕
                                </button>
                            </div>
                            
                            <div className="modal-content">
                                <p className="ability-full-description">
                                    {selectedAbility.description}
                                </p>
                                
                                <div className="ability-effect">
                                    <h4>💫 Efecto:</h4>
                                    <p>{selectedAbility.effect}</p>
                                </div>
                                
                                <div className="ability-stats">
                                    <div className="stat-item">
                                        <span className="stat-label">⏱️ Cooldown:</span>
                                        <span className="stat-value">{selectedAbility.cooldown} turnos</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-label">🎯 Tipo:</span>
                                        <span className="stat-value">{selectedAbility.type}</span>
                                    </div>
                                </div>
                                
                                <div className="ability-usage">
                                    <h4>🎮 Cómo usar:</h4>
                                    <p>Esta habilidad se activará automáticamente en batalla cuando el Pokémon tenga suficiente energía. Cada habilidad tiene un cooldown que debe esperarse antes de poder usarla nuevamente.</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// Función auxiliar para obtener colores de tipos
const getTypeColor = (type) => {
    const typeColors = {
        fire: '#FF6B6B', water: '#4ECDC4', grass: '#45B7D1', electric: '#FFE66D',
        psychic: '#A8E6CF', ice: '#B4E7CE', dragon: '#96CEB4', dark: '#FFEAA7',
        fairy: '#DDA0DD', normal: '#D3D3D3', fighting: '#CD5C5C', flying: '#87CEEB',
        poison: '#98D8C8', ground: '#F4A460', rock: '#BC8F8F', bug: '#9ACD32',
        ghost: '#DDA0DD', steel: '#C0C0C0'
    };
    return typeColors[type] || '#ccc';
};

export default SpecialAbilities;
