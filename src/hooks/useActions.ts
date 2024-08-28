import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { userActions } from "../redux/user/userSlice";

const allActions = {
  ...userActions
}

// Кастомный хук для упрощения вызова actions
export const useActions = () => {
  const dispatch = useDispatch()

  return bindActionCreators(allActions, dispatch)
}