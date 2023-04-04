import { Theme } from '@react-navigation/native';

export const textColors = {
  grey: '#999',
  blue: '#007AFF',
  red: '#FF3B30',
  green: '#34C759',
}

export const buttonColors = {
  blue: '#007AFF',
  green: '#34C759',
  red: '#FF3B30',
}

export const backdropColor = {
  light: 'rgba(0, 0, 0, 0.2)',
  dark: 'rgba(0, 0, 0, 0.5)'
}

export const shadowColors = {
  light: 'rgba(0, 0, 0, 0.2)',
  dark: 'rgba(0, 0, 0, 0.5)',
}

export const themeColors: {
  dark: Theme,
  light: Theme,
} = {
  dark: {
    dark: true,
    colors: {
      primary: buttonColors.blue,
      notification: buttonColors.red,
      background: 'rgb(23, 23, 28)',
      card: 'rgb(32, 32, 38)',
      text: '#fff',
      border: '#444',
    }
  },
  light: {
    dark: false,
    colors: {
      primary: buttonColors.blue,
      notification: buttonColors.red,
      background: '#F5F5F9',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(0, 0, 0)',
      border: '#ddd',
    }
  }
}