export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md">
                <img src="/images/logo-siska.png" alt="SISKA Icon" className="mr-3 h-8 w-8" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate text-xl leading-tight font-semibold">SISKA</span>
            </div>
        </>
    );
}
