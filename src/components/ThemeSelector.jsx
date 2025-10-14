// SRC/COMPONENTS/THEMESELECTOR.JSX
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import './ThemeSelector.css';

const ThemeSelector = () => {
    const { currentTheme, themeName, themes, applyTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const handleThemeChange = (themeKey) => {
        applyTheme(themeKey);
        setIsOpen(false);
    };

    return (
        <div className="theme-selector">
            <motion.button
                className="theme-toggle-btn"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Cambiar tema"
            >
                🎨 {currentTheme.name}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="theme-dropdown"
                        initial={{ opacity: 0, y: -10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="theme-dropdown-header">
                            <h4>🎨 Seleccionar Tema</h4>
                            <button 
                                className="close-btn"
                                onClick={() => setIsOpen(false)}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="theme-grid">
                            {Object.entries(themes).map(([key, theme]) => (
                                <motion.button
                                    key={key}
                                    className={`theme-option ${themeName === key ? 'active' : ''}`}
                                    onClick={() => handleThemeChange(key)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        background: theme.background,
                                        color: theme.text
                                    }}
                                >
                                    <div className="theme-preview">
                                        <div 
                                            className="theme-color-dot"
                                            style={{ backgroundColor: theme.primary }}
                                        ></div>
                                        <div 
                                            className="theme-color-dot"
                                            style={{ backgroundColor: theme.secondary }}
                                        ></div>
                                        <div 
                                            className="theme-color-dot"
                                            style={{ backgroundColor: theme.accent }}
                                        ></div>
                                    </div>
                                    <span className="theme-name">{theme.name}</span>
                                    {themeName === key && (
                                        <motion.span 
                                            className="selected-indicator"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.1 }}
                                        >
                                            ✓
                                        </motion.span>
                                    )}
                                </motion.button>
                            ))}
                        </div>

                        <div className="theme-info">
                            <p>✨ Personaliza la apariencia de tu Pokédex</p>
                            <p>🎮 Cada tema tiene colores únicos</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ThemeSelector;
