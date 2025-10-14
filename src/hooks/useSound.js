// SRC/HOOKS/USESOUND.JS
import { useState, useCallback } from 'react';

// URLs de sonidos (usando Web Audio API para generar sonidos sintéticos)
const soundUrls = {
    // Sonidos de batalla
    battleStart: null,
    attack: null,
    hit: null,
    criticalHit: null,
    battleWin: null,
    battleLose: null,
    
    // Sonidos de Shiny
    shinyFound: null,
    shinyDetection: null,
    
    // Sonidos de UI
    buttonClick: null,
    success: null,
    error: null,
    notification: null
};

// Generar sonidos sintéticos usando Web Audio API
const generateSound = (type, frequency = 440, duration = 0.1) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
};

// Sonidos específicos para cada evento
const soundConfigs = {
    battleStart: () => generateSound('battle', 200, 0.5),
    attack: () => generateSound('attack', 300, 0.2),
    hit: () => generateSound('hit', 150, 0.3),
    criticalHit: () => {
        generateSound('critical', 600, 0.1);
        setTimeout(() => generateSound('critical', 800, 0.1), 100);
        setTimeout(() => generateSound('critical', 1000, 0.1), 200);
    },
    battleWin: () => {
        generateSound('win', 523, 0.2); // C
        setTimeout(() => generateSound('win', 659, 0.2), 200); // E
        setTimeout(() => generateSound('win', 784, 0.2), 400); // G
        setTimeout(() => generateSound('win', 1047, 0.4), 600); // C alta
    },
    battleLose: () => {
        generateSound('lose', 400, 0.3);
        setTimeout(() => generateSound('lose', 300, 0.3), 300);
        setTimeout(() => generateSound('lose', 200, 0.5), 600);
    },
    shinyFound: () => {
        // Secuencia especial para Shiny
        generateSound('shiny', 800, 0.1);
        setTimeout(() => generateSound('shiny', 1000, 0.1), 100);
        setTimeout(() => generateSound('shiny', 1200, 0.1), 200);
        setTimeout(() => generateSound('shiny', 1400, 0.2), 300);
        setTimeout(() => generateSound('shiny', 1600, 0.3), 500);
    },
    shinyDetection: () => generateSound('detection', 500, 0.15),
    buttonClick: () => generateSound('click', 800, 0.05),
    success: () => generateSound('success', 600, 0.2),
    error: () => generateSound('error', 200, 0.3),
    notification: () => generateSound('notification', 440, 0.1)
};

export const useSound = () => {
    const [isEnabled, setIsEnabled] = useState(() => {
        return localStorage.getItem('soundEnabled') !== 'false';
    });

    const playSound = useCallback((soundType) => {
        if (!isEnabled || !soundConfigs[soundType]) return;
        
        try {
            soundConfigs[soundType]();
        } catch (error) {
            console.warn('Error playing sound:', error);
        }
    }, [isEnabled]);

    const toggleSound = useCallback(() => {
        setIsEnabled(prev => {
            const newState = !prev;
            localStorage.setItem('soundEnabled', newState.toString());
            return newState;
        });
    }, []);

    return {
        isEnabled,
        playSound,
        toggleSound
    };
};

export default useSound;
