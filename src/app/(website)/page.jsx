import HomePageContent from '@/app/resource/component/home'
import React from 'react'
import AboutMe from '../resource/component/about'
import WorkPage from '../resource/component/project'
import ServicesPage from '../resource/component/service'
import ContactPage from '../resource/component/contact'
import ResumePage from '../resource/component/resume'

const page = () => {
	return (
		<>
			<HomePageContent />
			<AboutMe />
			<WorkPage />
			<ServicesPage />
			<ContactPage />
			<ResumePage />
		</>
	)
}

export default page