import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Loader from 'components/global/Loader';
import WishListCard from 'components/user/WishListCard';
import EmptyArchive from "../assets/images/personal-files.svg"
import { NoLists } from 'components/user/WishListsStyles';
import { setAlert } from 'features/alert/alertSlice'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { base_url } from "utils/utils";

const ArchiveWrapper = styled.div`
  padding: 48px 0;

  @media screen and (max-width: 768px) {
    padding: 100px 0;
  }
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
              <WishListCard key={idx} details={data} getWishLists={fetchWishlist} archive/>
            ))}
        </List>
      )}
      {archivedList.length < 1 && !isLoading && (
        <NoLists>
          <img src={EmptyArchive} alt="archive" width='90%' height='auto' />
          <h2 className='header-text bold'>Your wish list archive is empty</h2>
          <p>Preserve your dreams - Archive your wish list for safekeeping and future reference.</p>
        </NoLists>
      )}
    </ArchiveWrapper>
  )
}

export default Archive