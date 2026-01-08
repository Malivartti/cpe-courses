import { router } from 'expo-router';
import React, { useEffect } from 'react';

import { Page } from '@/components/Page';
import { useBreakpoint } from '@/components/useBreakpoint';
import { CourseFiltersModal } from '@/features/courses/components/CourseFiltersModal';

export default function FiltersScreen() {
  const { isDesktop } = useBreakpoint();

  useEffect(() => {
    if (isDesktop) {
      router.replace('/');
    }
  }, [isDesktop]);

  if (isDesktop) {
    return null;
  }

  return (
    <Page hasHeader>
      <CourseFiltersModal />
    </Page>
  );
}
