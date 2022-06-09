import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'
import Router, { useRouter } from 'next/router'
import React, { createContext, useState } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { auth } from '../firebase/firebaseConfig'

interface IAuth {
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
}

const AuthContext = createContext<IAuth>({
  user: null,
  signIn: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
})

export const useAuth = () => useContext(AuthContext)

interface AuthProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        setLoading(false)
        router.push('/')
      } else {
        setUser(null)
        setLoading(true)
        router.push('/')
      }
      setLoading(false)
    })
  }, [auth])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    setError('')
    await signInWithEmailAndPassword(auth, email, password)
      .then((credentials) => {
        setUser(credentials.user)
        setLoading(false)
        router.push('/')
      })
      .catch((error) => {
        setError(error.message)
        alert(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const signUp = async (email: string, password: string) => {
    setLoading(true)
    setError('')
    await createUserWithEmailAndPassword(auth, email, password)
      .then((credentials) => {
        setUser(credentials.user)
        setLoading(false)
        router.push('/')
      })
      .catch((error) => {
        setError(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const logout = async () => {
    setLoading(true)
    signOut(auth)
      .then(() => {
        setUser(null)
        router.push('/')
      })
      .catch((error) => {
        setError(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  console.log(user)
  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        logout,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
