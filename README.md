Nuxt 3 + Pinia Product Store

A small e-commerce style application built with Nuxt 3, Vue 3, TypeScript and Pinia.

The project is designed to practise state management with Pinia, API integration and shared state between different pages and components.

Features

Fetch products from the Fake Store API
Display a list of products
Add products to a shopping cart
Remove products from the cart
Clear the cart
Display the number of items in the cart
Calculate the total cart price
Handle loading and error states
Share cart state between pages using Pinia
Tech Stack
Nuxt 3
Vue 3
TypeScript
Pinia
SCSS / CSS
Fake Store API


Project Structure

components/
  ProductCard.vue
  CartItem.vue

pages/
  index.vue
  cart.vue

stores/
  products.ts
  cart.ts
Pinia Stores
Product Store

Responsible for:

Product state
Fetching products from the API
Loading state
Error handling
Product-related getters
Cart Store

Responsible for:

Cart items
Adding products
Removing products
Clearing the cart
Cart item count
Calculating the total price

This project was created to practise:

Creating Pinia stores with defineStore
Working with Pinia state
Creating getters
Creating synchronous and asynchronous actions
Using multiple stores
Using storeToRefs
Fetching API data in Nuxt
Sharing state between pages
Managing loading and error states
Understanding when global state management is useful

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
