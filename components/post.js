import React from 'react'
import Link from 'next/link'
// import Navbar from './Navbar'
import styled from 'styled-components'
import TimeAgo from 'timeago-react'
// import Loader from 'react-loaders'

// let Loading = <Loader type='line-scale-pulse-out' />

const Post = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`
const PostList = styled.li`
  text-align: left;
  text-decoration: none;
  border-bottom: 1px solid #ddd;
  padding: 20px 0;
`
const PostInfo = styled.ul`
  display: flex;
  width: 100%;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-item: center;
`
// const PostTitle = styled(Link)`
//   font-size: 1.2rem;
//   font-weight: 600;
// `
const PostInfoItem = styled.li`
  display: inline-flex;
  flex-basis: 33%;
  align-items: center;
  margin-top: 10px;
`
const AuthorImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 5px;
`
const Posts = ({ posts = [] }) => (
  <React.Fragment>
    <Post>
      {posts.length && posts.map((post, i) =>
        <PostList key={i}>
          <Link href={`/topic/${post.id}`}>
            <a>{ post.title }</a>
          </Link>
          <PostInfo>
            <PostInfoItem>
              <AuthorImg src={post.author.avatar_url} alt={post.author.loginname} />
              <span>{ post.author.loginname }</span>
            </PostInfoItem>

            <PostInfoItem>
              <Link href={`/topic/${post.id}#comment`} >{`${ post.reply_count}回复`}</Link>
            </PostInfoItem>
            <PostInfoItem>
              <TimeAgo datetime={post.create_at} locale='zh-CN' />
            </PostInfoItem>
          </PostInfo>
        </PostList>
      )}

      {/* { isFetching ? Loading : ''} */}
    </Post>
    {/* <Navbar /> */}
  </React.Fragment>
)

export default Posts
