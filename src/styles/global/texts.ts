import { textColors } from './colors';
import { TextStyle } from "react-native"; 

export const title30: TextStyle = {
  fontSize: 30,
  lineHeight: 30,
  fontWeight: 'bold',
};

export const title20: TextStyle = {
  fontSize: 20,
  lineHeight: 20,
  fontWeight: 'bold',
};

export const title18: TextStyle = {
  fontSize: 18,
  lineHeight: 18,
  fontWeight: 'bold',
};

export const subTitle15: TextStyle = {
  fontSize: 15,
  lineHeight: 15,
  fontWeight: '600',
};

export const subTitle15grey: TextStyle = {
  ...subTitle15,
  color: textColors.grey
};

export const text15: TextStyle = {
  fontSize: 15,
  lineHeight: 15,
  fontWeight: '500',
};

export const text14: TextStyle = {
  fontSize: 14,
  lineHeight: 14,
  fontWeight: '500',
};

export const text11: TextStyle = {
  fontSize: 11,
  lineHeight: 11,
  fontWeight: '500',
};

export const text11grey: TextStyle = {
  ...text11,
  color: textColors.grey
};