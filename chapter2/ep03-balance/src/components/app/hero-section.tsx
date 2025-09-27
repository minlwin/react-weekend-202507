'use client'

import Autoplay from "embla-carousel-autoplay"
import { Flag, Lightbulb, Pencil } from "lucide-react"
import { useRef } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"

export default function HeroSection() {

    const plugin = useRef(Autoplay({delay: 3000}))

    return (
      <section className="px-16 bg-gray-300 h-[480px]">
        <Carousel plugins={[plugin.current]} className="h-full Carousel">
          <CarouselContent>
              {HeroData.map((data, index) => 
                <CarouselItem key={index}>
                  <HeroItem title={data.title} 
                    description={data.description} 
                    icon={data.icon} />
                </CarouselItem>
              )}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    )
    
}

const HeroData:HeroItemProps[] = [
  {
    title: "Log It, Don't Lose It.", 
    description : "Effortlessly record every daily income and expense in seconds. Your financial control starts with a tap.",
    icon: <Pencil size={160} />
  },
  {
    title: "Financial Clarity, On Demand.", 
    description : "Instantly generate detailed daily, monthly, and yearly balance reports to see the full, unfiltered picture of your cash flow.",
    icon: <Lightbulb size={160} />
  },
  {
    title: "Master Your Money Momentum.", 
    description : "Stop guessing and start strategizing. Use real-time data to optimize your spending and achieve your long-term financial goals faster.",
    icon: <Flag size={160} />
  },
]

type HeroItemProps = {
  title: string 
  description : string 
  icon : React.ReactNode
}

function HeroItem({title, description, icon} : HeroItemProps) {
  return (
    <section className="flex items-center gap-8 h-full">
      <div className="flex-1 flex justify-end">
        {icon}
      </div>
      
      <div className="flex-3">
        <h1 className="text-4xl mb-3">{title}</h1>
        <div className="w-3/4">
          <p className="text-xl">{description}</p>
        </div>
      </div>
    </section>
  )
}