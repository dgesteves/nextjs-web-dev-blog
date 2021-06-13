import Head from 'next/head'

import PostContent from '../../components/posts/post-detail/post-content'
import { getPostData, getPostsFiles } from '../../lib/posts-util'

function PostDetailPage({ post }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name='description' content={post.excerpt} />
      </Head>
      <PostContent post={post} />
    </>
  )
}

export async function getStaticProps({ params }) {
  return {
    props: {
      post: getPostData(params.slug),
    },
    revalidate: 600,
  }
}

export async function getStaticPaths() {
  const paths = getPostsFiles().map(fileName => ({
    params: { slug: fileName.replace(/\.md$/, '') },
  }))

  return {
    paths,
    fallback: false,
  }
}

export default PostDetailPage
