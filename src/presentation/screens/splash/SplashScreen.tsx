import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
// Import SVG yang telah diimpor
import LogoSplash from "../../../assets/splashscreen/logo_splash.svg";
import ShieldSplash from "../../../assets/splashscreen/shield-splash.svg";
import StatsSplash from "../../../assets/splashscreen/stats-splash.svg";
import TeamSplash from "../../../assets/splashscreen/team-splash.svg";

export default function SplashScreen() {
    // Nilai opacity untuk animasi fade in
    const fadeAnim = useRef(new Animated.Value(0)).current;
    
    useEffect(() => {
        // Animasi fade in ketika komponen mount
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000, // Durasi animasi 1 detik
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);
    
    return (
        <LinearGradient
            colors={['#00BFA6', '#0D9488']}
            style={styles.container}
        >
            {/* Circles for decoration - top left */}
            <View style={[styles.circle, styles.circleTopLeft]} />
            
            {/* Circles for decoration - top right */}
            <View style={[styles.circle, styles.circleTopRight]} />
            
            {/* Circles for decoration - bottom */}
            <View style={[styles.circle, styles.circleBottom]} />
            
            {/* Animated container untuk konten */}
            <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                {/* Logo */}
                <View style={styles.logoContainer}>
                    <LogoSplash width={60} height={60} />
                </View>
                
                {/* App Name */}
                <Text style={styles.appName}>
                    Safe Space
                </Text>
                
                {/* Tagline */}
                <Text style={styles.tagline}>
                    AI Burnout Detection
                </Text>
                
                {/* Subtitle */}
                <Text style={styles.subtitle}>
                    Untuk Kesehatan Mental Karyawan
                </Text>
                
                {/* Features icons */}
                <View style={styles.featuresContainer}>
                    <View style={styles.featureItem}>
                        <View style={styles.iconContainer}>
                            <StatsSplash width={24} height={24} fill="white" />
                        </View>
                        <Text style={styles.featureText}>Analytics</Text>
                    </View>
                    
                    <View style={styles.featureItem}>
                        <View style={styles.iconContainer}>
                            <ShieldSplash width={24} height={24} fill="white" />
                        </View>
                        <Text style={styles.featureText}>Wellbeing</Text>
                    </View>
                    
                    <View style={styles.featureItem}>
                        <View style={styles.iconContainer}>
                            <TeamSplash width={24} height={24} />
                        </View>
                        <Text style={styles.featureText}>Team Care</Text>
                    </View>
                </View>
            </Animated.View>
            
            {/* Version */}
            <Text style={styles.version}>
                v1.0.0
            </Text>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
    },
    circle: {
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 999,
    },
    circleTopLeft: {
        width: 96,
        height: 96,
        top: 80,
        left: 40,
    },
    circleTopRight: {
        width: 48,
        height: 48,
        top: 144,
        right: 48,
    },
    circleBottom: {
        width: 64,
        height: 64,
        bottom: 128,
        right: 64,
    },
    logoContainer: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 24,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    appName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 4,
    },
    tagline: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.9)',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: 48,
    },
    featuresContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 80,
    },
    featureItem: {
        alignItems: 'center',
        marginHorizontal: 20,
    },
    iconContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    featureText: {
        color: 'white',
        fontSize: 12,
    },
    version: {
        position: 'absolute',
        bottom: 40,
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 12,
    },
});