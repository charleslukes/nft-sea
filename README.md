## Getting Started

- clone the project
- create an alchemy key see [here](https://dashboard.alchemy.com/) 
- create a .env.local file and add you key like so: ```ALCHEMY_KEY=xxxxxxx```
- yarn install 
- run on dev mode 

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### Struggles
- Opensea testnet api don't work on the browser (as at this time). Spent a lot of time trying to figure why its so, had to revert to alchemy. 

### Improvements that could be done
- Implement pagination
- Show an overlay loader anytime new nfts of a given address are being fetched 