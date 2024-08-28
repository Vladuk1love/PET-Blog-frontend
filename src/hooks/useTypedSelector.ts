import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../redux/store";

// Кастомный хук для упрощения и типизации при использовании useSelector
export const useTypedSelector:TypedUseSelectorHook<RootState> = useSelector