import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { spacing, useTheme } from '@/shared/theme';
import { Course } from '@/shared/types/course';
import { EnrollmentReadModel } from '@/shared/types/enrollment.api';
import { Badge, Card, Text } from '@/shared/ui';

interface EnrichedEnrollment {
  enrollment: EnrollmentReadModel;
  course: Course | null;
}

interface EnrollmentCardProps {
  enrichedEnrollment: EnrichedEnrollment;
}

export function EnrollmentCard({ enrichedEnrollment }: EnrollmentCardProps) {
  const colors = useTheme();
  const { enrollment, course } = enrichedEnrollment;

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const handlePress = () => {
    if (course) {
      router.push(`/courses/${course.id}`);
    }
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Badge label="Записан" variant="success" />
        <Text variant="caption" style={{ color: colors.text.tertiary }}>
          {formatDate(enrollment.created_at)}
        </Text>
      </View>

      <Pressable onPress={handlePress} disabled={!course}>
        <Text variant="h3" numberOfLines={2}>
          {course?.title || `Курс ${course?.title}`}
        </Text>
        {course?.description && (
          <Text
            variant="bodySmall"
            numberOfLines={2}
            style={{
              color: colors.text.secondary,
              marginTop: spacing.xs,
            }}
          >
            {course.description}
          </Text>
        )}
      </Pressable>

      <View style={{ ...styles.divider, backgroundColor: colors.border.light }} />

      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Text variant="bodySmall" style={{ color: colors.text.secondary }}>
            Ваше имя:
          </Text>
          <Text variant="bodySmall" style={styles.infoValue}>
            {enrollment.full_name}
          </Text>
        </View>
        {enrollment.phone && (
          <View style={styles.infoRow}>
            <Text variant="bodySmall" style={{ color: colors.text.secondary }}>
              Телефон:
            </Text>
            <Text variant="bodySmall" style={styles.infoValue}>
              {enrollment.phone}
            </Text>
          </View>
        )}
        {enrollment.message && (
          <View style={styles.messageBlock}>
            <Text variant="bodySmall" style={{ color: colors.text.secondary }}>
              Сообщение:
            </Text>
            <Text variant="bodySmall">{enrollment.message}</Text>
          </View>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    marginVertical: spacing.sm,
  },
  infoSection: {
    gap: spacing.xs,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoValue: {
    fontWeight: '600',
  },
  messageBlock: {
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
});
