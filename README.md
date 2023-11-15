# Docs

- Website: https://zod.dev/
- Primitives: https://zod.dev/?id=primitives

## Types Learned

```ts
z.string()
z.number()
z.null()
// Making anything optional
z.string().datetime().optional(),
```

## Initial Setup

```bash
npm install zod
npm i -D typescript ts-node ts-node-dev
npx tsc --init

npm start
```