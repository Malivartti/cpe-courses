import { Href, router } from 'expo-router';
import { useEffect } from 'react';

import { useAuthStore } from '../store/auth';
import { Role } from '../types/user';

type ProtectionType = 'guest-only' | 'auth-only' | 'role';

interface ProtectOptions {
  type: ProtectionType;
  allowedRoles?: Role[];
  redirectTo?: Href;
}

export function useProtectedRoute(options: ProtectOptions) {
  const { user } = useAuthStore();
  const isGuest = !user;

  useEffect(() => {
    if (options.type === 'guest-only' && !isGuest) {
      router.replace(options.redirectTo || '/');
      return;
    }

    if (options.type === 'auth-only' && isGuest) {
      router.replace(options.redirectTo || '/auth');
      return;
    }

    if (options.type === 'role' && options.allowedRoles) {
      if (isGuest) {
        router.replace(options.redirectTo || '/auth');
        return;
      }

      if (!options.allowedRoles.includes(user.role)) {
        router.replace(options.redirectTo || '/');
        return;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isGuest]);

  return {
    isAllowed:
      options.type === 'guest-only'
        ? isGuest
        : options.type === 'auth-only'
          ? !isGuest
          : !isGuest && options.allowedRoles?.includes(user?.role || 'guest'),
    isLoading: false,
  };
}
