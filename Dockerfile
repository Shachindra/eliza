# Using Ubuntu as Base Image
FROM ubuntu:22.04 AS builder

# Install Node.js and other dependencies
RUN apt-get update && \
    apt-get install -y curl git python3 make g++ \
    sqlite3 libsqlite3-dev \
    ffmpeg libavcodec-extra \
    ca-certificates && \
    curl -fsSL https://deb.nodesource.com/setup_23.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g pnpm@9.15.1 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set Python 3 as default
RUN ln -s /usr/bin/python3 /usr/bin/python

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc turbo.json ./

# Copy source code
COPY agent ./agent
COPY packages ./packages
COPY scripts ./scripts
COPY characters ./characters

# Install and build
RUN pnpm install \
    && pnpm build-docker \
    && pnpm prune --prod

# Create a new stage for the final production image
FROM ubuntu:22.04

# Install runtime dependencies
RUN apt-get update && \
    apt-get install -y curl git python3 make g++ ca-certificates \
    sqlite3 libsqlite3-dev \
    ffmpeg libavcodec-extra && \
    curl -fsSL https://deb.nodesource.com/setup_23.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g pnpm@9.15.1 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set Python 3 as default
RUN ln -s /usr/bin/python3 /usr/bin/python

WORKDIR /app
COPY --from=builder /app .

# Set the command to run the application
CMD ["pnpm", "start"]
