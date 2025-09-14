import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import LogoutIcon from "../../../assets/icons/logout.svg"; // ganti path sesuai projek kamu

interface LogoutConfirmationModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}


export const LogoutModal: React.FC<LogoutConfirmationModalProps> = ({
  visible,
  onCancel,
  onConfirm,
}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 bg-black/40 items-center justify-center">
        <View className="bg-white w-80 rounded-2xl p-6 items-center">
          {/* Icon */}
          <View className="bg-red-500 w-16 h-16 rounded-full items-center justify-center mb-4">
            <LogoutIcon width={28} height={28} fill="#fff" />
          </View>

          {/* Text */}
          <Text className="text-lg font-semibold text-center text-[#111827] mb-6">
            Apakah anda yakin{"\n"}ingin keluar?
          </Text>

          {/* Buttons */}
          <View className="flex-row space-x-4">
            <TouchableOpacity
              onPress={onCancel}
              className="flex-1 py-3 rounded-xl border border-gray-300 items-center"
            >
              <Text className="text-gray-700 font-medium">Batal</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onConfirm}
              className="flex-1 py-3 rounded-xl bg-red-500 items-center"
            >
              <Text className="text-white font-medium">Keluar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
