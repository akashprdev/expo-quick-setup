# Aumbram App Navigation Flow

## Overview
This app implements a complete authentication flow with splash screens, login, drawer navigation, and bottom tabs.

## Navigation Structure

### 1. **Splash Screens** (First Time Launch)
- **First Splash** (`/splash-first`) - Shows for 2.5 seconds with animated logo
- **Second Splash** (`/splash-second`) - Shows for 2 seconds, checks auth status

### 2. **Authentication**
- **Login Screen** (`/login`) - Email/password authentication
- Uses `AuthContext` to manage authentication state
- Credentials are persisted using AsyncStorage

### 3. **Main App** (After Login)
- **Drawer Navigation** (`/(drawer)`) - Side menu with:
  - **Home** - Contains bottom tabs
  - **Settings** - App settings and preferences
  - **Profile** - User profile and account info
  
- **Bottom Tabs** (Inside Drawer) - Main navigation with:
  - **Home tab** (`/index`)
  - **Explore tab** (`/explore`)

## Flow Diagram

```
App Launch
    ↓
First Splash (2.5s)
    ↓
Second Splash (2s)
    ↓
Check Auth Status
    ├─ Not Logged In → Login Screen
    │                      ↓
    │                  (After Login)
    │                      ↓
    └─ Logged In ────→ Drawer Navigation
                            ├─ Home (Bottom Tabs)
                            │   ├─ Home Tab
                            │   └─ Explore Tab
                            ├─ Settings
                            └─ Profile
```

## Key Files

### Core Navigation
- `app/_layout.tsx` - Root layout with AuthProvider
- `app/(drawer)/_layout.tsx` - Drawer navigation layout
- `app/(drawer)/(tabs)/_layout.tsx` - Bottom tabs navigation

### Screens
- `app/splash-first.tsx` - First splash screen
- `app/splash-second.tsx` - Second splash screen with auth check
- `app/login.tsx` - Login screen
- `app/(drawer)/(tabs)/index.tsx` - Home tab
- `app/(drawer)/(tabs)/explore.tsx` - Explore tab
- `app/(drawer)/settings.tsx` - Settings screen
- `app/(drawer)/profile.tsx` - Profile screen

### Context & Components
- `contexts/AuthContext.tsx` - Authentication state management
- `components/navigation/CustomDrawerContent.tsx` - Custom drawer menu

## Using the Drawer

### Opening the Drawer
Users can open the drawer by:
1. **Swiping from the left edge** of the screen
2. **Tapping the menu icon** in the header (if you add one)

### Drawer Menu Items
- **Home** - Navigate to bottom tabs (Home/Explore)
- **Settings** - App preferences and configuration
- **Profile** - User profile and account management
- **Logout** - Sign out (at the bottom of drawer)

## Testing the Flow

1. **First Launch**: You'll see both splash screens, then the login page
2. **Login**: Enter any email/password (currently mock authentication)
3. **Main App**: After login, you'll see the bottom tabs
4. **Drawer**: Swipe from left to open the side menu
5. **Subsequent Launches**: If you close and reopen the app, you'll skip login and go straight to the main app

## Customization

### Change Splash Duration
Edit the `setTimeout` values in:
- `app/splash-first.tsx` (currently 2500ms)
- `app/splash-second.tsx` (currently 2000ms)

### Add Real Authentication
Replace the mock login in `app/login.tsx` with your actual API call:

```typescript
const handleLogin = async () => {
  // Replace this with your actual API call
  const response = await fetch('your-api-endpoint', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  const userData = await response.json();
  await login(userData);
  router.replace('/(drawer)');
};
```

### Add More Tabs
Edit `app/(drawer)/(tabs)/_layout.tsx` and add more `<Tabs.Screen>` components.

### Add More Drawer Items
Edit `app/(drawer)/_layout.tsx` and add more `<Drawer.Screen>` components, then create corresponding screen files.

### Customize Drawer Content
Edit `components/navigation/CustomDrawerContent.tsx` to:
- Change user avatar style
- Add custom menu items
- Modify logout button
- Add app version or other info

## Navigation Hierarchy

```
Root Stack
└─ AuthProvider
   ├─ Splash First
   ├─ Splash Second
   ├─ Login
   └─ Drawer
      ├─ Home (Bottom Tabs)
      │  ├─ Home Tab
      │  └─ Explore Tab
      ├─ Settings
      └─ Profile
```

## Features

### Drawer Features
- ✅ Custom drawer content with user profile
- ✅ Logout functionality
- ✅ Settings screen with toggles
- ✅ Profile screen with user info
- ✅ Swipe gesture to open/close
- ✅ Beautiful UI with modern design

### Bottom Tabs Features
- ✅ Home and Explore tabs
- ✅ Haptic feedback on tab press
- ✅ Icon-based navigation
- ✅ Nested inside drawer

### Authentication Features
- ✅ Persistent login state
- ✅ Automatic auth check on app launch
- ✅ Smooth navigation flow
- ✅ Logout from drawer menu

## Adding a Header with Menu Button

To add a menu button to open the drawer, update your tab screens:

```typescript
// In app/(drawer)/(tabs)/_layout.tsx
import { DrawerToggleButton } from '@react-navigation/drawer';

<Tabs.Screen
  name="index"
  options={{
    title: 'Home',
    headerLeft: () => <DrawerToggleButton />,
    tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
  }}
/>
```

This will add a hamburger menu icon to the header that opens the drawer when tapped.
