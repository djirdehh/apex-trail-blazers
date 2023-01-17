import { gql, useShopQuery, CacheLong, BuyNowButton } from "@shopify/hydrogen";

interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: {
    nodes: {
      id: string;
      width: number;
      height: number;
      url: string;
    }[];
  };
}

export default function Home() {
  const {
    data: { product },
  } = useShopQuery<Product>({
    query: QUERY,
    cache: CacheLong(),
  });

  const { description, images, variants } = product;
  const productImage = images.nodes[0].url;
  const productVariantId = variants.nodes[0].id;

  return (
    <div className="bg-black h-screen">
      <div className="h-full container mx-auto content-center grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col justify-center text-white text-center md:text-left">
          <h1 className="font-serif tracking-tight font-bold text-4xl md:text-5xl lg:text-6xl">
            Set Your Style on <span className="text-orange">Fire</span> with the{" "}
            <span className="text-orange">Apex Trail Blazers</span>
          </h1>
          <p className="font-mono tracking-tight mt-6 leading-8 text-md md:text-lg lg:text-xl">
            {description}
          </p>
          <div className="mt-6">
            <BuyNowButton
              quantity={1}
              variantId={productVariantId}
              className="px-3 py-2 mb-5 md:mb-0 font-mono tracking-tighter font-semibold bg-orange text-white rounded-lg shadow-sm text-sm md:text-md lg:text-lg"
            >
              Buy Now
            </BuyNowButton>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="m-auto">
            <img
              className="h-80 md:h-96 lg:h-[32rem] xl:h-[42rem]"
              src={productImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const QUERY = gql`
  query Product {
    product(id: "gid://shopify/Product/8094887018782") {
      id
      title
      handle
      description
      images(first: 1) {
        nodes {
          id
          width
          height
          url
        }
      }
      variants(first: 1) {
        nodes {
          id
        }
      }
    }
  }
`;
