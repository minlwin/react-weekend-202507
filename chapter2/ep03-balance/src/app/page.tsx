import AnonymousMenu from "@/components/app/anonymous-menu";
import HeroSection from "@/components/app/hero-section";

export default function Home() {

  return (
    <>
      <HeroSection />

      <div>
        <div className="sticky top-0 bg-white z-10">
          <AnonymousMenu />
        </div>

        <div id="aboutUs" className="h-screen bg-teal-500">
          <h1>About Us</h1>
        </div>

        <div id="pricing" className="h-screen bg-blue-500">
          <h1>Pricing</h1>
        </div>
      </div>
    </>
  )
}
