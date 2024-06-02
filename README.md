<p align="center">
  Start Your New Adventure, Create Your Own Picture Books
</p>

## Getting Started

1. Install dependencies

   ```bash
   yarn
   ```

   Make sure your Node version is higher than 18.
   If not, please change version before installing:

   ```bash
   nvm use 18.17.0
   ```

2. Create `.env.local` file in the project root and add the following content.

   ```text
   POSTGRES_URL=postgres://postgres:postgres@localhost:5432/souley-hub
   AUTH_SECRET=<this can be any random string>
   IMGUR_CLIENT_ID=
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

   For `IMGUR_CLIENT_ID`, please follow the tutorial provided below to set it up.
   (Tutorial Link: https://stark920.github.io/2022/05/06/APIimgur/)

3. Start the database

   ```bash
   docker compose up -d
   ```

4. Run migrations. If any errors occur, please wait for 10 to 20 seconds and then retry using the following command

   ```bash
   yarn migrate
   ```

5. Start the development server

   ```bash
   yarn dev
   ```

6. Open http://localhost:3000 in your browser

7. Close the database when you finish your adventure

   ```bash
   docker compose down
   ```

## Reference Code:

- https://github.com/joschan21/canvas-drawing-app
