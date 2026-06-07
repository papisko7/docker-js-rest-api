FROM mongo:7.0

RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8000

RUN echo '#!/bin/bash\n\
docker-entrypoint.sh mongod --fork --logpath /data/db/mongod.log --bind_ip_all\n\
echo "I am waiting 3 seconds for MongoDB to run..."\n\
sleep 3\n\
exec node app.js\n\
' > /app/start.sh && chmod +x /app/start.sh

ENTRYPOINT []
CMD ["/app/start.sh"]