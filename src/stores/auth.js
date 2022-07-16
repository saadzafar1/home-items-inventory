import { defineStore } from 'pinia'
import { getFirestore, doc, setDoc, collection } from 'firebase/firestore'
import { getDocs, query, getDoc } from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'
import router from "@/router";

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: null,
    token: null
  }),
  getters: {
    getCurrentUserName: (state) => state.user.name,
  },
  actions: {
    autoSigninUser(user = null, token = null, setUser = false) {
        if(setUser && user && token) {
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
        }
        const signedInUser = localStorage.getItem('user');
        const userToken = localStorage.getItem('token');
        if(!signedInUser || !userToken) {
            return router.push('/signin');
        }
        this.user = signedInUser;
        this.token = userToken;
        router.push('/');
    },
    async signinUser(payload) {
      const auth = getAuth()
      const { user } = await signInWithEmailAndPassword(auth, payload.email, payload.password);
      const token = user.accessToken;
      const db = getFirestore()
      const userSnap = await this.getUserById(db, user.uid);
      if(userSnap.exists()) {
        const userData = userSnap.data();
        console.log(userSnap.data());
        const userObj = {
          fname: userData.fname,
          lname: userData.lname,
          email: userData.email,
        }
        this.autoSigninUser(userObj, token, true);
      }
    },
    async signupUser(payload) {
      const auth = getAuth()
      const { user } = await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      )
      const token = user.accessToken;
      const userObj = {
        fname: payload.fname,
        lname: payload.lname,
        email: user.email,
      };
      await this.saveUserToDB(userObj);
      this.autoSigninUser(userObj, token, true);
    },
    async oAuthSignin() {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const { user } = await signInWithPopup(auth, provider);
      const token = user.accessToken;
      const name = user.displayName.split(' ');
      const userObj = {
        fname: name[0],
        lname: name[1],
        email: user.email,
      };
      await this.saveUserToDB(userObj);
      this.autoSigninUser(userObj, token, true);
    },
    async saveUserToDB(user) {
        const db = getFirestore()
        const userSnap = await this.getUserById(db, user.uid);
        if(!userSnap.exists()) {
          const usersRef = collection(db, 'users')
          const userDoc = doc(usersRef, user.uid);
          await setDoc(userDoc, user);
        }
    },
    async getUserById(db,id) {
        const userRef = doc(db, 'users', id);
        const userSnap = await getDoc(userRef);
        return userSnap;
    }
  },
})
