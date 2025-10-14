// SRC/COMPONENTS/BATTLESIMULATOR.JSX
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../hooks/useSound';
import './BattleSimulator.css';

const BattleSimulator = ({ pokemon1, pokemon2, onBattleEnd }) => {
    const { playSound } = useSound();
    
    const [battleState, setBattleState] = useState({
        pokemon1: { ...pokemon1, currentHp: 0, maxHp: 0 },
        pokemon2: { ...pokemon2, currentHp: 0, maxHp: 0 },
        turn: 1, // 1 = pokemon1, 2 = pokemon2
        battleLog: [],
        isBattleActive: false,
        winner: null
    });

    const [selectedMove1, setSelectedMove1] = useState(null);
    const [selectedMove2, setSelectedMove2] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);

    // Movimientos básicos para cada tipo
    const basicMoves = {
        fire: { name: "Llamarada", power: 90, accuracy: 100, type: "fire" },
        water: { name: "Hidrobomba", power: 110, accuracy: 80, type: "water" },
        grass: { name: "Rayo Solar", power: 120, accuracy: 100, type: "grass" },
        electric: { name: "Trueno", power: 110, accuracy: 70, type: "electric" },
        psychic: { name: "Psíquico", power: 90, accuracy: 100, type: "psychic" },
        ice: { name: "Ventisca", power: 110, accuracy: 70, type: "ice" },
        dragon: { name: "Draco Meteor", power: 130, accuracy: 90, type: "dragon" },
        dark: { name: "Pulso Umbrío", power: 80, accuracy: 100, type: "dark" },
        fairy: { name: "Brillo Mágico", power: 80, accuracy: 100, type: "fairy" },
        normal: { name: "Hiperrayo", power: 150, accuracy: 90, type: "normal" },
        fighting: { name: "Megapuño", power: 80, accuracy: 85, type: "fighting" },
        flying: { name: "Ataque Aéreo", power: 75, accuracy: 95, type: "flying" },
        poison: { name: "Vaho Tóxico", power: 90, accuracy: 100, type: "poison" },
        ground: { name: "Terremoto", power: 100, accuracy: 100, type: "ground" },
        rock: { name: "Roca Afilada", power: 100, accuracy: 80, type: "rock" },
        bug: { name: "Megacuerno", power: 120, accuracy: 85, type: "bug" },
        ghost: { name: "Sombra Vil", power: 80, accuracy: 100, type: "ghost" },
        steel: { name: "Cabeza de Hierro", power: 80, accuracy: 100, type: "steel" }
    };

    // Inicializar batalla
    useEffect(() => {
        if (pokemon1 && pokemon2) {
            const maxHp1 = pokemon1.stats[0].base_stat;
            const maxHp2 = pokemon2.stats[0].base_stat;
            
            setBattleState({
                pokemon1: { ...pokemon1, currentHp: maxHp1, maxHp: maxHp1 },
                pokemon2: { ...pokemon2, currentHp: maxHp2, maxHp: maxHp2 },
                turn: 1,
                battleLog: [`¡${pokemon1.name} vs ${pokemon2.name}! ¡Que comience la batalla!`],
                isBattleActive: true,
                winner: null
            });
            
            // Sonido de inicio de batalla
            playSound('battleStart');
        }
    }, [pokemon1, pokemon2, playSound]);

    // Calcular efectividad de tipos
    const calculateTypeEffectiveness = (attackType, defenseTypes) => {
        const effectivenessChart = {
            fire: { fire: 0.5, water: 0.5, grass: 2, electric: 1, ice: 2, dragon: 0.5 },
            water: { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2 },
            grass: { fire: 0.5, water: 2, grass: 0.5, poison: 0.5, flying: 0.5, bug: 0.5, rock: 2, ground: 2 },
            electric: { water: 2, grass: 0.5, electric: 0.5, ground: 0, flying: 2 },
            psychic: { fighting: 2, poison: 2, psychic: 0.5, dark: 0 },
            ice: { fire: 0.5, water: 0.5, grass: 2, ice: 0.5, ground: 2, flying: 2, dragon: 2 },
            dragon: { dragon: 2, steel: 0.5, fairy: 0 },
            dark: { psychic: 2, ghost: 2, dark: 0.5, fairy: 0.5 },
            fairy: { fire: 0.5, fighting: 2, poison: 0.5, dragon: 2, dark: 2, steel: 0.5 },
            normal: { rock: 0.5, ghost: 0, steel: 0.5 },
            fighting: { normal: 2, ice: 2, rock: 2, dark: 2, steel: 2, psychic: 0.5, poison: 0.5, flying: 0.5, bug: 0.5, fairy: 0.5 },
            flying: { electric: 0.5, grass: 2, fighting: 2, bug: 2, rock: 0.5 },
            poison: { grass: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fairy: 2 },
            ground: { fire: 2, electric: 2, grass: 0.5, poison: 2, rock: 2, flying: 0, bug: 0.5 },
            rock: { fire: 2, ice: 2, fighting: 0.5, ground: 0.5, flying: 2, bug: 2, steel: 0.5 },
            bug: { fire: 0.5, grass: 2, fighting: 0.5, poison: 0.5, flying: 0.5, psychic: 2, ghost: 0.5, dark: 2, steel: 0.5, fairy: 0.5 },
            ghost: { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
            steel: { fire: 0.5, water: 0.5, electric: 0.5, ice: 2, rock: 2, steel: 0.5, fairy: 2 }
        };

        let effectiveness = 1;
        defenseTypes.forEach(defenseType => {
            const multiplier = effectivenessChart[attackType]?.[defenseType] || 1;
            effectiveness *= multiplier;
        });

        return effectiveness;
    };

    // Calcular daño mejorado y balanceado
    const calculateDamage = (attacker, defender, move) => {
        const attack = attacker.stats[1].base_stat;
        const defense = defender.stats[2].base_stat;
        const spAttack = attacker.stats[3].base_stat;
        const spDefense = defender.stats[4].base_stat;
        const basePower = move.power;
        const level = 50; // Nivel fijo para simplicidad
        
        // Determinar si es ataque físico o especial
        const physicalMoves = ['fighting', 'normal', 'flying', 'ground', 'rock', 'bug', 'ghost', 'steel', 'dark'];
        const isPhysical = physicalMoves.includes(move.type);
        
        const effectiveAttack = isPhysical ? attack : spAttack;
        const effectiveDefense = isPhysical ? defense : spDefense;
        
        // Calcular efectividad
        const effectiveness = calculateTypeEffectiveness(move.type, defender.types.map(t => t.type.name));
        
        // Factor STAB (Same Type Attack Bonus)
        const stab = attacker.types.some(t => t.type.name === move.type) ? 1.5 : 1;
        
        // Fórmula de daño más balanceada (daño más bajo)
        const baseDamage = Math.floor(((2 * level + 10) / 250) * (effectiveAttack / effectiveDefense) * basePower + 2);
        const finalDamage = Math.floor(baseDamage * effectiveness * stab * 0.3); // Reducir daño general
        
        // Variación de daño (85%-115%)
        const variation = Math.random() * 0.3 + 0.85;
        
        return Math.max(1, Math.floor(finalDamage * variation));
    };

    // Ejecutar movimiento
    const executeMove = (attacker, defender, move, attackerKey, defenderKey) => {
        const damage = calculateDamage(attacker, defender, move);
        const effectiveness = calculateTypeEffectiveness(move.type, defender.types.map(t => t.type.name));
        
        let effectivenessText = "";
        if (effectiveness > 1) effectivenessText = " ¡Es súper efectivo!";
        else if (effectiveness < 1) effectivenessText = " No es muy efectivo...";
        
        const newHp = Math.max(0, defender.currentHp - damage);
        const isKnockedOut = newHp === 0;
        
        return {
            damage,
            newHp,
            isKnockedOut,
            effectiveness,
            logMessage: `${attacker.name} usa ${move.name} y causa ${damage} de daño${effectivenessText}`
        };
    };

    // Procesar turno de batalla
    const processTurn = () => {
        if (isAnimating || battleState.winner) return;
        
        setIsAnimating(true);
        
        setTimeout(() => {
            const { pokemon1, pokemon2, turn } = battleState;
            const attacker = turn === 1 ? pokemon1 : pokemon2;
            const defender = turn === 1 ? pokemon2 : pokemon1;
            const selectedMove = turn === 1 ? selectedMove1 : selectedMove2;
            
            if (!selectedMove) {
                setIsAnimating(false);
                return;
            }
            
            const moveResult = executeMove(attacker, defender, selectedMove, turn === 1 ? 'pokemon1' : 'pokemon2', turn === 1 ? 'pokemon2' : 'pokemon1');
            
            const newBattleLog = [...battleState.battleLog, moveResult.logMessage];
            
            if (moveResult.isKnockedOut) {
                newBattleLog.push(`¡${defender.name} se debilitó!`);
                
                setBattleState(prev => ({
                    ...prev,
                    [turn === 1 ? 'pokemon2' : 'pokemon1']: {
                        ...prev[turn === 1 ? 'pokemon2' : 'pokemon1'],
                        currentHp: 0
                    },
                    battleLog: newBattleLog,
                    winner: attacker.name,
                    isBattleActive: false
                }));
                
                if (onBattleEnd) {
                    onBattleEnd(attacker);
                }
            } else {
                setBattleState(prev => ({
                    ...prev,
                    [turn === 1 ? 'pokemon2' : 'pokemon1']: {
                        ...prev[turn === 1 ? 'pokemon2' : 'pokemon1'],
                        currentHp: moveResult.newHp
                    },
                    turn: turn === 1 ? 2 : 1,
                    battleLog: newBattleLog
                }));
            }
            
            setIsAnimating(false);
        }, 1000);
    };

    // Obtener movimientos disponibles para un Pokémon
    const getAvailableMoves = (pokemon) => {
        if (!pokemon || !pokemon.types) return [];
        return pokemon.types.map(type => basicMoves[type.type.name]).filter(Boolean);
    };

    // Renderizar barra de HP
    const renderHpBar = (pokemon, isPokemon1) => {
        const hpPercentage = (pokemon.currentHp / pokemon.maxHp) * 100;
        const hpColor = hpPercentage > 60 ? '#4CAF50' : hpPercentage > 30 ? '#FF9800' : '#F44336';
        
        return (
            <div className={`hp-container ${isPokemon1 ? 'hp-left' : 'hp-right'}`}>
                <div className="hp-info">
                    <span className="pokemon-name">{pokemon.name}</span>
                    <span className="hp-text">{pokemon.currentHp}/{pokemon.maxHp} HP</span>
                </div>
                <div className="hp-bar">
                    <div 
                        className="hp-fill"
                        style={{ width: `${hpPercentage}%`, backgroundColor: hpColor }}
                    />
                </div>
            </div>
        );
    };

    if (!pokemon1 || !pokemon2) {
        return (
            <div className="battle-simulator">
                <div className="battle-placeholder">
                    <h3>⚔️ Battle Simulator</h3>
                    <div className="selection-status">
                        <div className={`pokemon-status ${pokemon1 ? 'selected' : 'not-selected'}`}>
                            <span>Pokémon 1:</span>
                            <span>{pokemon1 ? `✅ ${pokemon1.name}` : '❌ No seleccionado'}</span>
                        </div>
                        <div className={`pokemon-status ${pokemon2 ? 'selected' : 'not-selected'}`}>
                            <span>Pokémon 2:</span>
                            <span>{pokemon2 ? `✅ ${pokemon2.name}` : '❌ No seleccionado'}</span>
                        </div>
                    </div>
                    <div className="battle-instructions">
                        <h4>📋 Instrucciones:</h4>
                        <ol>
                            <li>Selecciona un Pokémon de la lista (se asignará automáticamente al Slot 1)</li>
                            <li>Selecciona otro Pokémon diferente (se asignará al Slot 2)</li>
                            <li>¡La batalla comenzará automáticamente!</li>
                        </ol>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <motion.div 
            className="battle-simulator"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="battle-header">
                <h3>⚔️ Battle Simulator</h3>
                <div className="battle-status">
                    {battleState.isBattleActive ? (
                        <span className="status-active">En curso</span>
                    ) : (
                        <span className="status-ended">Finalizada</span>
                    )}
                </div>
            </div>

            <div className="battle-arena">
                {/* Pokémon 1 */}
                <motion.div 
                    className={`pokemon-battle ${battleState.turn === 1 ? 'active-turn' : ''}`}
                    animate={battleState.turn === 1 ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 0.5, repeat: Infinity }}
                >
                    <img 
                        src={battleState.pokemon1.sprites.front_default} 
                        alt={battleState.pokemon1.name}
                        className="battle-sprite"
                    />
                    {renderHpBar(battleState.pokemon1, true)}
                </motion.div>

                {/* VS */}
                <div className="vs-container">
                    <motion.div 
                        className="vs-text"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                        VS
                    </motion.div>
                </div>

                {/* Pokémon 2 */}
                <motion.div 
                    className={`pokemon-battle ${battleState.turn === 2 ? 'active-turn' : ''}`}
                    animate={battleState.turn === 2 ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 0.5, repeat: Infinity }}
                >
                    <img 
                        src={battleState.pokemon2.sprites.front_default} 
                        alt={battleState.pokemon2.name}
                        className="battle-sprite"
                    />
                    {renderHpBar(battleState.pokemon2, false)}
                </motion.div>
            </div>

            {/* Controles de batalla */}
            {battleState.isBattleActive && (
                <div className="battle-controls">
                    <div className="move-selection">
                        <h4>Seleccionar Movimiento:</h4>
                        <div className="moves-grid">
                            {getAvailableMoves(battleState.pokemon1).map((move, index) => (
                                <motion.button
                                    key={index}
                                    className={`move-btn ${selectedMove1 === move ? 'selected' : ''}`}
                                    onClick={() => setSelectedMove1(move)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    disabled={battleState.turn !== 1}
                                >
                                    <span className="move-name">{move.name}</span>
                                    <span className="move-power">Poder: {move.power}</span>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    <motion.button 
                        onClick={processTurn}
                        className="attack-btn"
                        disabled={isAnimating || !selectedMove1 || battleState.turn !== 1}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isAnimating ? '⚔️ Atacando...' : '⚔️ Atacar'}
                    </motion.button>
                </div>
            )}

            {/* Log de batalla */}
            <div className="battle-log">
                <h4>📜 Log de Batalla:</h4>
                <div className="log-content">
                    {battleState.battleLog.map((log, index) => (
                        <motion.div 
                            key={index}
                            className="log-entry"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            {log}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Resultado de la batalla */}
            <AnimatePresence>
                {battleState.winner && (
                    <motion.div 
                        className="battle-result"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                    >
                        <h3>🏆 ¡Victoria de {battleState.winner}! 🏆</h3>
                        <motion.button 
                            onClick={() => window.location.reload()}
                            className="restart-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            🔄 Nueva Batalla
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default BattleSimulator;
