import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Page } from '@/components/Page';
import { CategoriesSection } from '@/features/dictionaries/Categories';
import { LecturersSection } from '@/features/dictionaries/Lecturers';
import { SkillsSection } from '@/features/dictionaries/Skills';
import { TagsSection } from '@/features/dictionaries/Tags';
import { spacing } from '@/shared/theme';
import { Text } from '@/shared/ui';

export default function DictionariesScreen() {
  return (
    <Page hasHeader hasTabs>
      <ScrollView contentContainerStyle={styles.content} style={styles.scrollView}>
        <View style={styles.header}>
          <Text variant="h2">Справочники</Text>
          <Text variant="body" style={styles.subtitle}>
            Управление категориями, навыками, преподавателями и другими данными
          </Text>
        </View>

        <CategoriesSection />
        <TagsSection />
        <SkillsSection />
        <LecturersSection />
      </ScrollView>
    </Page>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: -spacing.lg,
  },
  content: {
    gap: spacing.xl,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  header: {
    gap: spacing.sm,
  },
  subtitle: {
    opacity: 0.7,
  },
});
