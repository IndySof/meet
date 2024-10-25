import { useState } from "react"
import { signInWithEmailAndPassword, sendPasswordResetEmail  } from "firebase/auth"
import { auth } from "@/pages"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e:any) => {
    e.preventDefault()
    try {
      const userAccess = await signInWithEmailAndPassword(auth, email, password)

      const token = await userAccess.user.getIdToken()
      const timestamp = Date.now()

      sessionStorage.setItem("authToken", token)
      sessionStorage.setItem("tokenCreationTime", timestamp.toString())

      window.location.href = "/admin"
    } catch (err) {
      alert("Erreur email ou mot de passe invalide !")
    }
  }

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Veuillez entrer votre adresse email pour réinitialiser le mot de passe.")
      return
    }

    try {
      await sendPasswordResetEmail(auth, email)
      alert("Un email de réinitialisation a été envoyé à votre adresse.")
    } catch (error) {
      // console.log(error)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pb-40">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-6">
        <h1 className="text-2xl font-semibold text-center text-gray-700">Connexion</h1>
        <input
          required
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-600 focus:border-0 focus:outline-none"
        />
        <input
          required
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-600 focus:border-0 focus:outline-none"
        />
        <button
          type="submit"
          className="w-full py-3 text-white bg-red-800 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
        >
          Se connecter
        </button>
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm text-blue-500 hover:text-blue-700 underline mt-2 float-end"
        >
          Mot de passe oublié ?
        </button>
      </form>
    </div>
  )
}

export default Login