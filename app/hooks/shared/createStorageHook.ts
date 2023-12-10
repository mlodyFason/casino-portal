import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { isClient } from './isClient';
import safelyParseJson from './safelyParseJson';

/**
 * An utility to quickly create hooks to access both Session Storage and Local Storage
 */
const createStorageHook = (type: 'session' | 'local') => {
  const storageName = `${type}Storage`;

  return <T>(
    storageKey: string,
    defaultValue?: T,
  ): [T, Dispatch<SetStateAction<T>>] => {
    if (!isClient()) {
      return [JSON.stringify(defaultValue) as unknown as T, () => undefined];
    }

    const storage = (window as any)[storageName];
    const [value, setValue] = useState<T>(
      safelyParseJson(
        storage.getItem(storageKey) || JSON.stringify(defaultValue),
      ),
    );

    useEffect(() => {
      storage.setItem(storageKey, JSON.stringify(value));
    }, [storageKey, value]);

    return [value, setValue];
  };
};

export default createStorageHook;
