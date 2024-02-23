import React, { useEffect, useState } from 'react';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import { loadAllPosts } from '../services/post-service';
import { BASE_URL } from '../services/constants';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import ScrollToTop from "react-scroll-to-top";

function Feed() {
    const [postContent, setPostContent] = useState({
        content: [],
        totalPages: '',
        totalElements: '',
        pageSize: '',
        lastPage: false,
        pageNumber: ''

    })
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        changePage(page)
    }, [page]);

    const changePage = (pageNumber = 0, pageSize = 5) => {
        if (pageNumber > postContent.pageNumber && postContent.lastPage) {
            return
        }
        if (pageNumber < postContent.pageNumber && postContent.pageNumber === 0) {
            return
        }
        loadAllPosts(pageNumber, pageSize).then(data => {
            setPostContent({
                content: [...postContent.content, ...data.content],
                totalPages: data.totalPages,
                totalElements: data.totalElements,
                pageSize: data.pageSize,
                lastPage: data.lastPage,
                pageNumber: data.pageNumber
            })
            setLoading(false);
            //console.log(data);

        }).catch(error => {
            console.log(error)
            setLoading(false);

        })
    }

    const printDate = (num) => {
        return new Date(num).toLocaleString()
    }

    const handleComments = (id) => {
        navigate(`/dashboard/showPost/${id}`);
    }

    const changePageInfinite = () => {
        // console.log("Page changed")
        setPage(page + 1)
    }

    return (
        <div>
            <ResponsiveAppBar />
            <div className='posts_heading'>Feed</div>
            <div className='post_container'>
                {loading ? (
                    <div>
                        <h1>Loading...</h1>
                    </div>
                ) : postContent?.totalElements > 0 ? (
                    <InfiniteScroll
                        dataLength={postContent.content.length}
                        next={changePageInfinite}
                        hasMore={!postContent.lastPage}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        {postContent.content.map((post) => (
                            <div key={post.postId} className='post_card'>
                                <div className='post_img'>
                                    <img src={BASE_URL + '/api/post/image/' + post.imageName} alt='Blog' />
                                </div>
                                <div className='post_title'>
                                    <h2>{post.title}</h2>
                                </div>
                                <div className='post_content'>
                                    <p>{post.content}</p>
                                </div>
                                <div className='post_user'>
                                    <p>Posted By : <b>{post.user?.name}</b></p>
                                </div>
                                <div className='post_date'>
                                    <p>{printDate(post.addedDate)}</p>
                                </div>

                                <div className='comments_container'>
                                    <div className='comments_button' onClick={() => handleComments(post.postId)}>Show Comments ({post.comments.length})</div>
                                </div>
                            </div>
                        ))}
                    </InfiniteScroll>
                ) : (
                    <div>
                        <h1>No posts available</h1>
                    </div>
                )}
            </div>
            <ScrollToTop smooth />
        </div>
    );
}

export default Feed;
