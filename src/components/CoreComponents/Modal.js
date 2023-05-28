const Modal = ({ status, children, id, statusAction, title }) => (
    <div
        id={id}
        aria-hidden="true"
        className={
            status
                ? 'overflow-x-hidden overflow-y-auto fixed h-modal flex md:h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center'
                : 'hidden overflow-x-hidden overflow-y-auto fixed flex h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center'
        }>
        <div className="relative w-full max-w-md px-4 h-full md:h-auto">
            <div className="bg-white rounded-lg shadow relative dark:bg-gray-700">
                <div className="flex justify-end p-2">
                    {title ? (
                        <div className="text-1xl font-bold mt-4 ml-4">
                            {title}
                        </div>
                    ) : null}
                    <button
                        onClick={() => {
                            statusAction(false)
                        }}
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                        data-modal-toggle="authentication-modal">
                        <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
                <div className="body-modal">{children}</div>
            </div>
        </div>
    </div>
)

export default Modal
