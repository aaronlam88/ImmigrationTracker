/**
 * Smart Profile Form Component
 * Dynamically shows/hides fields based on immigration status
 */

import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, HelperText, Switch, Text, Chip } from 'react-native-paper';
import { ImmigrationStatus, getStatusLabel } from '../../models/ImmigrationStatus';
import {
  getFormConfig,
  getVisibleFields,
  isFieldRequired,
  FIELD_METADATA,
  FieldMetadata,
} from '../../services/ProfileFormService';
import { Spacing, FontSizes, Colors } from '../../theme';
import { DateField } from './DateField';
import { useTranslation } from '../../i18n';

export interface SmartProfileFormProps {
  /** Current immigration status */
  status: ImmigrationStatus;
  /** Form values */
  values: Record<string, any>;
  /** Callback when values change */
  onChange: (field: string, value: any) => void;
  /** Validation errors */
  errors?: Record<string, string>;
}

/**
 * Smart form that adapts to immigration status
 */
export function SmartProfileForm({ status, values, onChange, errors = {} }: SmartProfileFormProps) {
  const { t } = useTranslation();
  const config = getFormConfig(status);
  const visibleFields = getVisibleFields(status);

  // Helper to get translated field metadata
  const getTranslatedMetadata = (fieldName: string): FieldMetadata & { label: string; placeholder?: string; helpText?: string } => {
    const metadata = FIELD_METADATA[fieldName];
    if (!metadata) return metadata as any;
    
    const translationKey = `formFields.${fieldName}`;
    return {
      ...metadata,
      label: t(`${translationKey}`, { defaultValue: metadata.label }),
      placeholder: metadata.placeholder ? t(`${translationKey}Placeholder`, { defaultValue: metadata.placeholder }) : undefined,
      helpText: metadata.helpText ? t(`${translationKey}Help`, { defaultValue: metadata.helpText }) : undefined,
    };
  };

  // Helper to get status help text translation key
  // Converts F1_STUDENT -> f1Student, OPT_PENDING -> optPending, etc.
  const getStatusHelpText = (status: ImmigrationStatus): string => {
    const parts = status.toLowerCase().split('_');
    const camelCase = parts.map((part, index) => 
      index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
    ).join('');
    const translationKey = `formFields.${camelCase}Help`;
    return t(translationKey, { defaultValue: config.helpText });
  };

  const renderField = (fieldName: string) => {
    const metadata = getTranslatedMetadata(fieldName);
    if (!metadata) return null;

    const required = isFieldRequired(fieldName, status);
    const error = errors[fieldName];
    const value = values[fieldName];

    switch (metadata.fieldType) {
      case 'date':
        return (
          <DateField
            key={fieldName}
            label={metadata.label}
            placeholder={metadata.placeholder}
            value={value}
            onChange={(dateValue) => onChange(fieldName, dateValue)}
            required={required}
            helpText={metadata.helpText}
            error={error}
          />
        );

      case 'boolean':
        return (
          <View key={fieldName} style={styles.fieldContainer}>
            <View style={styles.switchRow}>
              <View style={styles.switchLabel}>
                <Text style={styles.switchLabelText}>
                  {metadata.label}{required && ' *'}
                </Text>
                {metadata.helpText && (
                  <Text style={styles.switchHelpText}>{metadata.helpText}</Text>
                )}
              </View>
              <Switch
                value={value || false}
                onValueChange={(checked) => onChange(fieldName, checked)}
              />
            </View>
            {error && (
              <HelperText type="error">{error}</HelperText>
            )}
          </View>
        );

      case 'text':
        return (
          <View key={fieldName} style={styles.fieldContainer}>
            <TextInput
              label={`${metadata.label}${required ? ' *' : ''}`}
              placeholder={metadata.placeholder}
              value={value || ''}
              onChangeText={(text) => onChange(fieldName, text)}
              mode="outlined"
              error={!!error}
              style={styles.input}
            />
            {metadata.helpText && !error && (
              <HelperText type="info">{metadata.helpText}</HelperText>
            )}
            {error && (
              <HelperText type="error">{error}</HelperText>
            )}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Status Info Banner */}
      <View style={styles.infoBanner}>
        <Text style={styles.infoBannerTitle}>
          {t('profile.status')}: {getStatusLabel(status)}
        </Text>
        <Text style={styles.infoBannerText}>
          {getStatusHelpText(status)}
        </Text>
      </View>

      {/* Dynamic Form Fields */}
      <View style={styles.fieldsContainer}>
        {visibleFields.map(fieldName => renderField(fieldName))}
      </View>

      {/* Required Fields Note */}
      {config.required.length > 0 && (
        <Text style={styles.requiredNote}>* {t('formFields.requiredFields', { defaultValue: 'Required fields' })}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoBanner: {
    backgroundColor: '#E8DEF8',
    padding: Spacing.md,
    borderRadius: 8,
    marginBottom: Spacing.lg,
  },
  infoBannerTitle: {
    fontSize: FontSizes.base,
    fontWeight: 'bold',
    color: '#6750A4',
    marginBottom: Spacing.xs,
  },
  infoBannerText: {
    fontSize: FontSizes.sm,
    color: '#4A4458',
  },
  fieldsContainer: {
    gap: Spacing.sm,
  },
  fieldContainer: {
    marginBottom: Spacing.sm,
  },
  input: {
    backgroundColor: Colors.surface,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xs,
    backgroundColor: Colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  switchLabel: {
    flex: 1,
    marginRight: Spacing.md,
  },
  switchLabelText: {
    fontSize: FontSizes.base,
    fontWeight: '500',
    marginBottom: Spacing.xs,
  },
  switchHelpText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  requiredNote: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    marginTop: Spacing.md,
    textAlign: 'center',
  },
});

