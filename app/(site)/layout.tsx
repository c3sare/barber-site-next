import LayoutHeader from "./(frontend)/_header/LayoutHeader";
import LayoutFooter from "./(frontend)/_footer/LayoutFooter";

export default function RootSiteLayout({ children }: React.PropsWithChildren) {

    return (
        <>
            <LayoutHeader />
            <main className="w-full">{children}</main>
            <LayoutFooter />
        </>
    )
}