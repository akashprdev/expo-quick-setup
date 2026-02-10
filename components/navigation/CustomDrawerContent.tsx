import { useAuth } from '@/contexts/AuthContext';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function CustomDrawerContent(props: DrawerContentComponentProps) {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.replace('/login');
    };

    return (
        <DrawerContentScrollView {...props} style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </Text>
                </View>
                <Text style={styles.userName}>{user?.name || 'User'}</Text>
                <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
            </View>

            <View style={styles.menuItems}>
                <DrawerItemList {...props} />
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>🚪 Logout</Text>
                </TouchableOpacity>

                <Text style={styles.version}>Version 1.0.0</Text>
            </View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        ...Platform.select({
            ios: {
                backdropFilter: 'blur(20px)',
            },
            android: {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
            },
        }),
    },
    header: {
        padding: 20,
        paddingTop: 60,
        backgroundColor: 'rgba(99, 102, 241, 0.85)',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.2)',
        shadowColor: '#6366f1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.4)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    avatarText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    menuItems: {
        flex: 1,
        paddingTop: 10,
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: 'rgba(229, 231, 235, 0.5)',
        backgroundColor: 'rgba(249, 250, 251, 0.6)',
    },
    logoutButton: {
        backgroundColor: 'rgba(254, 226, 226, 0.8)',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: 'rgba(220, 38, 38, 0.2)',
        shadowColor: '#dc2626',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
    },
    logoutText: {
        color: '#dc2626',
        fontSize: 16,
        fontWeight: '600',
    },
    version: {
        textAlign: 'center',
        color: '#9ca3af',
        fontSize: 12,
    },
});
