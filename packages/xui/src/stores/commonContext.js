import React from 'react';

export const title = {
    title: '',
    setTitle: () => {},
};
export const titleContext = React.createContext(title);

export const theme = {
    light: {
        foreground: '#ffffff',
        background: '#222222',
    },
    dark: {
        foreground: '#000000',
        background: '#eeeeee',
    },
};
export const themeContext = React.createContext(theme.dark);
