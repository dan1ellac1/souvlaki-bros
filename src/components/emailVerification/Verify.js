import React, { useEffect, useState } from "react"
import { getAuth } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { Button, Spin } from "antd"
import { useSnackbar } from "notistack"

export const Verify = ({ setVerify }) => {
  const auth = getAuth()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const [checking, setChecking] = useState(false)
  const [emailVerified, setEmailVerified] = useState(false)

  useEffect(() => {
    if (auth.currentUser?.emailVerified) {
      setEmailVerified(true)
      setVerify(true)
      navigate("/dashboard") // redirect wherever your app should go
    }
  }, [])

  const handleCheckVerification = async () => {
    try {
      setChecking(true)
      await auth.currentUser.reload() // refresh user data
      if (auth.currentUser.emailVerified) {
        setEmailVerified(true)
        setVerify(true)
        enqueueSnackbar("Email verified successfully!", { variant: "success" })
        navigate("/dashboard")
      } else {
        enqueueSnackbar("Email not verified yet. Please check your inbox.", {
          variant: "warning",
        })
      }
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" })
    } finally {
      setChecking(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#f7f7f7]">
      <h1 className="text-3xl font-bold mb-6">Verify Your Email</h1>
      <p className="text-lg mb-4 text-center max-w-lg">
        We’ve sent a verification link to your email address. Please verify your email to activate your account.
      </p>

      <Button
        type="primary"
        size="large"
        loading={checking}
        onClick={handleCheckVerification}
      >
        {checking ? "Checking..." : "I Verified My Email"}
      </Button>

      {emailVerified && (
        <p className="text-green-600 mt-4 font-semibold">
          ✅ Your email is verified! Redirecting...
        </p>
      )}
    </div>
  )
}
