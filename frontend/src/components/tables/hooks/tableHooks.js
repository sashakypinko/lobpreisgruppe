import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState,
} from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { tableFilterStore, latestFilterIndexStore } from '@/components/tables/stores/TableStores';

export const useTableFilters = () => useRecoilValue(tableFilterStore);

export const useSetTableFilters = () => useSetRecoilState(tableFilterStore);

export const useLatestFilter = () => useRecoilValue(latestFilterIndexStore);

export const useSetLatestFilter = () => useSetRecoilState(latestFilterIndexStore);

export const useTableFiltersByToken = token => {
  const filters = useTableFilters();

  const { [token]: tokenFilters } = filters;

  return useMemo(() => tokenFilters || {}, [tokenFilters]);
};

export const useSetTableFiltersByToken = token => {
  const filters = useTableFilters();
  const setFilters = useSetTableFilters();

  return useCallback(data => setFilters({ ...filters, [token]: data }), [filters, setFilters, token]);
};

export const useDebounceChangeFilter = token => {
  const filters = useTableFiltersByToken(token);
  const setFilters = useSetTableFiltersByToken(token);

  return useDebouncedCallback((columnIndex, newFilterValue) => setFilters({
    ...filters,
    [columnIndex]: newFilterValue,
  }), 50);
};

function useEventListener(eventName, handler, element = window) {
  const savedHandler = useRef();
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  useEffect(
    () => {
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;
      const eventListener = event => savedHandler.current(event);
      element.addEventListener(eventName, eventListener);
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element],
  );
}

export const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const useElementSize = (handleSizeEffect = []) => {
  const [ref, setRef] = useState(null);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  const handleSize = useCallback(() => {
    setSize({
      width: ref?.offsetWidth || 0,
      height: ref?.offsetHeight || 0,
    });
  }, [ref?.offsetWidth, ref?.offsetHeight]);

  useEventListener('resize', handleSize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(handleSize, handleSizeEffect);

  useIsomorphicLayoutEffect(() => {
    handleSize();
  }, [ref?.offsetHeight, ref?.offsetWidth]);

  return [size, setRef];
};

export default { useTableFilters, useSetTableFilters };
