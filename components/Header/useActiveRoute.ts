import { usePathname } from 'expo-router';

export function useActiveRoute(href: string) {
  const pathname = usePathname();
  return pathname === href;
}
