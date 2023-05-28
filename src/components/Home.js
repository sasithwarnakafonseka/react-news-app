import React, { useEffect, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import axios from '@/lib/axios'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import Modal from './CoreComponents/Modal'
const Home = ({ auth }) => {
    const router = useRouter()
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 1,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    }
    const [news, setNews] = useState([])
    const today = new Date().toISOString().split('T')[0]
    const [categories, setCategories] = useState([])
    const [topNews, setTopNews] = useState([])
    const [selectedCategory, setSelectedCategories] = useState(null)
    const [searchInput, setSearchInput] = useState(null)
    const language = useSelector(state => {
        return state.language.language
    })
    const [endDate, setEndDate] = useState(today)
    const [urlData, setUrlData] = useState({ page: 1, lang: language })

    const [sources, setSources] = useState([])
    const [sourcesSelected, setSourcesSelected] = useState(null)
    const [enableDeleteButton, setEnableDeleteButton] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/data/categories')
                setCategories(response.data)

                const responseTopNews = await axios.get(
                    '/api/article/top-headlines',
                )
                if (auth) {
                    const getMySearch = await axios.get('/api/get-my-search')
                    if (getMySearch.data.length > 0) {
                        passDataToSearch(getMySearch.data[0])
                        setEnableDeleteButton(true)
                    }
                }

                setTopNews(responseTopNews.data.articles)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/data/sources', {
                    selectedCategory,
                    language,
                })
                setSources(response.data.sources)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        if (selectedCategory) {
            addValue('category', selectedCategory)
            fetchData()
        }
    }, [selectedCategory])

    const setSearch = () => {
        if (searchInput) {
            addValue('search', searchInput)
        } else {
            toast.error('Search input can not be empty!')
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const search = urlData['category']
                ? urlData['category']
                : urlData['search']
                ? urlData['search']
                : 'all'
            // const search = urlData['search'] ? urlData['search'] : 'all'
            try {
                const response = await axios.get(
                    `/api/article/everything?q=${search}&pageSize=${5}&page=${
                        urlData['page']
                    }&sources=${urlData['sources']}&from=${
                        urlData['from']
                    }&to=${urlData['to']}`,
                )
                setNews(response.data.articles)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        router.push({
            query: urlData,
        })
        fetchData()
    }, [urlData])

    useEffect(() => {
        addValue('lang', language)
    }, [language])

    const addValue = (key, value) => {
        setUrlData(prevObject => ({
            ...prevObject,
            [key]: value,
        }))
    }

    const handleNextPage = () => {
        addValue('page', urlData.page + 1)
    }

    const handlePreviousPage = () => {
        addValue('page', urlData.page - 1)
    }

    useEffect(() => {
        addValue('source', sourcesSelected)
    }, [sourcesSelected])

    useEffect(() => {
        if (urlData['to']) {
            setEndDate(urlData['to'])
        }
    }, [urlData['to']])

    const [modalShow, setModalShow] = useState(false)
    const [modalShowDelete, setModalDeleteShow] = useState(false)
    const saveSearchData = async () => {
        await axios.post('/api/save-my-search', urlData).then(() => {
            setEnableDeleteButton(true)
            setModalShow(false)
        })
    }
    const deleteSearchData = async () => {
        const getMySearch = await axios.delete('/api/delete-my-search')
        if (getMySearch.data === 'done') {
            setEnableDeleteButton(false)
            setModalDeleteShow(false)
        }
    }
    const passDataToSearch = data => {
        const search = { page: 1, lang: language }
        if (data.category) {
            search['category'] = data.category
        }

        if (data.search) {
            search['search'] = data.search
        }

        if (data.source) {
            search['source'] = data.source
        }

        if (data.end_date) {
            search['to'] = data.end_date
        }

        if (data.start_date) {
            search['from'] = data.start_date
        }
        setUrlData(search)
    }
    return (
        <div className="min-h-screen bg-gray-100 z-10">
            <main className="container mx-auto py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {news.map((article, i) => (
                            <div
                                key={i}
                                className="flex h-45 mb-4 bg-white rounded overflow-hidden shadow-lg">
                                <div className="flex flex-wrap no-underline hover:no-underline">
                                    {article.urlToImage && (
                                        <>
                                            <div className="w-full md:w-2/3 rounded-t" />
                                            <Image
                                                unoptimized
                                                width={500}
                                                height={600}
                                                alt={article.title}
                                                src={article.urlToImage}
                                            />
                                        </>
                                    )}
                                    <div className="w-full md:w-1/3 flex flex-col flex-grow flex-shrink">
                                        <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
                                            <p className="w-full text-gray-600 text-xs md:text-sm pt-6 px-6">
                                                {article.source.name}
                                            </p>
                                            <div className="w-full font-bold text-xl text-gray-900 px-6">
                                                {article.title}
                                            </div>
                                            <p className="text-gray-800 font-serif text-base px-6 mb-5">
                                                {article.description}
                                            </p>
                                        </div>

                                        <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
                                            <div className="flex items-center justify-between">
                                                <p className="text-gray-600 text-xs md:text-sm">
                                                    {article.author} <br />
                                                    {new Date(
                                                        article.publishedAt,
                                                    ).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-center mt-8">
                            <button
                                onClick={handlePreviousPage}
                                disabled={urlData.page === 1}
                                className="bg-gray-500 hover:bg-black text-white font-bold py-2 px-4 rounded-l focus:outline-none">
                                Previous
                            </button>
                            <span className="bg-gray-500 text-white font-bold py-2 px-4">
                                {urlData.page}
                            </span>
                            <button
                                onClick={handleNextPage}
                                className="bg-gray-500 hover:bg-black text-white font-bold py-2 px-4 rounded-r focus:outline-none">
                                Next
                            </button>
                        </div>
                    </div>
                    <div className="hidden lg:block sticky">
                        <h1 className="text-md font-bold mb-2">Search</h1>
                        {auth && urlData && (
                            <>
                                <button
                                    onClick={() => setModalShow(true)}
                                    data-modal-toggle="save-my-search-modal"
                                    className="mb-2 right-0 top-0 bg-black hover:bg-black text-white px-2 py-0.1 rounded-sm flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="w-4 h-4 mr-2">
                                        <path d="M9 11H7a5 5 0 0 0 0 10h10a5 5 0 0 0 0-10h-2m-3-7v7m0 0V7m0 7a3 3 0 0 1-6 0m6 0a3 3 0 0 0-6 0m6 0a3 3 0 0 1-6 0m4-7a3 3 0 0 1 0 6" />
                                    </svg>
                                    Save my search for next time
                                </button>
                                {enableDeleteButton && (
                                    <button
                                        onClick={() => setModalDeleteShow(true)}
                                        data-modal-toggle="save-my-search-delete-modal"
                                        className="mb-2 right-0 top-0 bg-black hover:bg-black text-white px-2 py-0.1 rounded-sm flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="w-4 h-4 mr-2">
                                            <path d="M9 11H7a5 5 0 0 0 0 10h10a5 5 0 0 0 0-10h-2m-3-7v7m0 0V7m0 7a3 3 0 0 1-6 0m6 0a3 3 0 0 0-6 0m6 0a3 3 0 0 1-6 0m4-7a3 3 0 0 1 0 6" />
                                        </svg>
                                        Remove my search
                                    </button>
                                )}

                                <Modal
                                    id={'save-my-search-modal'}
                                    status={modalShow}
                                    statusAction={setModalShow}
                                    className="modal"
                                    overlayClassName="overlay"
                                    title={'Confirmation'}>
                                    <div className="p-5">
                                        <p className="text-gray-700 mb-4">
                                            Do you want to save this data?
                                        </p>
                                        {/* Additional input fields can be added here */}
                                        <div className="flex justify-end">
                                            <button
                                                onClick={saveSearchData}
                                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
                                                Save
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setModalShow(false)
                                                }}
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </Modal>
                                <Modal
                                    id={'save-my-search-delete-modal'}
                                    status={modalShowDelete}
                                    statusAction={setModalDeleteShow}
                                    className="modal"
                                    overlayClassName="overlay"
                                    title={'Confirmation'}>
                                    <div className="p-5">
                                        <p className="text-gray-700 mb-4">
                                            Do you want to delete this data?
                                        </p>
                                        {/* Additional input fields can be added here */}
                                        <div className="flex justify-end">
                                            <button
                                                onClick={deleteSearchData}
                                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
                                                Save
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setModalDeleteShow(false)
                                                }}
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </Modal>
                            </>
                        )}
                        <div className="bg-white shadow-md rounded-lg p-6 mb-3">
                            <div className="flex">
                                <input
                                    type="text"
                                    onChange={e => {
                                        setSearchInput(e.target.value)
                                    }}
                                    placeholder="Enter your search query"
                                    className="flex-1 py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
                                />
                                <button
                                    onClick={setSearch}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-md">
                                    Search
                                </button>
                            </div>
                        </div>

                        <h1 className="text-md font-bold mb-2">Categories</h1>
                        <ul className="bg-white rounded-lg shadow-lg p-4">
                            {categories.map(category => (
                                <li
                                    onClick={() => {
                                        setSelectedCategories(category)
                                    }}
                                    key={category}
                                    className={`cursor-pointer hover:text-blue-500 mb-2 ${
                                        selectedCategory === category &&
                                        `text-blue-500 font-bold`
                                    }`}>
                                    {category.charAt(0).toUpperCase() +
                                        category.slice(1)}
                                </li>
                            ))}
                        </ul>
                        {sources.length > 0 && (
                            <>
                                <h1 className="text-md font-bold mb-2 pt-3">
                                    Sources
                                </h1>
                                <ul className="bg-white rounded-lg shadow-lg p-4">
                                    {sources.map(source => (
                                        <li
                                            onClick={() => {
                                                setSourcesSelected(source.id)
                                            }}
                                            key={source.id}
                                            className={`cursor-pointer hover:text-blue-500 mb-2 ${
                                                urlData?.source === source.id &&
                                                `text-blue-500 font-bold`
                                            }`}>
                                            {source.name}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}

                        <h1 className="text-md font-bold mb-2 pt-3">
                            Filter by date
                        </h1>
                        <div className="filter-card">
                            <div className="bg-white rounded p-4 mt-4 grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="from" className="mb-2">
                                        Start Date:
                                    </label>
                                    <input
                                        type="date"
                                        id="from"
                                        className="border border-gray-300 rounded px-2 py-1"
                                        max={endDate}
                                        onChange={e => {
                                            addValue('from', e.target.value)
                                        }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="to" className="mb-2">
                                        End Date:
                                    </label>
                                    <input
                                        type="date"
                                        id="to"
                                        className="border border-gray-300 rounded px-2 py-1"
                                        max={today}
                                        onChange={e => {
                                            addValue('to', e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <h1 className="text-md font-bold mb-2 pt-6">
                            Top News
                        </h1>
                        <Carousel responsive={responsive}>
                            {topNews.map((article, i) => (
                                <div key={i}>
                                    <div className="w-full  flex flex-col flex-grow flex-shrink">
                                        <div className="flex-1 mt-2  bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
                                            <a
                                                href="#"
                                                className="flex mt-5  flex-wrap no-underline hover:no-underline">
                                                <div className="w-full font-bold text-xl text-gray-900 px-6">
                                                    {article.title}
                                                </div>
                                                <p className="text-gray-800 font-serif text-base px-6 mb-5 pt-3">
                                                    {article.description}
                                                </p>
                                                {article.urlToImage && (
                                                    <div className="px-6 mb-5 pt-3">
                                                        <Image
                                                            unoptimized
                                                            width={200}
                                                            height={200}
                                                            alt={article.title}
                                                            src={
                                                                article.urlToImage
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            </a>
                                        </div>
                                        <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
                                            <div className="flex items-center justify-between">
                                                <p className="text-gray-600 text-xs md:text-sm">
                                                    {article.source.name}
                                                    {article.author &&
                                                        ` | ${article.author}`}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </main>
            <footer className="bg-gray-800 py-4">
                <div className="container mx-auto text-center text-white">
                    <p>&copy; 2023 News Website. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

export default Home
