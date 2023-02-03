
import logo from "/public/logo.svg";
import { useForm } from 'react-hook-form';
import { userService } from "../../services/user";
import { APIRoute } from 'astro'
import { useState } from "react";
import LoadingPage from "./LoadingPage";


interface IValue {
  email: string,
  password: string,

}

const Login = () => {
  const [loggedInState, setLoggedInState] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();


  const onError = (errors: any, e: any) => console.log(errors, e);

  const onSubmit = async (data: any) => {
    const { email, password } = data
    console.log({ email, password });
    try {
      setLoggedInState(true)
      const user = await userService.login(email, password)
      if (user) {
        setLoggedInState(false)

        window.location.href = "/workspaces"
      }

    } catch (error) {
      console.error('Bug', error)
    }
  };
  return (

    <div className="grid h-screen place-items-center">


      {loggedInState ? <LoadingPage /> :
        <div className="card w-96">
          <img width="100%" src={logo} />
          <h4 className="card-header text-center text-2xl">Login</h4>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit, onError)}>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your email</label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
              rounded-lg focus:ring-blue-500 focus:border-blue-500 block 
              w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@flowbite.com"
                  required
                  {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
                />
                {errors.email && <span>Invalid email</span>}
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"

                >Your password</label>
                <input
                  type="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
              dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
              dark:focus:border-blue-500"
                  required
                  {...register("password", { required: true })}
                />
              </div>
              <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    required
                    {...register("remember", { required: true })}
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Remember me</label>
              </div>
              <button
                type="submit"

                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >Submit</button>
            </form>
          </div>
        </div>
      }

    </div>

  )
}

export default Login;
