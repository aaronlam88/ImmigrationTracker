/**
 * i18n Configuration
 * Internationalization setup for English and Chinese Simplified
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import zhCN from './locales/zh-CN.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANGUAGE_KEY = '@ImmigrationTracker:language';

// Get saved language preference or default to English
const getSavedLanguage = async (): Promise<string> => {
  try {
    const saved = await AsyncStorage.getItem(LANGUAGE_KEY);
    return saved || 'en';
  } catch {
    return 'en';
  }
};

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      'zh-CN': { translation: zhCN },
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    compatibilityJSON: 'v3', // For React Native compatibility
  });

// Load saved language preference
getSavedLanguage().then(lng => {
  if (lng !== i18n.language) {
    i18n.changeLanguage(lng);
  }
});

// Helper to save language preference
export const saveLanguagePreference = async (language: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, language);
    await i18n.changeLanguage(language);
  } catch (error) {
    console.error('Failed to save language preference:', error);
  }
};

export default i18n;

