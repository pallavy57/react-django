
import Header from "./header"
import Products from "./products"

export default function Layout() {
    return (
        <>
            <Header />
            <main>                
                <Products />
            </main>
            {/* <Footer /> */}
        </>
    )
}