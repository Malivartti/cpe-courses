import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { spacing, useTheme } from '@/shared/theme';
import { Text } from '@/shared/ui';

interface CollapsibleFilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export function CollapsibleFilterSection({
  title,
  children,
  defaultExpanded = true,
}: CollapsibleFilterSectionProps) {
  const colors = useTheme();
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.header,
          { backgroundColor: colors.background.surfaceElevated, borderColor: colors.border.light },
        ]}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Text variant="label" style={styles.title}>
          {title}
        </Text>
        <FontAwesome
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={16}
          color={colors.text.secondary}
        />
      </Pressable>
      {isExpanded && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: spacing.sm,
    borderWidth: 1,
  },
  title: {
    fontWeight: '700',
    fontSize: 15,
  },
  content: {
    paddingHorizontal: spacing.xs,
  },
});
