// SRC/HOOKS/USEACHIEVEMENTS.JS
import { useState, useEffect, useCallback } from 'react';

// Definición de logros
const achievements = {
    firstShiny: {
        id: 'firstShiny',
        name: '✨ Primer Shiny',
        description: 'Encuentra tu primer Pokémon Shiny',
        icon: '✨',
        points: 100,
        unlocked: false
    },
    shinyHunter: {
        id: 'shinyHunter',
        name: '🎯 Cazador Shiny',
        description: 'Encuentra 5 Pokémon Shiny',
        icon: '🎯',
        points: 500,
        unlocked: false,
        progress: 0,
        target: 5
    },
    battleMaster: {
        id: 'battleMaster',
        name: '⚔️ Maestro de Batalla',
        description: 'Gana 10 batallas',
        icon: '⚔️',
        points: 300,
        unlocked: false,
        progress: 0,
        target: 10
    },
    teamBuilder: {
        id: 'teamBuilder',
        name: '🎮 Constructor de Equipos',
        description: 'Genera 20 equipos diferentes',
        icon: '🎮',
        points: 200,
        unlocked: false,
        progress: 0,
        target: 20
    },
    pokemonExplorer: {
        id: 'pokemonExplorer',
        name: '🔍 Explorador Pokémon',
        description: 'Ve 50 Pokémon diferentes',
        icon: '🔍',
        points: 150,
        unlocked: false,
        progress: 0,
        target: 50
    },
    speedDemon: {
        id: 'speedDemon',
        name: '⚡ Demonio de Velocidad',
        description: 'Detecta un Shiny en menos de 10 intentos',
        icon: '⚡',
        points: 250,
        unlocked: false
    },
    collector: {
        id: 'collector',
        name: '📚 Coleccionista',
        description: 'Añade 25 Pokémon a favoritos',
        icon: '📚',
        points: 300,
        unlocked: false,
        progress: 0,
        target: 25
    },
    themeMaster: {
        id: 'themeMaster',
        name: '🎨 Maestro de Temas',
        description: 'Prueba todos los temas disponibles',
        icon: '🎨',
        points: 100,
        unlocked: false,
        progress: 0,
        target: 9
    }
};

export const useAchievements = () => {
    const [unlockedAchievements, setUnlockedAchievements] = useState(() => {
        const saved = localStorage.getItem('achievements');
        return saved ? JSON.parse(saved) : {};
    });

    const [achievementStats, setAchievementStats] = useState(() => {
        const saved = localStorage.getItem('achievementStats');
        return saved ? JSON.parse(saved) : {
            shiniesFound: 0,
            battlesWon: 0,
            teamsGenerated: 0,
            pokemonViewed: 0,
            favoritesAdded: 0,
            themesUsed: new Set(['classic'])
        };
    });

    const [recentUnlocks, setRecentUnlocks] = useState([]);

    // Guardar progreso
    const saveProgress = useCallback(() => {
        localStorage.setItem('achievements', JSON.stringify(unlockedAchievements));
        localStorage.setItem('achievementStats', JSON.stringify({
            ...achievementStats,
            themesUsed: Array.from(achievementStats.themesUsed)
        }));
    }, [unlockedAchievements, achievementStats]);

    // Verificar y desbloquear logros
    const checkAchievements = useCallback(() => {
        const newUnlocks = [];
        const updatedAchievements = { ...unlockedAchievements };

        Object.entries(achievements).forEach(([key, achievement]) => {
            if (updatedAchievements[key]) return; // Ya desbloqueado

            let shouldUnlock = false;

            switch (key) {
                case 'firstShiny':
                    shouldUnlock = achievementStats.shiniesFound >= 1;
                    break;
                case 'shinyHunter':
                    shouldUnlock = achievementStats.shiniesFound >= 5;
                    break;
                case 'battleMaster':
                    shouldUnlock = achievementStats.battlesWon >= 10;
                    break;
                case 'teamBuilder':
                    shouldUnlock = achievementStats.teamsGenerated >= 20;
                    break;
                case 'pokemonExplorer':
                    shouldUnlock = achievementStats.pokemonViewed >= 50;
                    break;
                case 'speedDemon':
                    // Este se desbloquea manualmente cuando se encuentra un Shiny rápido
                    break;
                case 'collector':
                    shouldUnlock = achievementStats.favoritesAdded >= 25;
                    break;
                case 'themeMaster':
                    shouldUnlock = achievementStats.themesUsed.size >= 9;
                    break;
            }

            if (shouldUnlock) {
                updatedAchievements[key] = {
                    ...achievement,
                    unlocked: true,
                    unlockedAt: new Date().toISOString()
                };
                newUnlocks.push(achievement);
            }
        });

        if (newUnlocks.length > 0) {
            setUnlockedAchievements(updatedAchievements);
            setRecentUnlocks(prev => [...newUnlocks, ...prev].slice(0, 5));
        }
    }, [achievementStats, unlockedAchievements]);

    // Actualizar estadísticas
    const updateStats = useCallback((statName, value = 1) => {
        setAchievementStats(prev => {
            const newStats = { ...prev };
            
            if (statName === 'themesUsed' && typeof value === 'string') {
                newStats.themesUsed = new Set([...newStats.themesUsed, value]);
            } else if (typeof newStats[statName] === 'number') {
                newStats[statName] += value;
            }
            
            return newStats;
        });
    }, []);

    // Desbloquear logro específico
    const unlockAchievement = useCallback((achievementId) => {
        const achievement = achievements[achievementId];
        if (achievement && !unlockedAchievements[achievementId]) {
            setUnlockedAchievements(prev => ({
                ...prev,
                [achievementId]: {
                    ...achievement,
                    unlocked: true,
                    unlockedAt: new Date().toISOString()
                }
            }));
            
            setRecentUnlocks(prev => [achievement, ...prev].slice(0, 5));
        }
    }, [unlockedAchievements]);

    // Obtener progreso de un logro
    const getAchievementProgress = useCallback((achievementId) => {
        const achievement = achievements[achievementId];
        if (!achievement || achievement.unlocked) return null;

        let progress = 0;
        switch (achievementId) {
            case 'shinyHunter':
                progress = achievementStats.shiniesFound;
                break;
            case 'battleMaster':
                progress = achievementStats.battlesWon;
                break;
            case 'teamBuilder':
                progress = achievementStats.teamsGenerated;
                break;
            case 'pokemonExplorer':
                progress = achievementStats.pokemonViewed;
                break;
            case 'collector':
                progress = achievementStats.favoritesAdded;
                break;
            case 'themeMaster':
                progress = achievementStats.themesUsed.size;
                break;
        }

        return { current: progress, target: achievement.target };
    }, [achievementStats]);

    // Calcular puntos totales
    const getTotalPoints = useCallback(() => {
        return Object.values(unlockedAchievements).reduce((total, achievement) => {
            return total + (achievement.points || 0);
        }, 0);
    }, [unlockedAchievements]);

    // Verificar logros cuando cambian las estadísticas
    useEffect(() => {
        checkAchievements();
    }, [checkAchievements]);

    // Guardar cuando cambia el estado
    useEffect(() => {
        saveProgress();
    }, [saveProgress]);

    return {
        achievements,
        unlockedAchievements,
        achievementStats,
        recentUnlocks,
        updateStats,
        unlockAchievement,
        getAchievementProgress,
        getTotalPoints,
        checkAchievements
    };
};

export default useAchievements;
