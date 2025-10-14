// SRC/HOOKS/USETHEME.JS
import { useState, useEffect, useCallback } from 'react';

// Temas predefinidos
const themes = {
    classic: {
        name: 'Clásico Pokémon',
        primary: '#ffcc00',
        secondary: '#ff8800',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        accent: '#4CAF50',
        text: '#ffffff'
    },
    fire: {
        name: 'Fuego',
        primary: '#ff6b6b',
        secondary: '#ee5a24',
        background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
        accent: '#ff9ff3',
        text: '#ffffff'
    },
    water: {
        name: 'Agua',
        primary: '#74b9ff',
        secondary: '#0984e3',
        background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
        accent: '#81ecec',
        text: '#ffffff'
    },
    grass: {
        name: 'Planta',
        primary: '#00b894',
        secondary: '#00a085',
        background: 'linear-gradient(135deg, #00b894 0%, #00a085 100%)',
        accent: '#55efc4',
        text: '#ffffff'
    },
    electric: {
        name: 'Eléctrico',
        primary: '#fdcb6e',
        secondary: '#e17055',
        background: 'linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)',
        accent: '#ffeaa7',
        text: '#2d3436'
    },
    psychic: {
        name: 'Psíquico',
        primary: '#a29bfe',
        secondary: '#6c5ce7',
        background: 'linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)',
        accent: '#fd79a8',
        text: '#ffffff'
    },
    dark: {
        name: 'Oscuro',
        primary: '#2d3436',
        secondary: '#636e72',
        background: 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
        accent: '#ddd',
        text: '#ffffff'
    },
    fairy: {
        name: 'Hada',
        primary: '#fd79a8',
        secondary: '#e84393',
        background: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)',
        accent: '#ffeaa7',
        text: '#ffffff'
    },
    dragon: {
        name: 'Dragón',
        primary: '#6c5ce7',
        secondary: '#a29bfe',
        background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
        accent: '#fd79a8',
        text: '#ffffff'
    }
};

export const useTheme = () => {
    const [currentTheme, setCurrentTheme] = useState(() => {
        const savedTheme = localStorage.getItem('selectedTheme');
        return savedTheme && themes[savedTheme] ? themes[savedTheme] : themes.classic;
    });

    const [themeName, setThemeName] = useState(() => {
        const savedTheme = localStorage.getItem('selectedTheme');
        return savedTheme || 'classic';
    });

    const applyTheme = useCallback((themeKey) => {
        const theme = themes[themeKey];
        if (theme) {
            setCurrentTheme(theme);
            setThemeName(themeKey);
            localStorage.setItem('selectedTheme', themeKey);
            
            // Aplicar variables CSS
            const root = document.documentElement;
            root.style.setProperty('--theme-primary', theme.primary);
            root.style.setProperty('--theme-secondary', theme.secondary);
            root.style.setProperty('--theme-background', theme.background);
            root.style.setProperty('--theme-accent', theme.accent);
            root.style.setProperty('--theme-text', theme.text);
        }
    }, []);

    // Aplicar tema al cargar
    useEffect(() => {
        applyTheme(themeName);
    }, [themeName, applyTheme]);

    return {
        currentTheme,
        themeName,
        themes,
        applyTheme
    };
};

export default useTheme;
