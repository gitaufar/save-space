import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from "lucide-react-native";

export type ConfirmType = 'error' | 'success' | 'warning' | 'info' | 'confirm';

interface ConfirmCardProps {
  visible: boolean;
  title: string;
  message: string;
  type?: ConfirmType;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
}

const getTypeConfig = (type: ConfirmType) => {
  switch (type) {
    case 'error':
      return {
        icon: AlertCircle,
        iconColor: '#EF4444',
        bgColor: 'bg-red-500',
        confirmBg: 'bg-red-500',
        confirmText: 'text-white'
      };
    case 'success':
      return {
        icon: CheckCircle,
        iconColor: '#10B981',
        bgColor: 'bg-green-500',
        confirmBg: 'bg-green-500',
        confirmText: 'text-white'
      };
    case 'warning':
      return {
        icon: AlertTriangle,
        iconColor: '#F59E0B',
        bgColor: 'bg-yellow-500',
        confirmBg: 'bg-yellow-500',
        confirmText: 'text-white'
      };
    case 'info':
      return {
        icon: Info,
        iconColor: '#3B82F6',
        bgColor: 'bg-blue-500',
        confirmBg: 'bg-blue-500',
        confirmText: 'text-white'
      };
    case 'confirm':
    default:
      return {
        icon: AlertCircle,
        iconColor: '#6B7280',
        bgColor: 'bg-gray-500',
        confirmBg: 'bg-blue-500',
        confirmText: 'text-white'
      };
  }
};

export const ConfirmCard: React.FC<ConfirmCardProps> = ({
  visible,
  title,
  message,
  type = 'confirm',
  onConfirm,
  onCancel,
  confirmText = 'OK',
  cancelText = 'Batal',
  showCancel = true,
}) => {
  const config = getTypeConfig(type);
  const IconComponent = config.icon;

  const handleConfirm = () => {
    onConfirm?.();
  };

  const handleCancel = () => {
    onCancel?.();
  };

  const handleBackdropPress = () => {
    if (showCancel) {
      handleCancel();
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableOpacity 
        className="flex-1 bg-black/40 items-center justify-center"
        activeOpacity={1}
        onPress={handleBackdropPress}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
          className="bg-white w-80 rounded-2xl p-6 items-center mx-4"
        >
          {/* Icon */}
          <View className={`${config.bgColor} w-16 h-16 rounded-full items-center justify-center mb-4`}>
            <IconComponent width={28} height={28} color="#fff" strokeWidth={2} />
          </View>

          {/* Title */}
          <Text className="text-lg font-semibold text-center text-[#111827] mb-2">
            {title}
          </Text>

          {/* Message */}
          <Text className="text-sm text-center text-gray-600 mb-6 leading-5">
            {message}
          </Text>

          {/* Buttons */}
          <View className={`${showCancel ? 'flex-row space-x-4' : 'w-full'}`}>
            {showCancel && (
              <TouchableOpacity
                onPress={handleCancel}
                className="flex-1 py-3 rounded-xl border border-gray-300 items-center"
              >
                <Text className="text-gray-700 font-medium">{cancelText}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={handleConfirm}
              className={`${showCancel ? 'flex-1' : 'w-full'} py-3 rounded-xl ${config.confirmBg} items-center`}
            >
              <Text className={`${config.confirmText} font-medium`}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};