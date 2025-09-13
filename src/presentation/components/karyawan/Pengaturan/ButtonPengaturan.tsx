import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

type ButtonPengaturanProps = {
    title: string;
    text: string;
    icon?: React.ReactNode;
    onPress?: () => void;
    disabled?: boolean;
    chevronRight?: boolean;
    color?: string;
    colorBorder?: string;
    colorBgIcon?: string;
    iconName?: string;
    iconColor?: string;
    className?: string;
    titleColor?: string;
    textColor?: string;
}

export const ButtonPengaturan: React.FC<ButtonPengaturanProps> = ({ 
    title, 
    text, 
    icon, 
    onPress, 
    disabled = false,
    chevronRight = true,
    color = "#FFFFFF", 
    colorBorder = "#E5E7EB", 
    colorBgIcon = "rgba(0,191,166,0.2)",
    iconName,
    iconColor = "#00BFA6",
    className = "",
    titleColor = "#1E293B",  // Default warna judul
    textColor = "#6B7280",
}) => {
    // Membuat style dinamis untuk warna background dan border
    const dynamicStyles = StyleSheet.create({
        container: {
            backgroundColor: color,
            borderColor: colorBorder,
        },
        iconContainer: {
            backgroundColor: colorBgIcon,
        }
    });

    const containerClasses = `px-6 py-4 rounded-xl border ${className}`;

    // Render komponen yang bisa berupa TouchableOpacity atau View biasa
    const Container = onPress && !disabled ? TouchableOpacity : View;

    return (
        <Container 
            style={dynamicStyles.container} 
            className={containerClasses}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.7}
        >
            <View className="flex-row items-center">
                {/* Icon section */}
                {(icon || iconName) && (
                    <View style={dynamicStyles.iconContainer} className="p-3 rounded-lg">
                        {icon || (iconName && 
                            <MaterialIcons name={iconName} size={24} color={iconColor} />
                        )}
                    </View>
                )}
                
                {/* Text content */}
                <View className="flex-1 ml-3">
                    <Text 
                        style={{ color: disabled ? undefined : titleColor }} 
                        className={`font-semibold text-[16px] ${disabled ? 'text-gray-400 opacity-50' : ''}`}
                    >
                        {title}
                    </Text>
                    {text && (
                        <Text 
                            style={{ color: disabled ? undefined : textColor }} 
                            className={`font-normal text-[14px] mt-1 ${disabled ? 'text-gray-400 opacity-50' : ''}`}
                        >
                            {text}
                        </Text>
                    )}
                </View>
                
                {/* Right chevron */}
                {chevronRight && (
                    <MaterialIcons 
                        name="chevron-right" 
                        size={24} 
                        color={disabled ? "#D1D5DB" : "#6B7280"} 
                    />
                )}
            </View>
        </Container>
    );
};