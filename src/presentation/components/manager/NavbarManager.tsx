import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Home, Settings } from "lucide-react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import CBIIcon from "../../../assets/hrd/cbi_task.svg"; // path svg

export const NavbarManager = ({ state, navigation }: BottomTabBarProps) => {
  return (
    <View
      className="w-full bg-white flex flex-row items-center justify-center rounded-t-3xl pb-6 pt-6 px-10"
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: -4, // shadow ke atas
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 16,
      }}
    >
      <View className="w-full flex flex-row items-center justify-between px-14 relative">
        {/* Home */}
        <TouchableOpacity
          className="flex flex-col items-center justify-center"
          onPress={() => navigation.navigate("DashboardManager")}
        >
          <Home
            size={24}
            color={state.index === 0 ? "#00BFA6" : "#94A3B8"}
            strokeWidth={2}
          />
          <Text
            className={`text-xs mt-1 ${
              state.index === 0
                ? "text-primary font-medium"
                : "text-gray-400"
            }`}
          >
            Beranda
          </Text>
        </TouchableOpacity>

        {/* Tombol Tengah (CBI) */}
        <TouchableOpacity
          onPress={() => navigation.navigate("CBITestScreen")}
          className="absolute -top-10 ml-6 left-1/2 w-16 h-16 rounded-full bg-[#00BFA6] items-center justify-center shadow-lg"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 8,
          }}
        >
          <CBIIcon width={28} height={28} fill="#fff" />
          <Text className="text-[10px] text-white mt-1">CBI</Text>
        </TouchableOpacity>

        {/* Settings */}
        <TouchableOpacity
          className="flex flex-col items-center justify-center"
          onPress={() => navigation.navigate("PengaturanManager")}
        >
          <Settings
            size={24}
            color={state.index === 1 ? "#00BFA6" : "#94A3B8"}
            strokeWidth={2}
          />
          <Text
            className={`text-xs mt-1 ${
              state.index === 1
                ? "text-primary font-medium"
                : "text-gray-400"
            }`}
          >
            Pengaturan
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
