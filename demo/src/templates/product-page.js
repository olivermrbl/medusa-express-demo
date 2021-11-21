import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import { OrderProvider } from "../context/order-context";

const ProductPage = ({ data, pageContext }) => {
  const product = data.medusaProduct;

  const regions = data.allMedusaRegion.edges.map(({ node }) => {
    return node;
  });

  return (
    <OrderProvider>
      <Layout
        product={product}
        regions={regions}
        country={pageContext.country}
        regionId={pageContext.region_id}
      />
    </OrderProvider>
  );
};

export const query = graphql`
  query ($handle: String!) {
    medusaProduct(handle: { eq: $handle }) {
      id
      description
      discountable
      handle
      is_giftcard
      options {
        created_at
        id
        product_id
        title
        updated_at
        values {
          created_at
          id
          option_id
          updated_at
          value
          variant_id
        }
      }
      profile_id
      status
      thumbnail
      title
      updated_at
      variants {
        allow_backorder
        created_at
        id
        inventory_quantity
        manage_inventory
        prices {
          amount
          created_at
          currency_code
          id
          updated_at
          variant_id
        }
        # options {
        #   id
        #   option_id
        #   value
        # }
        product_id
        title
        updated_at
      }
    }

    allMedusaRegion {
      edges {
        node {
          id
          name
          tax_rate
          currency_code
          countries {
            display_name
            iso_2
          }
        }
      }
    }
  }
`;

export default ProductPage;
