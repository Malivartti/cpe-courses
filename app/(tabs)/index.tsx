import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  View,
} from 'react-native';

import { Page } from '@/components/Page';
import { useBreakpoint } from '@/components/useBreakpoint';
import { CourseFiltersSidebar } from '@/features/courses/components/CourseFiltersSidebar';
import { CourseList } from '@/features/courses/components/CourseList';
import { CoursesHeader } from '@/features/courses/components/CoursesHeader';
import { SortSelector } from '@/features/courses/components/SortSelector';
import { useAuthStore } from '@/shared/store/auth';
import { useCoursesStore } from '@/shared/store/courses';
import { spacing } from '@/shared/theme';
import { Button } from '@/shared/ui';

export default function HomeScreen() {
  const { isDesktop, isPhone } = useBreakpoint();
  const { loadCourses, setFilter } = useCoursesStore();
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role === 'admin';
  const header_height = 50 + spacing.lg + 50 * Number(isAdmin);

  const lastScrollY = useRef(0);
  const headerTranslateY = useRef(new Animated.Value(0)).current;
  const isHeaderVisible = useRef(true);
  const [headerVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      setFilter({
        status: undefined,
        isPublished: undefined,
        isUpcoming: undefined,
      });
    }
    loadCourses();
  }, []);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!isPhone) return;

    const currentScrollY = event.nativeEvent.contentOffset.y;
    const delta = currentScrollY - lastScrollY.current;

    if (delta > 5 && currentScrollY > 50 && isHeaderVisible.current) {
      isHeaderVisible.current = false;
      setHeaderVisible(false);
      Animated.timing(headerTranslateY, {
        toValue: -header_height,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else if (delta < -5 && !isHeaderVisible.current) {
      isHeaderVisible.current = true;
      setHeaderVisible(true);
      Animated.timing(headerTranslateY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }

    lastScrollY.current = currentScrollY;
  };

  return (
    <Page hasHeader hasTabs>
      {isDesktop ? (
        <View style={styles.desktopLayout}>
          <CourseFiltersSidebar />

          <View style={styles.desktopContent}>
            <SortSelector />
            {isAdmin && (
              <View style={styles.adminActions}>
                <Button title="Создать курс" onPress={() => router.push('/courses/create')} />
              </View>
            )}
            <CourseList />
          </View>
        </View>
      ) : isPhone ? (
        <View style={styles.mobileLayout}>
          <CourseList onScroll={handleScroll} headerHeight={header_height} />

          <Animated.View
            style={[
              styles.headerContainer,
              {
                transform: [{ translateY: headerTranslateY }],
              },
            ]}
          >
            {isAdmin && (
              <View style={styles.adminActionsMobile}>
                <Button
                  title="Создать курс"
                  size="md"
                  onPress={() => router.push('/courses/create')}
                />
              </View>
            )}
            <CoursesHeader isVisible={headerVisible} />
          </Animated.View>
        </View>
      ) : (
        <View style={styles.tabletLayout}>
          <CoursesHeader />

          {true && (
            <View style={styles.adminActions}>
              <Button title="Создать курс" onPress={() => router.push('/courses/create')} />
            </View>
          )}

          <CourseList />
        </View>
      )}
    </Page>
  );
}

const styles = StyleSheet.create({
  desktopLayout: {
    flexDirection: 'row',
    gap: spacing.lg,
    flex: 1,
  },
  desktopContent: {
    flex: 1,
    gap: spacing.md,
  },
  mobileLayout: {
    flex: 1,
    position: 'relative',
  },
  tabletLayout: {
    flex: 1,
    gap: spacing.lg,
  },

  adminActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  adminActionsMobile: {
    paddingBottom: spacing.sm,
  },

  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
});
