import React from 'react'
import styles from './about.module.scss'
import Image from 'next/image'

const AboutMe = () => {
    return (
        <div className='contain-fluid '>
            <div className={styles.about_wrap}>
                <div className={styles.about_left}>
                    <p className={styles.about_me}>
                        About Me
                    </p>
                    <p className={styles.about_text}> 
                        I am Manoj Thapa, a Computer Science graduate with a Bachelor of Science degree completed in 2023. I have a strong foundation in front-end development and user-focused digital solutions, along with experience in customer service and team-based project environments.

                        After graduating, I worked as a Customer Service Executive at 24/7.ai, where I developed strong communication skills, problem-solving abilities, and a customer-first mindset. From January 2025 to December 2025, I worked as a Junior Front-End Developer at CraftNotion Pvt. Ltd., contributing to the development of responsive and user-friendly web interfaces.

                        In my role as a front-end developer, I gained hands-on experience with design and prototyping tools such as Photoshop, Illustrator, and Figma, collaborating closely with designers and developers to translate concepts into functional interfaces. I have worked on projects including Korgee, Hack MACQS, and Ramanis Talkies, where teamwork, attention to detail, and clean UI implementation were key focuses.

                        I am passionate about creating intuitive digital experiences and continuously improving my technical and design skills. I am eager to contribute to innovative projects and grow as a front-end professional.
                    </p>
                </div>
                <div className={styles.about_image}>
                    <Image src="/images/manoj-image.png" alt="Manoj Thapa" fill sizes=''/>
                </div>
            </div>
        </div>
    )
}

export default AboutMe