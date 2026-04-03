import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { getProductOfTheMonth } from '@/globals/product-of-the-month/queries'

export default async function ProductOfTheMonth() {
  const productOfTheMonth = await getProductOfTheMonth()

  // Handle both string ID and media object for image
  let productImage: string | null = null

  if (productOfTheMonth?.image) {
    if (typeof productOfTheMonth.image === 'string') {
      // If image is just an ID string, construct a generic media URL
      productImage = `/media/flensburger-dunkel.webp` // Fallback to known file
    } else {
      // If image is a media object, use url or construct from filename
      productImage =
        productOfTheMonth.image.url ||
        (productOfTheMonth.image.filename ? `/media/${productOfTheMonth.image.filename}` : null)
    }
  }

  // Don't render if not active or no image
  if (!productOfTheMonth?.isActive || !productImage) {
    return null
  }

  return (
    <>
      {/* Product of the Month Section */}
      <div className="absolute top-[60vh] md:top-[60vh] lg:top-48 lg:left-12 -rotate-20 max-w-2xl lg:mt-12 lg:w-full lg:max-w-4xl z-10">
        <div className="relative md:overflow-hidden rounded-2xl bg-linear-to-br from-lime-300/10 to-lime-500/70 lg:from-lime-300 lg:to-lime-500/70 lg:bg-linear-to-b backdrop-blur-sm border border-amber-500/20 p-8 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Image Section */}
            <div className="relative h-32 w-[30vw] md:h-80 md:w-[20vw] lg:w-[20vw] rounded-xl overflow-hidden group">
              <Image
                src={productImage}
                alt={productOfTheMonth.title || 'Product of the Month'}
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-150"
              />
              {productOfTheMonth.badge && (
                <div className="absolute top-0 lg:top-4">
                  <Badge className="bg-red-600 text-white px-1 text-[0.5rem] lg:text-xl font-bold">
                    {productOfTheMonth.badge}
                  </Badge>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="space-y-4 text-left">
              <div className="space-y-2">
                {productOfTheMonth.subtitle && (
                  <p className=" text-yellow-600 text-[5vw] leading-10 headingA md:text-[4vw] font-bold uppercase lg:text-[3.66rem] lg:leading-12  tracking-wider">
                    {productOfTheMonth.subtitle}
                  </p>
                )}
                <h3 className="font-sans uppercase text-[4vw] md:text-[2vw] lg:text-[2.5rem] font-black text-white">
                  {productOfTheMonth.title}
                </h3>
              </div>

              {productOfTheMonth.description && (
                <p className="font-sans text-amber-50 text-xl  lg:text-3xl ">
                  {productOfTheMonth.description}
                </p>
              )}

              {productOfTheMonth.price && (
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-sans text-amber-400 lg:text-3xl">
                    {productOfTheMonth.price}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
