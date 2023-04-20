import React from 'react';
import './index.css'
import { useSelector, useDispatch } from "react-redux";
import {addNews } from './../../actions/newsAction'

function News() {
  const navItems = ['Top News', 'Categories', 'Search']
  let {news} = useSelector((state:any) => state);
  const [showSearch, setShowSearch] = React.useState(false)
  const [languageCode, setLanguageCode] = React.useState('us')
  const [viewMode, setViewMode] = React.useState(false)
  const [newsData, setNewsData] = React.useState([])
  const dispatch = useDispatch();

  const fetchNewsData = async (languageCode:string)=>{
          const data =  await fetch(`https://newsapi.org/v2/top-headlines?country=${languageCode}&apiKey=f23e6fdc0abf4b99b63aabbf927c8f88`).then((response) => response.json());
          dispatch(addNews(data.articles))
  }

  const enableSearch =()=>{
      setShowSearch(!showSearch)
  }

  const searchItems= (searchValue:string)=>{
      const filteredData = news.filter((item:object) => {
          return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
      })
      setNewsData(filteredData)
  }

  const changelanguage = (language:string)=>{
    setLanguageCode(language)
  }

  const viewItem = (viewItem:any)=>{
    const itemToView = newsData[viewItem]
    setNewsData([itemToView])
    setViewMode(true)
  }

  const backToList = ()=>{
    setViewMode(false)
    setNewsData(news)
  }

  React.useEffect(()=>{
    setNewsData(news)
  },[news])

  React.useEffect(()=>{
      fetchNewsData(languageCode)
  },[languageCode])

  return (
    <div className='news-wrappper'>
        <div className='news'>
            <div className='nav'>
            <div className='nav-wrappper'>
        {
            navItems.map((item, index)=>{
                return <div className='nav-item' onClick={()=>enableSearch()} key={index}>{item}</div>
            })
        }
        <div className='language-switcher'>
            <div className='language' onClick={()=> changelanguage('gb')}>
                GB
            </div>
            <div className='language' onClick={()=> changelanguage('us')}>
                US
            </div>
        </div>
    </div>
    {
        showSearch ?
        <div className="search-input">
        <input type="text" onChange={(e) => searchItems(e.target.value)}/>
        </div>:""
    }
            </div>
            <div className='title'> 
            {
              showSearch ? <>Search top news by Great Britian by term</> : <>Top news from great britian</>
            }
            </div>
            <div className='news-card'>
            {
             newsData && newsData.map((item:any, index:number)=> {
              return (
                <div className={`${viewMode ? "news-card-wrapper-view" : "news-card-wrapper"}`} key={index} onClick={() => viewItem(index)}>
                  <p>
                  {item.title}
                  </p>
                  <img className={`${viewMode ? "news-card-image-view" : "news-card-image"}`} src={item.urlToImage}/>
                  <p>
                  {item.description}
                  </p>
                </div>
              )
            })
          }
        </div>
        <div onClick={()=>backToList()}>Back to list</div>
          </div>
    </div>
  );
}

export default News;
