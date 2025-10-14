// SRC/CONTEXT/FAVORITESCONTEXT.JSX
import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [stats, setStats] = useState({
        totalViews: 0,
        favoriteCount: 0,
        searchHistory: [],
        playTime: 0
    });

    // Cargar datos del localStorage al inicializar
    useEffect(() => {
        const savedFavorites = localStorage.getItem('pokemon-favorites');
        const savedAchievements = localStorage.getItem('pokemon-achievements');
        const savedStats = localStorage.getItem('pokemon-stats');

        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
        if (savedAchievements) {
            setAchievements(JSON.parse(savedAchievements));
        }
        if (savedStats) {
            setStats(JSON.parse(savedStats));
        }
    }, []);

    // Guardar favoritos en localStorage
    useEffect(() => {
        localStorage.setItem('pokemon-favorites', JSON.stringify(favorites));
        localStorage.setItem('pokemon-achievements', JSON.stringify(achievements));
        localStorage.setItem('pokemon-stats', JSON.stringify(stats));
    }, [favorites, achievements, stats]);

    // Añadir/quitar favorito
    const toggleFavorite = (pokemon) => {
        setFavorites(prev => {
            const isFavorite = prev.some(fav => fav.id === pokemon.id);
            if (isFavorite) {
                const newFavorites = prev.filter(fav => fav.id !== pokemon.id);
                checkAchievements('favorite_removed', newFavorites.length);
                return newFavorites;
            } else {
                const newFavorites = [...prev, pokemon];
                checkAchievements('favorite_added', newFavorites.length);
                return newFavorites;
            }
        });
    };

    // Verificar si un Pokémon es favorito
    const isFavorite = (pokemonId) => {
        return favorites.some(fav => fav.id === pokemonId);
    };

    // Añadir a historial de búsquedas
    const addToSearchHistory = (searchTerm) => {
        if (searchTerm.trim()) {
            setStats(prev => {
                const newHistory = [searchTerm, ...prev.searchHistory.filter(term => term !== searchTerm)].slice(0, 10);
                return {
                    ...prev,
                    searchHistory: newHistory
                };
            });
        }
    };

    // Incrementar tiempo de juego
    const incrementPlayTime = () => {
        setStats(prev => ({
            ...prev,
            playTime: prev.playTime + 1
        }));
    };

    // Incrementar vistas
    const incrementViews = () => {
        setStats(prev => {
            const newViews = prev.totalViews + 1;
            checkAchievements('views', newViews);
            return {
                ...prev,
                totalViews: newViews
            };
        });
    };

    // Sistema de logros
    const checkAchievements = (type, value) => {
        const newAchievements = [...achievements];

        // Logros por favoritos
        if (type === 'favorite_added' && value === 1 && !newAchievements.some(a => a.id === 'first_favorite')) {
            newAchievements.push({
                id: 'first_favorite',
                title: 'Primer Favorito',
                description: 'Has añadido tu primer Pokémon favorito',
                icon: '❤️',
                date: new Date().toISOString()
            });
        }

        if (type === 'favorite_added' && value === 10 && !newAchievements.some(a => a.id === 'collector')) {
            newAchievements.push({
                id: 'collector',
                title: 'Coleccionista',
                description: 'Has añadido 10 Pokémon favoritos',
                icon: '🏆',
                date: new Date().toISOString()
            });
        }

        if (type === 'favorite_added' && value === 50 && !newAchievements.some(a => a.id === 'master_collector')) {
            newAchievements.push({
                id: 'master_collector',
                title: 'Maestro Coleccionista',
                description: 'Has añadido 50 Pokémon favoritos',
                icon: '👑',
                date: new Date().toISOString()
            });
        }

        // Logros por vistas
        if (type === 'views' && value === 100 && !newAchievements.some(a => a.id === 'explorer')) {
            newAchievements.push({
                id: 'explorer',
                title: 'Explorador',
                description: 'Has visto 100 Pokémon',
                icon: '🔍',
                date: new Date().toISOString()
            });
        }

        if (type === 'views' && value === 500 && !newAchievements.some(a => a.id === 'dedicated_trainer')) {
            newAchievements.push({
                id: 'dedicated_trainer',
                title: 'Entrenador Dedicado',
                description: 'Has visto 500 Pokémon',
                icon: '⭐',
                date: new Date().toISOString()
            });
        }

        // Logros por tiempo de juego
        if (stats.playTime > 0 && stats.playTime % 60 === 0 && !newAchievements.some(a => a.id === 'time_master')) {
            newAchievements.push({
                id: 'time_master',
                title: 'Maestro del Tiempo',
                description: `Has jugado por ${Math.floor(stats.playTime / 60)} minutos`,
                icon: '⏰',
                date: new Date().toISOString()
            });
        }

        if (newAchievements.length > achievements.length) {
            setAchievements(newAchievements);
            // Mostrar notificación de logro desbloqueado
            const latestAchievement = newAchievements[newAchievements.length - 1];
            showAchievementNotification(latestAchievement);
        }
    };

    // Mostrar notificación de logro
    const showAchievementNotification = (achievement) => {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(`¡Logro Desbloqueado! ${achievement.title}`, {
                body: achievement.description,
                icon: '/favicon.ico'
            });
        }
    };

    // Solicitar permisos de notificación
    const requestNotificationPermission = () => {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    };

    // Obtener progreso de colección por tipo
    const getCollectionProgress = () => {
        const typeCount = {};
        favorites.forEach(pokemon => {
            pokemon.types.forEach(type => {
                const typeName = type.type.name;
                typeCount[typeName] = (typeCount[typeName] || 0) + 1;
            });
        });
        return typeCount;
    };

    // Obtener estadísticas de la colección
    const getCollectionStats = () => {
        const typeProgress = getCollectionProgress();
        const totalTypes = 18; // Total de tipos Pokémon
        const collectedTypes = Object.keys(typeProgress).length;
        
        return {
            totalFavorites: favorites.length,
            collectedTypes,
            totalTypes,
            typeProgress,
            completionPercentage: Math.round((collectedTypes / totalTypes) * 100)
        };
    };

    const value = {
        favorites,
        achievements,
        stats,
        toggleFavorite,
        isFavorite,
        addToSearchHistory,
        incrementPlayTime,
        incrementViews,
        getCollectionProgress,
        getCollectionStats,
        requestNotificationPermission
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};
