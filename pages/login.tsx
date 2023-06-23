import Cta from "../components/cta"
import Artikelen from "../components/artikelen"
import Image from "next/image"
import axios from "axios";
import { useRef } from "react"
import { signIn} from "next-auth/react"

type HomeProps = {
    // TODO create type for products response
    products: any;
}

export async function getServerSideProps() {
    
    const { data } = await axios.get('https://kuin.summaict.nl/api/product', {
        headers: {
            Authorization: `Bearer ${process.env.API_KEY}`
        }
    });
    return {
        props: {
            products: data
        }
    }
}

const Login = () => {
    const userName = useRef("")
    const pass = useRef("")

    const login = async () => {
        const result = await signIn("credentials",{
            username: userName.current,
            password: pass.current,
            redirect: true,
            callbackUrl: "/"
        })
    }
    return (
        <>
            <div className="">
                <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Login met je account
                        </h2>
                    </div>

                    <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <form className="space-y-6" action="#" method="POST">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Voornaam
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="name"
                                            name="name"
                                            type="name"
                                            onChange={(e) => {userName.current = e.target.value}}
                                            autoComplete="name"
                                            required
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Wachtwoord
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            onChange={(e) => {pass.current = e.target.value}}
                                            autoComplete="current-password"
                                            required
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"></input>
                                    </div>
                                </div>
                                <button
                                onClick={login}
                                className="bg-green-500 px-4 py-2 rounded-md">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login;