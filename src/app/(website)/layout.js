import Footer from "../resource/component/common/footer";
import Header from "../resource/component/common/header";

export default function RootLayout({ children }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}
