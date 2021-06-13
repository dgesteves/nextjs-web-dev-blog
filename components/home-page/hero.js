import Image from 'next/image'

import styles from './hero.module.css'

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.image}>
        <Image
          src='/images/site/diogo.jpeg'
          alt='An Image showing Diogo'
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm Diogo</h1>
      <p>
        I blog about web development - especially frontend frameworks like React
        or Angular
      </p>
    </section>
  )
}

export default Hero
