import React from 'react';
import { StyleSheet, View } from 'react-native';

import {
  getCertificateTypeLabel,
  getCourseFormatLabel,
  getCourseStatusLabel,
  getEducationFormatLabel,
} from '@/shared/api/labels/courseLabels';
import { spacing, useTheme } from '@/shared/theme';
import { Course } from '@/shared/types/course';
import { Badge, Card, Text } from '@/shared/ui';

interface ReviewStepProps {
  data: Course;
}

export function ReviewStep({ data }: ReviewStepProps) {
  const colors = useTheme();

  const Row = ({ label, value }: { label: string; value: string | number | React.ReactNode }) => (
    <View style={styles.row}>
      <View style={styles.labelCell}>
        <Text variant="body" style={{ color: colors.text.secondary }}>
          {label}
        </Text>
      </View>
      <View style={styles.valueCell}>
        {typeof value === 'string' || typeof value === 'number' ? (
          <Text variant="body" style={styles.valueText}>
            {value}
          </Text>
        ) : (
          value
        )}
      </View>
    </View>
  );

  const Divider = () => <View style={[styles.divider, { backgroundColor: colors.border.light }]} />;

  return (
    <View style={styles.container}>
      <Card>
        <Text variant="h3" style={styles.title}>
          Проверьте данные курса
        </Text>

        {((data.categories && data.categories.length > 0) ||
          (data.tags && data.tags.length > 0)) && (
          <>
            <View style={styles.topSection}>
              {data.categories && data.categories.length > 0 && (
                <View style={styles.badgesBlock}>
                  <Text variant="label" style={styles.badgeLabel}>
                    Категории:
                  </Text>
                  <View style={styles.badges}>
                    {data.categories.map((cat) => (
                      <Badge key={cat.id} label={cat.name} variant="primary" />
                    ))}
                  </View>
                </View>
              )}

              {data.tags && data.tags.length > 0 && (
                <View style={styles.badgesBlock}>
                  <Text variant="label" style={styles.badgeLabel}>
                    Теги:
                  </Text>
                  <View style={styles.badges}>
                    {data.tags.map((tag) => (
                      <Badge key={tag} label={tag} variant="info" />
                    ))}
                  </View>
                </View>
              )}
            </View>
            <View style={[styles.sectionDivider, { backgroundColor: colors.border.default }]} />
          </>
        )}

        <View style={styles.table}>
          <Row label="Название" value={data.title} />
          <Divider />

          {data.description && (
            <>
              <Row label="Описание" value={data.description} />
              <Divider />
            </>
          )}

          <Row label="Длительность" value={`${data.duration} часов`} />
          <Divider />

          <Row label="Цена" value={`${data.price} ₽`} />
          <Divider />

          {data.discountedPrice && (
            <>
              <Row label="Цена со скидкой" value={`${data.discountedPrice} ₽`} />
              <Divider />
            </>
          )}

          <Row label="Формат" value={getCourseFormatLabel(data.format)} />
          <Divider />

          <Row label="Тип обучения" value={getEducationFormatLabel(data.educationType)} />
          <Divider />

          <Row label="Сертификат" value={getCertificateTypeLabel(data.certificateType)} />
          <Divider />

          <Row label="Статус" value={getCourseStatusLabel(data.status)} />
          <Divider />

          <Row label="Опубликован" value={data.isPublished ? 'Да' : 'Нет'} />
          <Divider />

          {data.startDate && (
            <>
              <Row label="Дата начала" value={data.startDate} />
              <Divider />
            </>
          )}

          {data.endDate && (
            <>
              <Row label="Дата окончания" value={data.endDate} />
              <Divider />
            </>
          )}

          {data.locations && data.locations.length > 0 && (
            <>
              <Row
                label="Локации"
                value={
                  <View style={styles.listValues}>
                    {data.locations.map((location, index) => (
                      <Text key={index} variant="body" style={styles.valueText}>
                        • {location}
                      </Text>
                    ))}
                  </View>
                }
              />
              <Divider />
            </>
          )}

          {data.acquired_skills && data.acquired_skills.length > 0 && (
            <>
              <Row
                label="Навыки"
                value={
                  <View style={styles.listValues}>
                    {data.acquired_skills.map((skill) => (
                      <Text key={skill.id} variant="body" style={styles.valueText}>
                        • {skill.name}
                      </Text>
                    ))}
                  </View>
                }
              />
              <Divider />
            </>
          )}

          {data.lecturers && data.lecturers.length > 0 && (
            <>
              <Row
                label="Преподаватели"
                value={
                  <View style={styles.lecturersContainer}>
                    {data.lecturers.map((lecturer) => (
                      <View key={lecturer.id} style={styles.lecturerItem}>
                        <View style={styles.lecturerInfo}>
                          <Text variant="body" style={styles.lecturerName}>
                            {lecturer.name}
                          </Text>
                          {lecturer.position && (
                            <Text variant="bodySmall" style={{ color: colors.text.secondary }}>
                              {lecturer.position}
                            </Text>
                          )}
                          {lecturer.competencies && lecturer.competencies.length > 0 && (
                            <Text variant="caption" style={{ color: colors.text.tertiary }}>
                              {lecturer.competencies.join(', ')}
                            </Text>
                          )}
                        </View>
                      </View>
                    ))}
                  </View>
                }
              />
            </>
          )}
        </View>

        {data.sections && data.sections.length > 0 && (
          <>
            <View style={[styles.sectionDivider, { backgroundColor: colors.border.default }]} />

            <View style={styles.sectionsBlock}>
              <Text variant="h4" style={styles.sectionsTitle}>
                Модули ({data.sections.length})
              </Text>
              {data.sections.map((section, index) => (
                <View
                  key={index}
                  style={[
                    styles.sectionItem,
                    {
                      backgroundColor: colors.background.surfaceElevated,
                      borderColor: colors.border.light,
                    },
                  ]}
                >
                  <View style={styles.sectionHeader}>
                    <Text variant="body" style={styles.sectionName}>
                      {index + 1}. {section.name}
                    </Text>
                    {section.hours && (
                      <Text variant="body" style={{ color: colors.text.tertiary }}>
                        {section.hours} ч
                      </Text>
                    )}
                  </View>
                  {section.description && (
                    <Text
                      variant="body"
                      style={{ color: colors.text.secondary, marginTop: spacing.xs }}
                    >
                      {section.description}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          </>
        )}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  title: {
    marginBottom: spacing.xl,
    fontSize: 22,
  },
  topSection: {
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  badgesBlock: {
    gap: spacing.sm,
  },
  badgeLabel: {
    fontWeight: '600',
    fontSize: 15,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  sectionDivider: {
    height: 2,
    marginVertical: spacing.xl,
  },
  table: {
    gap: 0,
  },
  row: {
    flexDirection: 'row',
    minHeight: 44,
    alignItems: 'flex-start',
  },
  labelCell: {
    width: '40%',
    paddingRight: spacing.md,
    paddingVertical: spacing.sm,
    justifyContent: 'center',
  },
  valueCell: {
    flex: 1,
    paddingVertical: spacing.sm,
    justifyContent: 'center',
  },
  valueText: {
    fontWeight: '600',
    fontSize: 15,
  },
  listValues: {
    gap: spacing.xs,
  },
  divider: {
    height: 1,
    width: '100%',
  },
  lecturersContainer: {
    gap: spacing.md,
  },
  lecturerItem: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  lecturerPhoto: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e5e7eb',
  },
  lecturerInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  lecturerName: {
    fontWeight: '700',
    fontSize: 15,
  },
  sectionsBlock: {
    gap: spacing.md,
  },
  sectionsTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  sectionItem: {
    padding: spacing.lg,
    borderRadius: spacing.md,
    borderWidth: 1,
    gap: spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionName: {
    fontWeight: '700',
    flex: 1,
    fontSize: 15,
  },
});
