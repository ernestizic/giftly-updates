import axios from 'axios'
import Loader from 'components/global/Loader';
import WishListCard from 'components/user/WishListCard';
import { setAlert } from 'features/alert/alertSlice'
import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { base_url } from "utils/utils";

const ArchiveWrapper = styled.div`
  padding: 48px 0;
`
const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 2fr));
  grid-gap: 48px;
  padding: 0 48px;
  
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    padding: 0 10px;
  }
`

const Archive = () => {
  const dispatch = useDispatch()
  const {token} = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false)
  const [archivedList, setArchivedList] = useState([])

  useEffect(()=> {
    fetchWishlist()
    // eslint-disable-next-line
  }, [])

  // Fetch wishlist and filter it to return only the ones with public visibility
  async function fetchWishlist() {
    setIsLoading(true)
    try {
      const res = await axios.get(`${base_url}/wishlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = res.data
      const list = data.data.data.filter((item)=> item.visibility === 'private')
      setArchivedList(list)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      dispatch(setAlert({
        type: 'error',
        message: error.response?.data.message || "Something went wrong"
      }))
    }
  }

  return (
    <ArchiveWrapper>
      {isLoading ? (
        <div className="flexRow justifyCenter">
          <Loader />
        </div>
      ) : (
        <List>
            {archivedList.map((data, idx) => (
              <WishListCard key={idx} details={data} getWishLists={fetchWishlist} />
            ))}
        </List>
      )}
      {archivedList.length < 1 && !isLoading && (
        <div className="flexRow justifyCenter">
          <p className='subtitle-4 colorTitleActive'>When you archive a wish, it would show up here!</p>
        </div>
      )}
    </ArchiveWrapper>
  )
}

export default Archive