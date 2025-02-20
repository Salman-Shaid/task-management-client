/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { app } from '../firebase/firebase.config'

// Create Authentication Context
export const AuthContext = createContext(null)

const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Create user with email & password
  const createUser = async (email, password) => {
    setLoading(true)
    try {
      return await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error('Error creating user:', error.message)
    } finally {
      setLoading(false)
    }
  }

  // Sign in with email & password
  const signIn = async (email, password) => {
    setLoading(true)
    try {
      return await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error('Error signing in:', error.message)
    } finally {
      setLoading(false)
    }
  }

  // Google sign-in
  const signInWithGoogle = async () => {
    setLoading(true)
    try {
      return await signInWithPopup(auth, googleProvider)
    } catch (error) {
      console.error('Error with Google sign-in:', error.message)
    } finally {
      setLoading(false)
    }
  }

  // Logout user
  const logOut = async () => {
    setLoading(true)
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Error logging out:', error.message)
    } finally {
      setLoading(false)
    }
  }

  // Update user profile (name & photo)
  const updateUserProfile = async (name, photo) => {
    if (!auth.currentUser) return
    try {
      return await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      })
    } catch (error) {
      console.error('Error updating profile:', error.message)
    }
  }

  // Handle user authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      try {
        if (currentUser?.email) {
          // Set user state
          setUser(currentUser)
        } else {
          // Clear user state
          setUser(null)
        }
      } catch (error) {
        console.error('Error in auth state change:', error.message)
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  // Authentication context value
  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
