# 📱 Cipta Ruang - Employee Mood Management

Aplikasi manajemen mood karyawan berbasis React Native untuk membantu HR dan Manager memantau kesejahteraan mental tim melalui mood tracking, AI insights, dan Copenhagen Burnout Inventory (CBI) test.

## ✨ Fitur Utama

- 🎯 **Mood Tracking**: Karyawan dapat mencatat mood harian
- 🤖 **AI Insights**: Evaluasi otomatis dengan Gemini AI untuk manager
- 📊 **Dashboard Analytics**: Visualisasi mood distribution tim
- 🔥 **CBI Test**: Tes burnout Copenhagen untuk evaluasi mental health
- 👥 **Multi-role**: Support untuk Manager dan Karyawan
- 📱 **Real-time**: Update mood dan evaluasi secara real-time

## 🚀 Quick Start

### 📋 Dokumentasi Instalasi

- **[📖 Panduan Instalasi Lengkap](INSTALASI.md)** - Dokumentasi lengkap untuk semua platform
- **[🪟 Setup Khusus Windows](SETUP-WINDOWS.md)** - Panduan detail untuk Windows

### ⚡ Quick Installation

```bash
# Clone repository
git clone https://github.com/gitaufar/cipta-ruang.git
cd cipta-ruang

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env dengan konfigurasi Anda

# Verifikasi environment
npx react-native doctor

# Run aplikasi
npx react-native start
npx react-native run-android
```

## 🛠️ Tech Stack

- **React Native** 0.81.x
- **TypeScript** - Type safety
- **Supabase** - Backend & Database
- **Gemini AI** - AI-powered insights
- **React Navigation** - Navigation system
- **NativeWind** - Tailwind CSS for React Native
- **Lucide React Native** - Icon system

## 📱 Screenshots

[Coming Soon - Tambahkan screenshot aplikasi]

## 🔧 Development

### Prerequisites

- Node.js 18.x+
- React Native CLI
- Android Studio (untuk Android)
- Xcode (untuk iOS - macOS only)

### Environment Setup

Buat file `.env` di root project:

```env
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
GEMINI_API_KEY=your-gemini-api-key
```

```

### Development Commands

```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios

# Build debug APK
cd android && ./gradlew assembleDebug

# Build release APK
cd android && ./gradlew assembleRelease

# Clean build
cd android && ./gradlew clean

# Reset Metro cache
npm start -- --reset-cache
```

## 🏗️ Project Structure

```
src/
├── core/                 # Core utilities & constants
├── data/                 # Data layer (repositories, datasources)
├── domain/               # Business logic (entities, usecases)
└── presentation/         # UI layer (screens, components, contexts)
    ├── components/       # Reusable UI components
    ├── contexts/         # React contexts
    ├── navigation/       # Navigation setup
    └── screens/          # Screen components
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 📦 Build & Deploy

### Debug Build
```bash
npx react-native build-android
# APK: android/app/build/outputs/apk/debug/app-debug.apk
```

### Production Build
```bash
# Generate signing key (first time only)
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore cipta-ruang-key.keystore -alias cipta-ruang -keyalg RSA -keysize 2048 -validity 10000

# Build release APK
cd android && ./gradlew assembleRelease
# APK: android/app/build/outputs/apk/release/app-release.apk

# Build AAB for Play Store
cd android && ./gradlew bundleRelease
# AAB: android/app/build/outputs/bundle/release/app-release.aab
```

## 🐛 Troubleshooting

### Common Issues

```bash
# Metro bundler issues
npm start -- --reset-cache
rm -rf node_modules && npm install

# Android build issues
cd android && ./gradlew clean && ./gradlew assembleDebug

# Environment issues
npx react-native doctor
```

Untuk troubleshooting lebih detail, lihat [Panduan Instalasi](INSTALASI.md).

## 📄 API Documentation

### Mood Tracking
- `POST /mood-responses` - Submit mood data
- `GET /mood-responses` - Get mood history

### CBI Test
- `POST /cbi-tests` - Submit CBI test results
- `GET /cbi-tests/:userId` - Get user CBI results

### AI Evaluations
- `POST /evaluations` - Generate AI evaluation
- `GET /evaluations/:employeeId` - Get employee evaluations

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Support

- 📧 Email: zhafiraufar123@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/gitaufar/cipta-ruang/issues)
- 📖 Wiki: [GitHub Wiki](https://github.com/gitaufar/cipta-ruang/wiki)

## 📄 License

MIT License - lihat file [LICENSE](LICENSE) untuk detail lengkap.

---

**Dibuat dengan ❤️ untuk membantu HR dan Manager mengelola kesejahteraan mental karyawan**

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
