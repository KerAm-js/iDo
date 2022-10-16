import { textColors } from './colors';
import { TextStyle } from "react-native"; 

export const title30: TextStyle = {
  fontSize: 30,
  lineHeight: 30,
  fontWeight: 'bold',
};
export const title30LineHeight: TextStyle = {
  ...title30,
  lineHeight: 45
}

export const title20: TextStyle = {
  fontSize: 20,
  lineHeight: 20,
  fontWeight: 'bold',
};
export const title20LineHeight: TextStyle = {
  ...title20,
  lineHeight: 30
}

export const title18: TextStyle = {
  fontSize: 18,
  lineHeight: 18,
  fontWeight: 'bold',
};
export const title18LineHeight: TextStyle = {
  ...title18,
  lineHeight: 27
};

export const subTitle15: TextStyle = {
  fontSize: 15,
  lineHeight: 15,
  fontWeight: '600',
};
export const subTitle15LineHeight: TextStyle = {
  ...subTitle15,
  lineHeight: 23
};

export const text15: TextStyle = {
  fontSize: 15,
  lineHeight: 15,
  fontWeight: '400',
};
export const text15LineHeight: TextStyle = {
  ...text15,
  lineHeight: 27
}

export const text14: TextStyle = {
  fontSize: 14,
  lineHeight: 14,
  fontWeight: '500',
};
export const text14LineHeight: TextStyle = {
  ...text14,
  lineHeight: 21
}

export const text11: TextStyle = {
  fontSize: 11,
  lineHeight: 11,
  fontWeight: '400',
};
export const text11LineHeight: TextStyle = {
  ...text11,
  lineHeight: 17
}

export const textGrey: TextStyle = {
  color: textColors.grey,
}