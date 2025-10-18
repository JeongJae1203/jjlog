import axios from "axios";
import { defineStore } from "pinia";

// 사용자 정보 저장소
export const useUserStore = defineStore('user', {
  state : () => ({
    token : localStorage.getItem('token') || '',
    user : JSON.parse(localStorage.getItem('user')) || null
  }),
  getters : {
    // 로그인 여부 확인
    isLoggedIn : (state) => !!state.token && !!state.user,
    // 사용자 이름 가져오기
    userName : (state) => state.user?.name || '',
    // 사용자 이메일 가져오기
    userEmail : (state) => state.user?.email || ''
  },
  actions : {
    async login(email, password) {
      try {
        const response = await axios.post(`https://jarryjeong.pe.kr/auth/login`, { 
          email, 
          password 
        });
        
        const data = response.data;
        
        if (data.user) {
          this.token = data.token || '';
          this.user = data.user;
          localStorage.setItem('token', this.token);
          localStorage.setItem('user', JSON.stringify(this.user));
          return { success: true, data };
        } else {
          throw new Error('사용자 정보를 받아오지 못했습니다.');
        }
      } catch (error) {
        console.error('로그인 에러:', error);
        return { 
          success: false, 
          error: error.response?.data?.message || error.message || '로그인에 실패했습니다.' 
        };
      }
    },
    logout() {
      this.token = '';
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    // 앱 시작 시 localStorage에서 사용자 정보 복원
    initializeAuth() {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (token && userStr) {
        this.token = token;
        this.user = JSON.parse(userStr);
      }
    }
  }
});