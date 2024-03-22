import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { fetchImages } from 'API';
import { Searchbar } from '../Searchbar/Searchbar';
import { Gallery } from '../ImageGallery/ImageGallery';
import { Pagination } from '../LoadMore/LoadMore';
import { Wrapper } from '../App/App.styled'
import { Loader } from '../Loader/Loader'
import {notifyInfo, notifyInputQuerry, success} from '../Notify/notify'

const App = () => {
  const [state, setState] = useState({
    query: '',
    images: [],
    page: 1,
    loading: false,
  });

  const { query, images, page, loading } = state;

  const changeQuery = newQuery => {
    setState(prevState => ({
      ...prevState,
      query: `${Date.now()}/${newQuery}`,
      images: [],
      page: 1
    }));
  };

  useEffect(() => {
    const loadResult = async () => {
      try {
        setState(prevState => ({ ...prevState, loading: true }));
        const img = await fetchImages(query, page);
        if (img.length) {
          setState(prevState => ({
            ...prevState,
            images: page > 1 ? [...prevState.images, ...img] : img,
            loading: false
          }));
          success(query);
        } else {
          notifyInfo();
          setState(prevState => ({ ...prevState, loading: false }));
        }
      } catch (error) {
        console.log(error);
        setState(prevState => ({ ...prevState, loading: false }));
      }
    };

    loadResult();
  }, [query, page]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (evt.target.elements.query.value.trim() === '') {
      notifyInputQuerry();
      return;
    }
    changeQuery(evt.target.elements.query.value);
    evt.target.reset();
  };

  const handleLoadMore = () => {
    setState(prevState => ({
      ...prevState,
      page: prevState.page + 1,
    }));
  };

  return (
    <Wrapper>
      <Searchbar onSubmit={handleSubmit} />
      {loading && <Loader />}
      {images.length > 0 && <Gallery imgItems={images} />}
      {images.length > 0 && <Pagination onClick={handleLoadMore}>Load More</Pagination>}
      <Toaster position="top-right" reverseOrder={true}/>
    </Wrapper>
  )
};

export default App;
