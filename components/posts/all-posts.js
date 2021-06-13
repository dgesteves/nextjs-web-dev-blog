import styles from './all-posts.module.css'
import PostsGrid from './posts-grid'

function AllPosts({ posts }) {
  return (
    <section className={styles.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={posts} />
    </section>
  )
}

export default AllPosts
