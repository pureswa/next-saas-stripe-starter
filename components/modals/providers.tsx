"use client"

import { createContext, useState } from "react"
import { useSignInModal } from "@/components/modals/sign-in-modal"

export const ModalContext = createContext<{
  showSignInModal: boolean
  setShowSignInModal: (show: boolean) => void
}>({
  showSignInModal: false,
  setShowSignInModal: () => {},
})
export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [showSignInModal, setShowSignInModal] = useState(false)
  const { SignInModal } = useSignInModal()

  return (
    <ModalContext.Provider value={{ showSignInModal, setShowSignInModal }}>
      <SignInModal />
      {children}
    </ModalContext.Provider>
  )
}
