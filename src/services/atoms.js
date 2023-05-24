
import {
    atom,
    
  } from 'recoil';

export const themeState = atom({
    key: 'themeState', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
  });