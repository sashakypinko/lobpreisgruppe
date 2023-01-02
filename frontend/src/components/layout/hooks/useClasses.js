import { useMemo } from 'react';
import { useTheme } from '@emotion/react';
import { css } from '@emotion/css';

const isProduction = import.meta.env.VITE_ENVIRONMENT === 'prod';

export const createClassName = (value, key) => css(value, !isProduction && key ? {
  label: key,
} : undefined);

/// ** @returns {Object.<string, string>} */

const useClasses = stylesElement => {
  const theme = useTheme();
  return useMemo(() => {
    const rawClasses = typeof stylesElement === 'function'
      ? stylesElement(theme)
      : stylesElement;

    const prepared = {};

    Object.entries(rawClasses).forEach(([key, value = {}]) => {
      prepared[key] = `${createClassName(value, key)}`;
    });

    return prepared;
  }, [stylesElement, theme]);
};

export default useClasses;
