import React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { shadows, spacing, useTheme } from '@/shared/theme';

import { Button } from './Button';
import { Text } from './Text';

interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  style?: 'success' | 'danger';
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  visible,
  title,
  message,
  confirmText = 'Подтвердить',
  cancelText = 'Отмена',
  style = 'danger',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const colors = useTheme();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <Pressable style={styles.overlay} onPress={onCancel}>
        <Pressable
          style={[styles.dialog, { backgroundColor: colors.background.surface }]}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.content}>
            <Text variant="h3" style={styles.title}>
              {title}
            </Text>
            {message && (
              <Text variant="body" style={{ color: colors.text.secondary }}>
                {message}
              </Text>
            )}
          </View>

          <View style={styles.buttons}>
            <Button
              title={cancelText}
              variant="secondary"
              onPress={onCancel}
              style={styles.button}
            />
            <Button
              title={confirmText}
              variant={style === 'danger' ? 'error' : 'primary'}
              onPress={onConfirm}
              style={styles.button}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  dialog: {
    width: '100%',
    maxWidth: 400,
    borderRadius: spacing.md,
    padding: spacing.xl,
    ...shadows.xl,
  },
  content: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  title: {
    marginBottom: spacing.sm,
  },
  buttons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  button: {
    flex: 1,
  },
});
