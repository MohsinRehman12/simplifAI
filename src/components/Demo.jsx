import { useState, useEffect } from 'react';
import { copy, linkIcon, loader, tick, loader_night } from '../assets';
import  { useLazyGetSummaryQuery } from '../services/article';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import {themeState} from '../services/atoms';

const Demo = () => {
  const [article, setArticle] = useState({
    url:'',summary:''
  });


  const [theme, setTheme] = useRecoilState(themeState);

  const [getSummary, {error, isFetching}] = useLazyGetSummaryQuery();
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");
  useEffect(() => {
    const savedArticles = JSON.parse(localStorage.getItem('articles'));
    if (savedArticles) {
      setAllArticles(savedArticles);
    }
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({articleUrl: article.url});

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [...allArticles, newArticle];
      setAllArticles(updatedAllArticles);
      setArticle(newArticle);
      localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
    }

  }

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() =>
      setCopied(false), 3000);
  }
  return (
    <section className="mt-16 w-full max-w-xl">
      {/*Search */}
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input 
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => setArticle({ ...
            article, url: e.target.value })}
            required
            className={theme === 'night' ? "url_input_night peer" : "url_input peer"}
          />
          <button
            type="submit"
            className="submit_btn"
            peer-focus:border-gray-700
            peer-focus:text-gray-700
          >
          </button>
        </form>

        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">

              {allArticles.map((article, index) => (
                <div
                key={`link-${index}`}
                onClick={() => setArticle(article)}
                className={ theme==='night' ? 'link_card_night' : 'link_card'}
                >

                  <div className={ theme==='night' ? 'copy_btn_night' : 'copy_btn'}
                  onClick={() => handleCopy(article.url)}
                  >
                    <img 
                    src={copied === article.url ? tick : copy}
                    alt= {theme==='night' ? 'copy_icon_night' : 'copy_icon'}
                    className='w-[40%] h-[40%] object-contain'
                    />
                  </div>
                  <p className=
                  {theme==='day' ? 'flex-1 font-satoshi text-blue-700 text-sm truncate' : 'flex-1 font-satoshi text-blue-100 text-sm truncate'}
                  >
                    {article.url}
                  </p>

                </div>
              ))}

        </div>
        
      </div>

      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={theme==='day' ? loader : loader_night} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (

          <p className= {theme=='day' ? "font-inter font-bold text-black text-center" : "font-inter font-bold text-white text-center"}>
            Error has occured, We Apologize for the issue
            <br />
            
            <span className={theme=='day' ? "font-satoshi font-normal text-gray-700" : "font-satoshi font-normal text-gray-400" }>
              {error?.data?.error}
            </span>

            </p>
          ) : (
            article.summary && (
              <div className="flex flex-col gap-3">
                <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                  Article <span className={theme==="day" ? "orange_gradient" : "blue_gradient"}>Summary</span>
                </h2>
                <div className="summary_box">
                  <p className={theme==='day' ? 'font-inter text-gray-700 text-sm' : 'font-inter text-gray-100 text-sm'}
                  >{article.summary}</p>
                </div>
              </div>

              
            )
          )}
      </div>
    </section>
  )
}

export default Demo