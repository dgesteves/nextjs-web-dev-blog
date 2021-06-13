import Head from 'next/head'

import AllPosts from '../../components/posts/all-posts'
import { getAllPosts } from '../../lib/posts-util'

function AllPostsPage({ posts }) {
  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta
          name='description'
          content='A list of all posts and programing-related tutorials'
        />
      </Head>
      <AllPosts posts={posts} />
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      posts: getAllPosts(),
    },
  }
}

export default AllPostsPage
