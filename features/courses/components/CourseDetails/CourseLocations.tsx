import React from 'react';
import { View } from 'react-native';

import { CourseDetails } from '@/shared/types/course';
import { Card, Divider, Text } from '@/shared/ui';

interface CourseLocationsProps {
  course: CourseDetails;
}

export function CourseLocations({ course }: CourseLocationsProps) {
  if (!course.locations || course.locations.length === 0) return null;

  return (
    <Card>
      <Text variant="h3">Площадки</Text>
      {course.locations.map((location, index) => (
        <View key={location.id}>
          {index > 0 && <Divider />}
          <Text variant="body">{location.name}</Text>
        </View>
      ))}
    </Card>
  );
}
