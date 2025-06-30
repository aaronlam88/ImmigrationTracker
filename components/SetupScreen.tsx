import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Alert
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useImmigrationStore } from '../store/immigrationStore';
import { useAuthStore } from '../store/authStore';
import { PersonalInfo, EducationInfo } from '../types/immigration';

const setupSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  countryOfBirth: z.string().min(1, 'Country of birth is required'),
  passportNumber: z.string().min(1, 'Passport number is required'),
  passportExpiration: z.string().min(1, 'Passport expiration is required'),
  currentAddress: z.string().min(1, 'Current address is required'),
  // Education
  institution: z.string().min(1, 'Institution is required'),
  degree: z.string().min(1, 'Degree is required'),
  major: z.string().min(1, 'Major is required'),
  graduationDate: z.string().min(1, 'Graduation date is required'),
  isSTEMDegree: z.boolean()
});

type SetupFormData = z.infer<typeof setupSchema>;

interface SetupScreenProps {
  onComplete: () => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onComplete }) => {
  const { user } = useAuthStore();
  const { initializeCase } = useImmigrationStore();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<SetupFormData>({
    resolver: zodResolver(setupSchema),
    defaultValues: {
      firstName: user?.displayName?.split(' ')[0] || '',
      lastName: user?.displayName?.split(' ')[1] || '',
      email: user?.email || '',
      isSTEMDegree: false
    }
  });

  const onSubmit = async (data: SetupFormData) => {
    setLoading(true);
    try {
      const personalInfo: PersonalInfo = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        countryOfBirth: data.countryOfBirth,
        passportNumber: data.passportNumber,
        passportExpiration: new Date(data.passportExpiration),
        currentAddress: data.currentAddress
      };

      initializeCase(personalInfo);

      // Add education info (this would be handled by the store)
      // For now, we'll handle it in the submit

      Alert.alert(
        'Setup Complete!',
        'Your immigration case has been initialized. You can now start tracking your journey.',
        [{ text: 'Get Started', onPress: onComplete }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to setup your case. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Set Up Your Immigration Case</Text>
          <Text style={styles.subtitle}>
            Let's gather some basic information to get you started
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>First Name</Text>
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[styles.input, errors.firstName && styles.inputError]}
                    value={value}
                    onChangeText={onChange}
                    placeholder="First name"
                  />
                )}
              />
              {errors.firstName && <Text style={styles.errorText}>{errors.firstName.message}</Text>}
            </View>

            <View style={styles.halfInput}>
              <Text style={styles.label}>Last Name</Text>
              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[styles.input, errors.lastName && styles.inputError]}
                    value={value}
                    onChangeText={onChange}
                    placeholder="Last name"
                  />
                )}
              />
              {errors.lastName && <Text style={styles.errorText}>{errors.lastName.message}</Text>}
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, errors.email && styles.inputError]}
                  value={value}
                  onChangeText={onChange}
                  placeholder="Email address"
                  keyboardType="email-address"
                />
              )}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, errors.phone && styles.inputError]}
                  value={value}
                  onChangeText={onChange}
                  placeholder="Phone number"
                  keyboardType="phone-pad"
                />
              )}
            />
            {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Country of Birth</Text>
            <Controller
              control={control}
              name="countryOfBirth"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, errors.countryOfBirth && styles.inputError]}
                  value={value}
                  onChangeText={onChange}
                  placeholder="Country of birth"
                />
              )}
            />
            {errors.countryOfBirth && <Text style={styles.errorText}>{errors.countryOfBirth.message}</Text>}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Education</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Institution</Text>
            <Controller
              control={control}
              name="institution"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, errors.institution && styles.inputError]}
                  value={value}
                  onChangeText={onChange}
                  placeholder="University or college name"
                />
              )}
            />
            {errors.institution && <Text style={styles.errorText}>{errors.institution.message}</Text>}
          </View>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Degree</Text>
              <Controller
                control={control}
                name="degree"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[styles.input, errors.degree && styles.inputError]}
                    value={value}
                    onChangeText={onChange}
                    placeholder="Bachelor's, Master's, PhD"
                  />
                )}
              />
              {errors.degree && <Text style={styles.errorText}>{errors.degree.message}</Text>}
            </View>

            <View style={styles.halfInput}>
              <Text style={styles.label}>Major</Text>
              <Controller
                control={control}
                name="major"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[styles.input, errors.major && styles.inputError]}
                    value={value}
                    onChangeText={onChange}
                    placeholder="Computer Science, etc."
                  />
                )}
              />
              {errors.major && <Text style={styles.errorText}>{errors.major.message}</Text>}
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Expected Graduation Date</Text>
            <Controller
              control={control}
              name="graduationDate"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, errors.graduationDate && styles.inputError]}
                  value={value}
                  onChangeText={onChange}
                  placeholder="YYYY-MM-DD"
                />
              )}
            />
            {errors.graduationDate && <Text style={styles.errorText}>{errors.graduationDate.message}</Text>}
          </View>

          <View style={styles.checkboxContainer}>
            <Controller
              control={control}
              name="isSTEMDegree"
              render={({ field: { onChange, value } }) => (
                <TouchableOpacity 
                  style={styles.checkbox}
                  onPress={() => onChange(!value)}
                >
                  <View style={[styles.checkboxBox, value && styles.checkboxChecked]}>
                    {value && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.checkboxLabel}>
                    My degree is STEM-eligible (Science, Technology, Engineering, Mathematics)
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.submitButton, loading && styles.disabledButton]}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Setting up...' : 'Complete Setup'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    marginBottom: 20,
  },
  halfInput: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  inputError: {
    borderColor: '#F44336',
  },
  errorText: {
    color: '#F44336',
    fontSize: 12,
    marginTop: 4,
  },
  checkboxContainer: {
    marginTop: 10,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  submitButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SetupScreen; 