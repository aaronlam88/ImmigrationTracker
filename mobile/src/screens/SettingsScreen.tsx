/**
 * Settings Screen
 * App settings: language, notifications, data management
 */

import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, Switch } from 'react-native';
import { Card, List, Divider, Button, Text } from 'react-native-paper';
import { useTranslation } from '../i18n';
import { saveLanguagePreference } from '../i18n/config';
import { useUserProfile } from '../hooks/useUserProfile';
import { LoadingView, ErrorView } from '../components/common';
import { UserProfileStorage } from '../storage/UserProfileStorage';
import { ContainerStyles, CardStyles, TextStyles, Spacing, Colors, lightTheme, createStyles } from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTIFICATIONS_KEY = '@ImmigrationTracker:notificationsEnabled';

export default function SettingsScreen() {
  const { t } = useTranslation();
  const { profile, loading, error, refresh } = useUserProfile();
  
  const [language, setLanguage] = useState<string>('en');
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      // Load language preference
      const savedLanguage = await AsyncStorage.getItem('@ImmigrationTracker:language');
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }

      // Load notification preference
      const savedNotifications = await AsyncStorage.getItem(NOTIFICATIONS_KEY);
      if (savedNotifications !== null) {
        setNotificationsEnabled(savedNotifications === 'true');
      }
    } catch (err) {
      console.error('Error loading settings:', err);
    }
  };

  const handleLanguageChange = async (newLanguage: string) => {
    try {
      setLanguage(newLanguage);
      await saveLanguagePreference(newLanguage);
    } catch (err) {
      console.error('Error saving language:', err);
      Alert.alert(t('common.error'), t('settings.failedToSaveLanguage'));
    }
  };

  const handleNotificationsToggle = async (value: boolean) => {
    try {
      setNotificationsEnabled(value);
      await AsyncStorage.setItem(NOTIFICATIONS_KEY, value.toString());
      // TODO: Request notification permissions if enabling
    } catch (err) {
      console.error('Error saving notification preference:', err);
      Alert.alert(t('common.error'), t('settings.failedToSaveNotifications'));
    }
  };

  const handleClearData = () => {
    Alert.alert(
      t('settings.clearAllData'),
      t('settings.clearAllDataConfirm'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.delete'),
          style: 'destructive',
          onPress: async () => {
            try {
              await UserProfileStorage.delete();
              await refresh();
              Alert.alert(t('common.ok'), t('settings.dataCleared'));
            } catch (err) {
              Alert.alert(t('common.error'), t('settings.failedToClear'));
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return <LoadingView message={t('common.loading')} />;
  }

  if (error) {
    return <ErrorView message={error} onRetry={refresh} />;
  }

  return (
    <View style={ContainerStyles.screen}>
      <ScrollView style={styles.scrollView}>
        {/* App Settings */}
        <Card style={CardStyles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={TextStyles.sectionTitle}>
              {t('settings.appSettings')}
            </Text>

            {/* Language Selection */}
            <List.Section>
              <List.Subheader>{t('settings.language')}</List.Subheader>
              <List.Item
                title={t('languages.en')}
                description={t('settings.languageDescription')}
                left={props => <List.Icon {...props} icon="translate" />}
                right={() => (
                  <View style={styles.radioContainer}>
                    <View style={[styles.radio, language === 'en' && styles.radioSelected]} />
                  </View>
                )}
                onPress={() => handleLanguageChange('en')}
              />
              <List.Item
                title={t('languages.zhCN')}
                description={t('settings.languageDescription')}
                left={props => <List.Icon {...props} icon="translate" />}
                right={() => (
                  <View style={styles.radioContainer}>
                    <View style={[styles.radio, language === 'zh-CN' && styles.radioSelected]} />
                  </View>
                )}
                onPress={() => handleLanguageChange('zh-CN')}
              />
            </List.Section>

            <Divider style={styles.divider} />

            {/* Notifications */}
            <List.Section>
              <List.Subheader>{t('settings.notifications')}</List.Subheader>
              <List.Item
                title={t('settings.enableNotifications')}
                description={t('settings.enableNotificationsDescription')}
                left={props => <List.Icon {...props} icon="bell" />}
                right={() => (
                  <Switch
                    value={notificationsEnabled}
                    onValueChange={handleNotificationsToggle}
                  />
                )}
              />
            </List.Section>
          </Card.Content>
        </Card>

        {/* Data Management */}
        {profile && (
          <Card style={CardStyles.card}>
            <Card.Content>
              <Text variant="titleLarge" style={TextStyles.sectionTitle}>
                {t('settings.dataManagement')}
              </Text>
              <Button
                mode="outlined"
                onPress={handleClearData}
                icon="delete"
                style={styles.dangerButton}
                textColor={Colors.error}
              >
                {t('settings.clearAllData')}
              </Button>
            </Card.Content>
          </Card>
        )}
      </ScrollView>
    </View>
  );
}

const styles = createStyles({
  scrollView: {
    flex: 1,
  },
  divider: {
    marginVertical: Spacing.md,
  },
  dangerButton: {
    marginTop: Spacing.sm,
    borderColor: Colors.error,
  },
  radioContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  radioSelected: {
    borderColor: lightTheme.colors.primary,
    backgroundColor: lightTheme.colors.primary,
  },
});
