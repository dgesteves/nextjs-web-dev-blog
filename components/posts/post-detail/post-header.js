import Image from 'next/image'

import styles from './post-header.module.css'

function PostHeader({ title, image }) {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      <Image src={image} width={200} height={150} />
    </header>
  )
}

export default PostHeader
