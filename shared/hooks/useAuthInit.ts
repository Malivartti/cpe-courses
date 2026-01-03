import { useEffect } from 'react';

import { useAuthStore } from '../store/auth.store';

export const useAuthInit = () => {
  const { checkAuth, isInitialized } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return { isInitialized };
};
