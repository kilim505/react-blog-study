import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CLEAR_ERROR_REQUEST,
  CLEAR_ERROR_SUCCESS,
  CLEAR_ERROR_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  USER_LOADING_REQUEST,
  USER_LOADING_SUCCESS,
  USER_LOADING_FAILURE,
  PASSWORD_EDIT_UPLOADING_SUCCESS,
  PASSWORD_EDIT_UPLOADING_REQUEST,
  PASSWORD_EDIT_UPLOADING_FAILURE,
} from '../types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: '',
  userId: '',
  userName: '',
  userRole: '',
  errorMsg: '',
  successMsg: '',
  previousMatchMsg: '', // ++
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST: // 동일 과정
    case REGISTER_REQUEST:
      return {
        ...state, // 기존 상태값 복사 -> 기존 : 새로운 것 비교
        errorMsg: '',
        isLoading: true, // 동작과정그림 표시
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload, // 넘어온 값 저장
        isAuthenticated: true,
        isLoading: false,
        userId: action.payload.user.id,
        userRole: action.payload.user.role,
        errorMsg: '',
      };
    case LOGIN_FAILURE:
    case LOGOUT_FAILURE:
    case REGISTER_FAILURE:
      localStorage.removeItem('token'); // 지움
      return {
        ...state,
        ...action.payload,
        token: null,
        user: null,
        userId: null,
        isAuthenticated: false,
        isLoading: false,
        userRole: null,
        errorMsg: action.payload.data.msg,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem('token');
      return {
        token: null,
        user: null,
        userId: null,
        isAuthenticated: false,
        isLoading: false,
        userRole: null,
        errorMsg: '',
      };
    /*      
    case CLEAR_ERROR_REQUEST:
      return {
        ...state,
        errorMsg: null,
      };
    case CLEAR_ERROR_SUCCESS:
      return {
        ...state,
        errorMsg: null,
      };
    case CLEAR_ERROR_FAILURE:
      return {
        ...state,
        errorMsg: null,
      };
    */
    case USER_LOADING_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADING_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
        userId: action.payload._id,
        userName: action.payload.name,
        userRole: action.payload.role,
      };
    case USER_LOADING_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        userRole: '',
      };
    //
    case PASSWORD_EDIT_UPLOADING_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case PASSWORD_EDIT_UPLOADING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        successMsg: action.payload.data.success_msg,
        errorMsg: '',
        previousMsg: '',
      };
    case PASSWORD_EDIT_UPLOADING_FAILURE:
      return {
        ...state,
        isLoading: false,
        successMsg: '',
        errorMsg: action.payload.fail_msg,
        previousMatchMsg: action.payload.match_msg,
      };
    //
    case CLEAR_ERROR_REQUEST:
      return {
        ...state,
      };
    case CLEAR_ERROR_SUCCESS:
      return {
        ...state,
        errorMsg: '',
        previousMatchMsg: '',
      };
    case CLEAR_ERROR_FAILURE:
      return {
        ...state,
        errorMsg: 'Clear Error Fail',
        previousMatchMsg: 'Clear Error Fail',
      };
    //
    default:
      return state;
  }
};

export default authReducer;
