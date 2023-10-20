import { create } from "zustand";

interface UserState {}

const useBearStore = create<UserState>()((set) => ({}));
