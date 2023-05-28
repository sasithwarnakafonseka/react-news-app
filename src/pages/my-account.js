import Modal from '@/components/CoreComponents/Modal'
import AppLayout from '@/components/Layouts/AppLayout'
import { useAuth } from '@/hooks/auth'
import Head from 'next/head'
import { useState } from 'react'

const MyAccount = () => {
    const { user } = useAuth()
    const [modalShow, setModalShow] = useState(false)
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }>
            <Head>
                <title>Laravel - Dashboard</title>
            </Head>

            <div className="py-1">
                <div className="pl-16 pr-16">
                    <div className="p-8 bg-white shadow mt-24">
                        <div className="grid grid-cols-1 md:grid-cols-3">
                            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                                <div>
                                    <p className="font-bold text-gray-700 text-xl">
                                        22
                                    </p>
                                    <p className="text-gray-400">Friends</p>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-700 text-xl">
                                        10
                                    </p>
                                    <p className="text-gray-400">Photos</p>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-700 text-xl">
                                        89
                                    </p>
                                    <p className="text-gray-400">Comments</p>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-24 w-24"
                                        viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                                <button
                                    onClick={() => setModalShow(true)}
                                    className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    data-modal-toggle="authentication-modal">
                                    Edit Account
                                </button>
                                <Modal
                                    id={'authentication-modal'}
                                    status={modalShow}
                                    statusAction={setModalShow}>
                                    <form
                                        className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8"
                                        action="#">
                                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                            Edit My Account
                                        </h3>
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                placeholder={user?.name}
                                                required=""
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="old_password"
                                                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
                                                Old password
                                            </label>
                                            <input
                                                type="password"
                                                name="old_password"
                                                id="old_password"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                required=""
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="new-password"
                                                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
                                                New password
                                            </label>
                                            <input
                                                type="password"
                                                name="new-password"
                                                id="new-password"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                required=""
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="confirm-password"
                                                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
                                                Confirm password
                                            </label>
                                            <input
                                                type="password"
                                                name="confirm-password"
                                                id="confirm-password"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                required=""
                                            />
                                        </div>
                                        <div className="flex justify-between">
                                            <button
                                                type="submit"
                                                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </Modal>
                            </div>
                        </div>
                        <div className="mt-20 text-center pb-12">
                            <h1 className="text-4xl font-medium text-gray-700">
                                {user?.name}
                            </h1>
                            <p className="font-light text-gray-600 mt-3">
                                {user?.email}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default MyAccount
