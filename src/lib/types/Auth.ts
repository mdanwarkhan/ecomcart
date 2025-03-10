import { ReactNode } from "react"
import { User } from "./User"

export interface AuthContextType {
    isAuthenticated: boolean
    user?: User | null
    login: (user: User) => void
    logout: () => void
}

export interface AuthProviderProps {
    children: ReactNode
}