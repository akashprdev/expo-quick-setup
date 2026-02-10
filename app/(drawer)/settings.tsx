import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
    const colorScheme = useColorScheme();
    const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = React.useState(colorScheme === 'dark');

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Settings</Text>
                <Text style={styles.headerSubtitle}>Manage your app preferences</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>General</Text>

                <View style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <Text style={styles.settingLabel}>Notifications</Text>
                        <Text style={styles.settingDescription}>Enable push notifications</Text>
                    </View>
                    <Switch
                        value={notificationsEnabled}
                        onValueChange={setNotificationsEnabled}
                        trackColor={{ false: '#d1d5db', true: '#a5b4fc' }}
                        thumbColor={notificationsEnabled ? '#6366f1' : '#f3f4f6'}
                    />
                </View>

                <View style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <Text style={styles.settingLabel}>Dark Mode</Text>
                        <Text style={styles.settingDescription}>Use dark theme</Text>
                    </View>
                    <Switch
                        value={darkModeEnabled}
                        onValueChange={setDarkModeEnabled}
                        trackColor={{ false: '#d1d5db', true: '#a5b4fc' }}
                        thumbColor={darkModeEnabled ? '#6366f1' : '#f3f4f6'}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Account</Text>

                <TouchableOpacity style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <Text style={styles.settingLabel}>Change Password</Text>
                        <Text style={styles.settingDescription}>Update your password</Text>
                    </View>
                    <Text style={styles.arrow}>›</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <Text style={styles.settingLabel}>Privacy Settings</Text>
                        <Text style={styles.settingDescription}>Manage your privacy</Text>
                    </View>
                    <Text style={styles.arrow}>›</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>About</Text>

                <View style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <Text style={styles.settingLabel}>Version</Text>
                        <Text style={styles.settingDescription}>1.0.0</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <Text style={styles.settingLabel}>Terms of Service</Text>
                    </View>
                    <Text style={styles.arrow}>›</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <Text style={styles.settingLabel}>Privacy Policy</Text>
                    </View>
                    <Text style={styles.arrow}>›</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    header: {
        backgroundColor: '#6366f1',
        padding: 24,
        paddingTop: 60,
        paddingBottom: 30,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    section: {
        marginTop: 20,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        marginHorizontal: 16,
        padding: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6b7280',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 8,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    settingInfo: {
        flex: 1,
    },
    settingLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 2,
    },
    settingDescription: {
        fontSize: 14,
        color: '#6b7280',
    },
    arrow: {
        fontSize: 24,
        color: '#9ca3af',
        marginLeft: 8,
    },
});
