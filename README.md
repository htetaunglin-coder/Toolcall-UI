# Next.js App Deployment (Docker)

### Prerequisites

Before deploying, ensure you have the following ready:

- Docker installed and running (Docker Engine 20.10+ recommended)
- Environment variables prepared:

```bash
GITHUB_TOKEN=
```

## Steps to Deploy

1. **Clone the repository (if not already done):**

   ```
   git clone https://github.com/mijn-ui/mijn-ui-docs
   cd mijn-ui-docs
   ```

2. **Create a** `**.env**` **file** in the project root:

   ```
   touch .env
   ```

   Then fill it with the required environment variables:

   ```
   GITHUB_TOKEN=your-token
   ```

3. **Build the Docker image:**

   ```
   docker build -t my-nextjs-app .
   ```

4. **Run the Docker container:**

   ```
   docker run -p 3000:3000 --env-file .env my-nextjs-app
   ```

5. **Access the app:** Open [http://localhost:3000](http://localhost:3000) in your browser.
