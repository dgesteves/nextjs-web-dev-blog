import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import tomorrow from 'react-syntax-highlighter/dist/cjs/styles/prism/tomorrow'
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'

import PostHeader from './post-header'

import styles from './post-content.module.css'

SyntaxHighlighter.registerLanguage('js', js)

function PostContent({ post }) {
  const imagePath = `/images/posts/${post.slug}/${post.image}`

  const customRenderers = {
    p({ node, children }) {
      if (node.children[0].tagName === 'img') {
        const image = node.children[0]

        return (
          <div className={styles.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.alt}
              width={600}
              height={300}
            />
          </div>
        )
      }
      return <p>{children}</p>
    },

    code({ className, children }) {
      const language = className.split('-')[1] // className is something like language-js => We need the "js" part here

      return (
        <SyntaxHighlighter
          style={tomorrow}
          language={language}
          children={children}
        />
      )
    },
  }

  return (
    <article className={styles.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
    </article>
  )
}

export default PostContent
