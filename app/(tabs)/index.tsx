import React, { useEffect, useRef, useState } from 'react';
import { Animated, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from 'react-native';

import { Page } from '@/components/Page';
import { useBreakpoint } from '@/components/useBreakpoint';
import { CourseFiltersSidebar } from '@/features/courses/components/CourseFiltersSidebar';
import { CourseList } from '@/features/courses/components/CourseList';
import { CoursesHeader } from '@/features/courses/components/CoursesHeader';
import { SortSelector } from '@/features/courses/components/SortSelector';
import { useCoursesStore } from '@/shared/store/courses.store';
import { spacing } from '@/shared/theme';

const HEADER_HEIGHT = 50 + spacing.lg;

export default function HomeScreen() {
  const { isDesktop, isPhone } = useBreakpoint();
  const { loadDictionaries, loadCourses } = useCoursesStore();

  const lastScrollY = useRef(0);
  const headerTranslateY = useRef(new Animated.Value(0)).current;
  const isHeaderVisible = useRef(true);
  const [headerVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    loadDictionaries();
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
        toValue: -HEADER_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
    // Скроллим вверх
    else if (delta < -5 && !isHeaderVisible.current) {
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
            <CourseList />
          </View>
        </View>
      ) : isPhone ? (
        <View style={styles.mobileLayout}>
          <CourseList onScroll={handleScroll} headerHeight={HEADER_HEIGHT} />
          <Animated.View
            style={[
              styles.headerContainer,
              {
                transform: [{ translateY: headerTranslateY }],
              },
            ]}
          >
            <CoursesHeader isVisible={headerVisible} />
          </Animated.View>
        </View>
      ) : (
        <View style={styles.tabletLayout}>
          <CoursesHeader />
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
  },
  mobileLayout: {
    flex: 1,
    position: 'relative',
  },
  tabletLayout: {
    flex: 1,
    gap: spacing.lg,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
});
