import React from 'react';
import { View } from 'react-native';

import { Course } from '@/shared/types/course';
import { Card, Divider, Text } from '@/shared/ui';

interface CourseLocationsProps {
  course: Course;
}

export function CourseLocations({ course }: CourseLocationsProps) {
  if (!course.locations || course.locations.length === 0) {
    return null;
  }

  return (
    <Card>
      <Text variant="h3">Локации</Text>
      {course.locations.map((location, index) => (
        <View key={`${location}-${index}`}>
          {index > 0 && <Divider />}
          <Text variant="body">{location}</Text>
        </View>
      ))}
    </Card>
  );
}
