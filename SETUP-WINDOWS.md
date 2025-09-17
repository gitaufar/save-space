# 🪟 Setup Khusus Windows - Cipta Ruang

Panduan instalasi lengkap untuk Windows dengan langkah-langkah detail.

## 🎯 Quick Setup Guide

### Langkah 1: Install Chocolatey (Package Manager)

Buka **PowerShell sebagai Administrator** dan jalankan:

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

### Langkah 2: Install Dependencies via Chocolatey

```powershell
# Install Node.js, Java, dan Git
choco install nodejs openjdk11 git -y

# Restart PowerShell setelah instalasi
```

### Langkah 3: Install Android Studio

1. Download [Android Studio](https://developer.android.com/studio) (±1GB)
2. Install dengan wizard default
3. Saat pertama kali buka, pilih "Standard" setup
4. Tunggu download SDK (±2-3GB)

### Langkah 4: Setup Environment Variables

**Otomatis via Script:**

Buat file `setup-env.bat` dan jalankan sebagai Administrator:

```batch
@echo off
echo Setting up Android environment variables...

:: Set ANDROID_HOME
setx ANDROID_HOME "%USERPROFILE%\AppData\Local\Android\Sdk" /M

:: Set JAVA_HOME (adjust path sesuai versi Java)
setx JAVA_HOME "C:\Program Files\OpenJDK\jdk-11.0.19" /M

:: Add to PATH
setx PATH "%PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\tools;%ANDROID_HOME%\tools\bin" /M

echo Environment variables set successfully!
echo Please restart your computer for changes to take effect.
pause
```

**Manual via System Properties:**

1. Tekan `Win + R`, ketik `sysdm.cpl`
2. Tab "Advanced" → "Environment Variables"
3. System Variables → "New":
   - `ANDROID_HOME`: `C:\Users\[USERNAME]\AppData\Local\Android\Sdk`
   - `JAVA_HOME`: `C:\Program Files\OpenJDK\jdk-11.0.x`
4. Edit "Path", tambahkan:
   - `%ANDROID_HOME%\platform-tools`
   - `%ANDROID_HOME%\tools`
   - `%ANDROID_HOME%\tools\bin`

### Langkah 5: Install React Native CLI

```powershell
npm install -g react-native-cli
```

### Langkah 6: Verifikasi Setup

```powershell
# Cek semua tools
node --version
npm --version
java -version

# Cek Android environment
echo $env:ANDROID_HOME
adb version
```

### Langkah 7: Clone dan Setup Project

```powershell
# Clone repository
git clone https://github.com/gitaufar/cipta-ruang.git
cd cipta-ruang

# Install dependencies
npm install

# Verifikasi environment
npx react-native doctor
```

## 🔧 Troubleshooting Windows

### Error: "ANDROID_HOME is not set"

```powershell
# Manual set untuk session saat ini
$env:ANDROID_HOME = "$env:USERPROFILE\AppData\Local\Android\Sdk"
$env:PATH += ";$env:ANDROID_HOME\platform-tools"
```

### Error: "Unable to locate adb"

1. Buka Android Studio
2. Tools → SDK Manager
3. SDK Tools tab
4. Centang "Android SDK Platform-Tools"
5. Apply

### Error: "JAVA_HOME is not set"

```powershell
# Cari instalasi Java
dir "C:\Program Files\OpenJDK\" /s /b | findstr "bin\java.exe"

# Set JAVA_HOME sesuai path yang ditemukan
$env:JAVA_HOME = "C:\Program Files\OpenJDK\jdk-11.0.x"
```

### Error: PowerShell Execution Policy

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Error: "Could not determine the dependencies of task"

```powershell
cd android
.\gradlew clean
.\gradlew assembleDebug
```

## 🏃‍♂️ Cara Menjalankan

### Start Development Server

```powershell
# Terminal 1: Start Metro
npx react-native start

# Terminal 2: Run Android
npx react-native run-android
```

### Build APK

```powershell
# Debug APK
cd android
.\gradlew assembleDebug

# Lokasi: android\app\build\outputs\apk\debug\app-debug.apk
```

## 🔥 Tips Optimasi Windows

### 1. Nonaktifkan Windows Defender untuk Folder Project

1. Windows Security → Virus & threat protection
2. Add exclusion → Folder
3. Pilih folder project React Native

### 2. Gunakan WSL2 (Optional)

```powershell
# Install WSL2 untuk performance lebih baik
wsl --install
```

### 3. Increase Node.js Memory

```powershell
# Set memory limit untuk Node.js
npm config set max_old_space_size=8192
```

### 4. Use Yarn untuk Speed

```powershell
npm install -g yarn
yarn install  # instead of npm install
```

## 📱 Testing di Device Fisik

### Enable USB Debugging

1. Settings → About phone
2. Tap "Build number" 7 kali
3. Settings → Developer options
4. Enable "USB debugging"

### Connect Device

```powershell
# Cek device terhubung
adb devices

# Install APK ke device
adb install android\app\build\outputs\apk\debug\app-debug.apk
```

## 🎯 Shortcut Commands

Buat file `dev.bat` untuk shortcut:

```batch
@echo off
echo Cipta Ruang Development Helper
echo.
echo 1. Start Metro
echo 2. Run Android
echo 3. Build Debug APK
echo 4. Clean Build
echo 5. Check Environment
echo.
set /p choice="Choose option (1-5): "

if %choice%==1 (
    npx react-native start
) else if %choice%==2 (
    npx react-native run-android
) else if %choice%==3 (
    cd android && .\gradlew assembleDebug && cd ..
) else if %choice%==4 (
    cd android && .\gradlew clean && .\gradlew assembleDebug && cd ..
) else if %choice%==5 (
    npx react-native doctor
)
```

---

**Happy Coding! 🚀**