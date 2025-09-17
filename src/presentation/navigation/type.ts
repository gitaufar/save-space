export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  RegisterStep: { role: 'Manager' | 'Karyawan' };
};

export type ManagerStackParamList = {
  MainTab: undefined;
  ListKaryawanScreen: undefined;
  DetailKaryawanScreen: { employeeId: string };
  DetailRiwayatMoodScreen: { employeeId: string };
  ProfileScreen: undefined;
  AturRuangScreen: undefined;
};
