import Footer from "../resource/component/common/footer";
import Header from "../resource/component/common/header";
import GridPulse from "../resource/component/floatingdots";

export default function RootLayout({ children }) {
    return (
        <>
            <GridPulse />
            <Header />
            {children}
            <Footer />
        </>
    );
}
