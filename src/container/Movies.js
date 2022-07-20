import React, { useState, useEffect } from 'react'
import axios from 'axios'
import cogoToast from 'cogo-toast'
import { DebounceInput } from 'react-debounce-input'
import '../App.css'
import Nav from '../components/nav'

const Movies = () => {
  const [movies, setMovies] = useState([])
  const [series, setSeries] = useState([])

  const handleSearch = (event) => {
    const value = event.target.value
    if (value === '') {
      handleMovies()
      handleSeries()
    } else {
      handleSearchedMovie(value)
      handleSearchedSeries(value)
    }
  }

  const handleSearchedMovie = (search) => {
    axios
      .get(`https://www.omdbapi.com/?s=${search}&type=movie&apikey=549ec055`)
      .then((response) => {
        if (response.data.Error) {
          setMovies([])
          cogoToast.error(response.data.Error)
        } else {
          setMovies(response.data.Search)
        }
      })
      .catch((error) => {})
  }

  const handleSearchedSeries = (search) => {
    axios
      .get(`https://www.omdbapi.com/?s=${search}&type=series&apikey=549ec055`)
      .then((response) => {
        if (response.data.Error) {
          setSeries([])
        } else {
          setSeries(response.data.Search)
        }
      })
      .catch((error) => {})
  }

  const handleMovies = () => {
    axios
      .get('https://www.omdbapi.com/?s=all&type=movie&apikey=549ec055')
      .then((response) => {
        setMovies(response.data.Search)
      })
      .catch((error) => {})
  }

  const handleSeries = () => {
    axios
      .get('https://www.omdbapi.com/?s=all&type=series&apikey=549ec055')
      .then((response) => {
        setSeries(response.data.Search)
      })
      .catch((error) => {})
  }
  useEffect(() => {
    handleMovies()
    handleSeries()
  }, [])

  return (
    <div className="w-full">
      <div>
        {' '}
        {/* NAV SECTION */}
        <div>
          {' '}
          <Nav />
        </div>
        {/* HEADER SECTION */}
        <div
          className={`w-full h-[257px] md:h-[550px] lg:h-[550px] header_container lg:block flex items-center justify-center`}
        >
          <p className="font-dmsans-bold tracking-tighter text-center w-[273px] lg:text-start text-white text-[28px] md:text-7xl lg:text-7xl md:w-[490px] lg:w-[490px] lg:block lg:pt-[109px] lg:pl-[77px] leading-0 md:leading-[94px] lg:leading-[94px]">
            Watch something incredible.
          </p>
        </div>
        {/* SEARCH SECTION */}
        <div className="mt-[56px] ml-[28px] mr-[27px] mb-[33px] md:mt-[63px] md:ml-[77px] md:mr-[57px] md:mb-[48px] lg:mt-[63px] lg:ml-[77px] lg:mr-[57px] lg:mb-[48px]">
          <p className="text-base md:text-2xl lg:text-2xl font-dmsans-regular font-normal">
            Search
          </p>
          <form>
            <DebounceInput
              debounceTimeout={500}
              className={`border w-full h-[34px] md:h-[54px] lg:h-[54px] mt-1 outline-0 p-2 input`}
              onChange={handleSearch}
            />
          </form>
        </div>
        {/* MOVIE SECTION */}
        <div className="w-full">
          {/* MOVIE CATEGORY ONE SECTION */}
          <div className="md:mt-[18px] lg:mt-[18px] md:mb-[48px] lg:mb-[48px]">
            {' '}
            <p className="text-lg md:text-2xl lg:text-2xl lg:ml-[77px] md:ml-[77px] ml-[28px] font-dmsans-regular font-normal">
              Movies
            </p>
            <div
              className={`flex ml-[15px] md:ml-[59px] lg:ml-[59px] mt-[26px] md:mt-[18px] lg:mt-[18px] overflow-x-scroll container font-dmsans-regular font-normal`}
            >
              {movies.map((movies, index) => {
                return (
                  <div
                    key={index}
                    className="ml-[13px] min-w-[200px] h-[200px] md:min-w-[300px] md:h-[300px] lg:min-w-[300px] lg:h-[300px] rounded-[12px] p-[10px] bg-black flex items-center justify-center"
                  >
                    <p className="text-lg md:text-2xl lg:text-2xl text-white text-center">
                      {movies.Title}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* MOVIE CATEGORY TWO SECTION */}
          <div className="mt-[18px] mb-[48px]">
            {' '}
            <p className="text-lg md:text-2xl lg:text-2xl lg:ml-[77px] md:ml-[77px] ml-[28px] font-dmsans-regular font-normal">
              Series
            </p>
            <div
              className={`flex ml-[15px] md:ml-[59px] lg:ml-[59px] mt-[26px] md:mt-[18px] lg:mt-[18px] overflow-x-scroll container font-dmsans-regular font-normal`}
            >
              {series.map((series, index) => {
                return (
                  <div
                    key={index}
                    className="ml-[13px] min-w-[200px] h-[200px] md:min-w-[300px] md:h-[300px] lg:min-w-[300px] lg:h-[300px] rounded-[12px] p-[10px] bg-black flex items-center justify-center"
                  >
                    <p className="text-lg md:text-2xl lg:text-2xl text-white text-center">
                      {series.Title}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Movies
