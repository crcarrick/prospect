FROM python:3.13-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    ffmpeg \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

RUN curl -sSf https://pixi.sh/install.sh | bash -s -- --yes

ENV PATH="/root/.pixi/bin:$PATH"

WORKDIR /

COPY pixi.toml pixi.lock ./
COPY . .

RUN pixi install

EXPOSE 8000

CMD ["pixi", "run", "dev"]