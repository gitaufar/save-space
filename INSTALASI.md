# 📱 Panduan Instalasi Cipta Ruang

Aplikasi manajemen mood karyawan berbasis React Native untuk membantu HR dan Manager memantau kesejahteraan tim.

## 📋 Daftar Isi

- [Persyaratan Sistem](#persyaratan-sistem)
- [Instalasi Environment](#instalasi-environment)
- [Clone dan Setup Project](#clone-dan-setup-project)
- [Konfigurasi Database](#konfigurasi-database)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Build untuk Production](#build-untuk-production)
- [Troubleshooting](#troubleshooting)

## 🔧 Persyaratan Sistem

### Software yang Diperlukan

| Software | Version | Platform |
|----------|---------|----------|
| **Node.js** | 18.x atau lebih tinggi | Windows, macOS, Linux |
| **npm/yarn** | Latest | Windows, macOS, Linux |
| **React Native CLI** | Latest | Windows, macOS, Linux |
| **Android Studio** | Latest | Windows, macOS, Linux |
| **JDK** | 11 atau 17 | Windows, macOS, Linux |
| **Xcode** | Latest | macOS only |

### Hardware Minimum

- **RAM**: 8GB (16GB recommended)
- **Storage**: 10GB free space
- **Processor**: Intel/AMD x64 atau Apple Silicon

## 🚀 Instalasi Environment

### 1. Install Node.js

```bash
# Download dari https://nodejs.org/
# Atau gunakan package manager:

# Windows (Chocolatey)
choco install nodejs

# macOS (Homebrew)
brew install node

# Verifikasi instalasi
node --version
npm --version
```

### 2. Install React Native CLI

```bash
npm install -g react-native-cli
# atau
npm install -g @react-native-community/cli
```

### 3. Setup Android Development Environment

#### Install Android Studio
1. Download [Android Studio](https://developer.android.com/studio)
2. Install dengan default settings
3. Buka Android Studio → Configure → SDK Manager
4. Install:
   - Android SDK Platform 33 (API Level 33)
   - Android SDK Build-Tools
   - Android Emulator
   - Android SDK Platform-Tools

#### Setup Environment Variables

**Windows:**
```batch
# Tambahkan ke System Environment Variables
ANDROID_HOME=C:\Users\[USERNAME]\AppData\Local\Android\Sdk
JAVA_HOME=C:\Program Files\Java\jdk-11.0.x

# Tambahkan ke PATH
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\tools
%ANDROID_HOME%\tools\bin
%JAVA_HOME%\bin
```

**macOS/Linux:**
```bash
# Tambahkan ke ~/.bashrc atau ~/.zshrc
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
```

### 4. Install Java Development Kit (JDK)

```bash
# Windows (Chocolatey)
choco install openjdk11

# macOS (Homebrew)
brew install openjdk@11

# Ubuntu/Debian
sudo apt-get install openjdk-11-jdk
```

## 📥 Clone dan Setup Project

### 1. Clone Repository

```bash
git clone https://github.com/gitaufar/cipta-ruang.git
cd cipta-ruang
```

### 2. Install Dependencies

```bash
# Install Node modules
npm install
# atau
yarn install

# Install iOS pods (macOS only)
cd ios && pod install && cd ..
```

### 3. Verifikasi Environment

```bash
# Cek apakah environment sudah setup dengan benar
npx react-native doctor
```

## 🗄️ Konfigurasi Database

### 1. Setup Supabase

1. Buat akun di [Supabase](https://supabase.com)
2. Create new project
3. Copy Project URL dan API Key

### 2. Konfigurasi Environment Variables

Buat file `.env` di root project:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here

# Gemini AI Configuration
GEMINI_API_KEY=your-gemini-api-key-here

# App Configuration
APP_ENV=development
```

### 3. Import Database Schema

1. Buka Supabase Dashboard → SQL Editor
2. Import file schema yang disediakan
3. Jalankan migration script

## ▶️ Menjalankan Aplikasi

### 1. Start Metro Bundler

```bash
# Terminal 1
npx react-native start
```

### 2. Run Android

```bash
# Terminal 2 (pastikan Android Emulator/Device connected)
npx react-native run-android
```

### 3. Run iOS (macOS only)

```bash
# Terminal 2
npx react-native run-ios
```

### 4. Alternative: Development Build

```bash
# Build dan install debug APK
cd android
./gradlew assembleDebug

# APK akan tersedia di:
# android/app/build/outputs/apk/debug/app-debug.apk
```

## 📦 Build untuk Production

### 1. Generate Signing Key

```bash
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore cipta-ruang-key.keystore -alias cipta-ruang -keyalg RSA -keysize 2048 -validity 10000
```

### 2. Konfigurasi Signing

Edit `android/gradle.properties`:

```properties
MYAPP_UPLOAD_STORE_FILE=cipta-ruang-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=cipta-ruang
MYAPP_UPLOAD_STORE_PASSWORD=your-keystore-password
MYAPP_UPLOAD_KEY_PASSWORD=your-key-password
```

### 3. Build Release APK

```bash
cd android
./gradlew assembleRelease

# APK akan tersedia di:
# android/app/build/outputs/apk/release/app-release.apk
```

### 4. Build Android App Bundle (AAB)

```bash
cd android
./gradlew bundleRelease

# AAB akan tersedia di:
# android/app/build/outputs/bundle/release/app-release.aab
```

## 🔍 Troubleshooting

### Common Issues

#### 1. Metro Bundler Error
```bash
# Clear cache
npx react-native start --reset-cache

# Clear node modules
rm -rf node_modules
npm install
```

#### 2. Android Build Error
```bash
# Clean build
cd android
./gradlew clean
./gradlew assembleDebug
```

#### 3. Dependency Issues
```bash
# Reset React Native
npx react-native-clean-project
```

#### 4. Android SDK Not Found
```bash
# Verifikasi ANDROID_HOME
echo $ANDROID_HOME  # macOS/Linux
echo %ANDROID_HOME% # Windows

# Install missing SDK components via Android Studio
```

#### 5. Java Version Issues
```bash
# Cek Java version
java -version

# Switch Java version (macOS)
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-11.0.x.jdk/Contents/Home
```

### Debug Mode

```bash
# Enable debug mode untuk troubleshooting
adb shell input keyevent 82  # Android
# Pilih "Debug JS Remotely" atau "Reload"
```

### Performance Monitoring

```bash
# Monitor performance
npx react-native log-android  # Android logs
npx react-native log-ios      # iOS logs
```

## 📱 Testing

### Unit Testing
```bash
npm test
# atau
yarn test
```

### E2E Testing
```bash
# Install Detox (optional)
npm install -g detox-cli
detox build
detox test
```

## 🚀 Deployment

### Google Play Store
1. Build AAB file
2. Upload ke Google Play Console
3. Complete store listing
4. Submit for review

### Direct APK Distribution
1. Build release APK
2. Distribute via internal channels
3. Enable "Unknown Sources" di Android Settings

## 📞 Support

Jika mengalami masalah:

1. Cek [Issues](https://github.com/gitaufar/cipta-ruang/issues) di GitHub
2. Buat issue baru dengan template yang disediakan
3. Sertakan:
   - OS dan versi
   - Node.js version
   - Error logs
   - Steps to reproduce

## 📄 License

MIT License - lihat file [LICENSE](LICENSE) untuk detail.

---

**Dibuat dengan ❤️ untuk membantu HR dan Manager mengelola kesejahteraan karyawan**