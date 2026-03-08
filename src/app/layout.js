import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./resource/styles/reset.css";
import "./resource/styles/global.scss";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const montserrat = Montserrat({
	subsets: ['latin'],
	variable: '--font-montserrat',
	display: 'swap',
});


export const metadata = {
	title: 'Manoj Thapa — Front-End Developer & UI/UX Designer',
	description: 'Building modern websites with clean design and seamless user experiences.',
};
export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable}`}>
				{children}
				<Toaster
					position="top-center"
					reverseOrder={false}
					gutter={12}
					containerClassName="toast_container"
					containerStyle={{}}
					toastOptions={{
						duration: 2500,
						style: {
							background: '#F2F6F9',
							color: '#212B40',
							fontWeight: '500',
							zIndex: 9
						}
					}}
				/>
			</body>
		</html>
	);
}
