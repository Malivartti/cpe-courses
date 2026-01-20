import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { spacing, useTheme } from '../theme';
import { Text } from './Text';

type SearchMode = 'standard' | 'recommendations';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  searchMode: SearchMode;
  onToggleMode: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export function SearchInput({
  value,
  onChangeText,
  onSubmit,
  placeholder = '...',
  searchMode,
  onToggleMode,
  disabled = false,
  isLoading = false,
}: SearchInputProps) {
  const colors = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const isRecommendations = searchMode === 'recommendations';

  return (
    <View style={styles.wrapper}>
      <View
        style={{
          ...styles.container,
          backgroundColor: colors.background.surface,
          borderColor: isFocused ? colors.primary.default : colors.border.default,
        }}
      >
        <Pressable
          style={{
            ...styles.modeButton,
            backgroundColor: colors.primary.default,
            borderRightWidth: 1,
            borderRightColor: colors.border.light,
          }}
          onPress={onToggleMode}
          disabled={disabled}
        >
          <FontAwesome
            name={isRecommendations ? 'magic' : 'search'}
            size={18}
            color={colors.text.inverse}
          />
        </Pressable>
        <TextInput
          style={{
            ...styles.input,
            color: colors.text.primary,
            outlineStyle: 'none' as any,
          }}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.text.tertiary}
          returnKeyType="search"
          onSubmitEditing={onSubmit}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={!disabled}
        />
        <Pressable
          style={{
            ...styles.submitButton,
            backgroundColor: colors.background.surfaceElevated,
            borderLeftWidth: 1,
            borderLeftColor: colors.border.light,
          }}
          onPress={onSubmit}
          disabled={disabled || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={colors.primary.default} />
          ) : (
            <FontAwesome name="arrow-right" size={16} color={colors.text.secondary} />
          )}
        </Pressable>
      </View>

      <View style={styles.hintContainer}>
        {isRecommendations && (
          <>
            <FontAwesome
              name="info-circle"
              size={12}
              color={colors.text.tertiary}
              style={styles.hintIcon}
            />
            <Text variant="caption" style={{ color: colors.text.tertiary }}>
              AI подберёт курсы на основе вашего описания
            </Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.xs,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    borderRadius: spacing.sm,
    borderWidth: 1,
    height: 50,
    overflow: 'hidden',
  },
  modeButton: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: spacing.md,
    minWidth: 0,
  },
  submitButton: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.xs,
  },
  hintIcon: {
    marginTop: 2,
  },
});
