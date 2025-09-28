import { FC, memo } from "react"
import { Card, CardContent, CardHeader, VariantProps, tv } from "@mijn-ui/react"
import { z } from "zod"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel"
import StatusView from "../status-view"

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().nonnegative().optional(),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
  stock: z.number().int().nonnegative().optional(),
})

export const productViewSchema = z.object({
  products: z.array(productSchema),
})

export type Product = z.infer<typeof productSchema>
export type ProductViewProps = z.infer<typeof productViewSchema>

/* -------------------------------------------------------------------------- */

const PureProductView = ({ products }: ProductViewProps) => {
  if (!products || products.length === 0) {
    return <StatusView status="error" title="No products found" />
  }

  if (products.length === 1) {
    return (
      <div className="my-4 flex flex-row">
        <ProductCard product={products[0]} layout="single" />
      </div>
    )
  }

  return (
    <Carousel className="w-[90%] md:w-[95%]">
      <CarouselContent>
        {products.map((product, index) => (
          <CarouselItem key={`${product.id}-item-${index}`} className="basis-3/4 sm:basis-1/2 lg:basis-1/3">
            <div className="size-full p-1">
              <ProductCard product={product} layout="multiple" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {products.length > 2 && (
        <>
          <CarouselPrevious className="hidden sm:inline-flex" />
          <CarouselNext className="hidden sm:inline-flex" />
        </>
      )}
    </Carousel>
  )
}

const ProductView = memo(PureProductView)

export default ProductView

/* -------------------------------------------------------------------------- */

const productCardVariants = tv({
  slots: {
    card: "flex overflow-hidden border border-border bg-transparent shadow-none transition hover:shadow-sm",
    header: "relative w-full p-0",
    content: "flex flex-col items-start",
    title: "mb-1 font-semibold leading-5 tracking-tight line-clamp-2",
    price: "font-semibold",
    image: "size-full object-cover",
  },
  variants: {
    layout: {
      multiple: {
        card: "h-full flex-col",
        header: "mb-4 aspect-square",
        content: "size-full flex-1 justify-between",
        title: "text-base",
        price: "text-xl",
        image: "absolute",
      },

      single: {
        card: "flex-1 flex-col p-0 sm:flex-row",
        header: "mb-0 aspect-square sm:w-1/3",
        content: "h-full flex-1 p-6",
        title: "text-lg sm:text-xl",
        price: "text-xl sm:text-2xl",
        image: "absolute inset-0",
      },
    },
  },
})

type TooltipVariants = VariantProps<typeof productCardVariants>

const ProductCard: FC<{ product: Product; layout: TooltipVariants["layout"] }> = ({ product, layout }) => {
  const { card, header, content, title, price, image } = productCardVariants({ layout })

  return (
    <Card
      className={card()}
      aria-label={`${product.name}, ${product.price}, ${product.stock || "unknown"} units in stock`}>
      <CardHeader className={header()}>
        {product.imageUrl && (
          // eslint-disable-next-line
          <img src={product.imageUrl} alt={product.name} width={80} height={80} loading="lazy" className={image()} />
        )}
      </CardHeader>
      <CardContent className={content()}>
        <h3 className={title()}>{product.name}</h3>
        <p className="line-clamp-2 w-full flex-1 text-sm">{product.description}</p>
        <div className="flex w-full items-center justify-between">
          {product.price && <p className={price()}>${product.price.toFixed(2)}</p>}
          {product.stock !== undefined && <p className="text-sm text-secondary-foreground">{product.stock} units</p>}
        </div>
        {/* 
          // The details section is currently commented out as this is the MVP stage.
          // Uncomment and implement the functionality when ready to display product details.
          
          <button className="text-sm text-primary-emphasis underline" onClick={() => alert("Show details")}>
            Details
          </button>
          */}
      </CardContent>
    </Card>
  )
}
