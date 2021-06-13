import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDir = path.join(process.cwd(), 'posts')

export function getPostsFiles() {
  return fs.readdirSync(postsDir)
}

export function getPostData(postId) {
  const slug = postId.replace(/\.md$/, '')

  const filePath = path.join(postsDir, `${slug}.md`)

  const fileContent = fs.readFileSync(filePath, 'utf-8')

  const { data, content } = matter(fileContent)

  return {
    slug,
    ...data,
    content,
  }
}

export function getAllPosts() {
  const postFiles = getPostsFiles()

  const allPosts = postFiles.map(postFile => getPostData(postFile))

  return allPosts.sort((postA, postB) => (postA.date > postB.date ? -1 : 1))
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts()

  return allPosts.filter(post => post.isFeatured)
}
