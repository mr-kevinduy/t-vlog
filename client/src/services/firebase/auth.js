import firebase from './index';

const Auth = firebase.auth();

export const registerAuth = async (username, password) => await Auth.createUserWithEmailAndPassword(username, password);
export const loginAuth = async (username, password) => await Auth.signInWithEmailAndPassword(username, password);
export const logoutAuth = async () => await Auth.signOut();
export const resetPasswordAuth = async (email) => await Auth.sendPasswordResetEmail();

/**
 * Listening for auth state changes.
 * @return {Promise}
 */
export const getAuthState = async () => await Auth.onAuthStateChanged();

/**
 * Get current user
 * @return {any}
 */
export const getCurrentUser = () => Auth.currentUser;

/**
 * Send a email verify.
 * @return {void}
 */
export const sendEmailVerification = async () => await getCurrentUser().sendEmailVerification();
export const applyOOBCode = async (code) => await Auth.applyActionCode(code);
export const checkOOBCode = async (code) => await Auth.checkActionCode(code);
