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

export const title22: TextStyle = {
  fontSize: 22,
  lineHeight: 22,
  fontWeight: 'bold',
};
export const title22LineHeight: TextStyle = {
  ...title22,
  lineHeight: 31,
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

export const subTitle16: TextStyle = {
  fontSize: 16,
  lineHeight: 16,
  fontWeight: '600',
};
export const subTitle16LineHeight: TextStyle = {
  ...subTitle16,
  lineHeight: 24
};

export const text17: TextStyle = {
  fontSize: 17,
  lineHeight: 17,
  fontWeight: '400',
}

export const text17Input: TextStyle = {
  ...text17,
  lineHeight: 21,
}

export const text17LineHeight: TextStyle = {
  ...text17,
  lineHeight: 25
}

export const text16: TextStyle = {
  fontSize: 16,
  lineHeight: 16,
  fontWeight: '400',
};
export const text16LineHeight: TextStyle = {
  ...text16,
  lineHeight: 24
}

export const text14: TextStyle = {
  fontSize: 14,
  lineHeight: 14,
  fontWeight: '400',
};

export const text14Input: TextStyle = {
  ...text14,
  lineHeight: 18,
};

export const text14LineHeight: TextStyle = {
  ...text14,
  lineHeight: 21
};

export const text12: TextStyle = {
  fontSize: 12,
  lineHeight: 12,
  fontWeight: '400',
};
export const text12LineHeight: TextStyle = {
  ...text12,
  lineHeight: 18
}

export const textGrey: TextStyle = {
  color: textColors.grey,
}

export const textBold: TextStyle = {
  fontWeight: 'bold',
}