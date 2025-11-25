/**
 * DateField Component
 * Renders a read-only text input that opens a native date picker modal
 */

import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, HelperText, Portal, Modal, Button } from 'react-native-paper';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { createStyles, Spacing } from '../../theme';

export interface DateFieldProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  error?: string;
}

const DISPLAY_FORMAT = 'MMM d, yyyy';

export function DateField({
  label,
  value,
  onChange,
  required,
  placeholder,
  helpText,
  error,
}: DateFieldProps) {
  const [pickerVisible, setPickerVisible] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(value ? new Date(value) : new Date());

  const openPicker = () => {
    setTempDate(value ? new Date(value) : new Date());
    setPickerVisible(true);
  };

  const handleConfirm = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setTempDate(selectedDate);
    }
  };

  const handleSaveDate = () => {
    onChange(tempDate.toISOString());
    setPickerVisible(false);
  };

  return (
    <View style={styles.fieldContainer}>
      <TextInput
        label={`${label}${required ? ' *' : ''}`}
        value={value ? format(new Date(value), DISPLAY_FORMAT) : ''}
        placeholder={placeholder}
        mode="outlined"
        editable={false}
        right={<TextInput.Icon icon="calendar" onPress={openPicker} />}
        error={!!error}
        style={styles.input}
        onPressIn={openPicker}
      />
      {helpText && !error && <HelperText type="info">{helpText}</HelperText>}
      {error && <HelperText type="error">{error}</HelperText>}

      <Portal>
        <Modal visible={pickerVisible} onDismiss={() => setPickerVisible(false)} contentContainerStyle={styles.modal}>
          <DateTimePicker
            mode="date"
            display="spinner"
            value={tempDate}
            onChange={handleConfirm}
            maximumDate={new Date(2100, 11, 31)}
            minimumDate={new Date(2000, 0, 1)}
            themeVariant="light"
          />
          <View style={styles.modalActions}>
            <Button onPress={() => setPickerVisible(false)}>Cancel</Button>
            <Button mode="contained" onPress={handleSaveDate}>
              Save
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = createStyles({
  fieldContainer: {
    marginBottom: Spacing.sm,
  },
  input: {
    backgroundColor: '#fff',
  },
  modal: {
    backgroundColor: '#fff',
    padding: Spacing.md,
    borderRadius: 16,
    marginHorizontal: Spacing.md,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: Spacing.sm,
    gap: Spacing.sm,
  },
});


