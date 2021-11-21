const { client } = require("./src/utils/client");

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  const firstBatch = await client.client.request("GET", `/store/products`);
  const total = firstBatch.count;
  let products = firstBatch.products;

  while (products.length < total) {
    const batch = await client.client.request(
      "GET",
      `/store/products?offset=${products.length}`
    );
    products = products.concat(batch.products);
  }

  for (const product of products) {
    createNode({
      ...product,
      children: [],
      internal: {
        type: "MedusaProduct",
        contentDigest: createContentDigest(product),
      },
    });
  }

  const { regions } = await client.regions.list();

  for (const region of regions) {
    createNode({
      ...region,
      children: [],
      internal: {
        type: "MedusaRegion",
        contentDigest: createContentDigest(region),
      },
    });
  }
};

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allMedusaProduct {
        edges {
          node {
            handle
          }
        }
      }
      allMedusaRegion {
        edges {
          node {
            id
            countries {
              iso_2
            }
          }
        }
      }
    }
  `);

  const [first] = data.allMedusaRegion.edges;

  data.allMedusaProduct.edges.forEach((edge) => {
    const handle = edge.node.handle;
    if (handle) {
      actions.createPage({
        path: handle,
        component: require.resolve(`./src/templates/product-page.js`),
        context: {
          handle: handle,
          region_id: first.node.id,
          country: first.node.countries[0].iso_2,
        },
      });

      data.allMedusaRegion.edges.forEach((edge) => {
        const { id: regionId, countries } = edge.node;

        for (const { iso_2 } of countries) {
          actions.createPage({
            path: `/${iso_2}/${handle}`,
            component: require.resolve(`./src/templates/product-page.js`),
            context: {
              handle,
              region_id: regionId,
              country: iso_2,
            },
          });
        }
      });
    }
  });
};
