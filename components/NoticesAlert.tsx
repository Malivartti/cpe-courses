import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { RecommendationNotice } from '@/shared/api/recommendations';
import { spacing, useTheme } from '@/shared/theme';
import { Text } from '@/shared/ui';

interface NoticesAlertProps {
  notices: RecommendationNotice[];
}

const getNoticeConfig = (
  notice: RecommendationNotice
): { icon: string; message: string; priority: number } => {
  switch (notice) {
    case RecommendationNotice.QUERY_INVALID:
      return {
        icon: 'exclamation-circle',
        message: 'Не удалось распознать описание. Показаны общие рекомендации',
        priority: 1,
      };
    case RecommendationNotice.QUERY_AMBIGUOUS:
      return {
        icon: 'question-circle',
        message: 'Описание неоднозначно. Показаны общие рекомендации',
        priority: 2,
      };
    case RecommendationNotice.FALLBACK_USED:
      return {
        icon: 'info-circle',
        message: 'Показаны общие рекомендации',
        priority: 3,
      };
    case RecommendationNotice.RANKING_WEAK:
      return {
        icon: 'warning',
        message: 'Мы не смогли найти подходящие курсы, но может вам подойдут данные курсы',
        priority: 4,
      };
    case RecommendationNotice.FILTERS_INFERRED:
      return {
        icon: 'check-circle',
        message: 'Применены фильтры на основе вашего запроса',
        priority: 5,
      };
    default:
      return {
        icon: 'info-circle',
        message: 'Курсы подобраны',
        priority: 10,
      };
  }
};

export function NoticesAlert({ notices }: NoticesAlertProps) {
  const colors = useTheme();

  if (!notices || notices.length === 0) {
    return null;
  }

  const sortedNotices = notices
    .map((notice) => ({ notice, config: getNoticeConfig(notice) }))
    .sort((a, b) => a.config.priority - b.config.priority);

  const primaryNotice = sortedNotices[0];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.warning.subtle,
          borderColor: colors.warning.default,
        },
      ]}
    >
      <FontAwesome
        name={primaryNotice.config.icon as any}
        size={16}
        color={colors.warning.default}
        style={styles.icon}
      />
      <Text variant="bodySmall" style={[styles.message, { color: colors.text.primary }]}>
        {primaryNotice.config.message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: spacing.sm,
    borderWidth: 1,
    marginBottom: spacing.md,
  },
  icon: {
    marginRight: spacing.sm,
  },
  message: {
    flex: 1,
  },
});
