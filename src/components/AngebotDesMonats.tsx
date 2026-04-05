import { getProductOfTheMonth } from '@/globals/product-of-the-month/queries'
import AngebotModal from '@/components/modale/AngebotModal'

export default async function AngebotDesMonats() {
  const productOfTheMonth = await getProductOfTheMonth()

  // Handle image
  let productImage: string | null = null

  if (productOfTheMonth?.image) {
    if (typeof productOfTheMonth.image === 'string') {
      productImage = `/media/flensburger-dunkel.webp` // Fallback
    } else {
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
    <div id="Angebot_des_Monats" className="w-full py-8">
      <AngebotModal productOfTheMonth={productOfTheMonth} productImage={productImage} />
    </div>
  )
}
