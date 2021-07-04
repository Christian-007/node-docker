FROM node:15
WORKDIR /app
COPY package.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
  then npm install; \
  else npm install --only=production; \
  fi

COPY . ./

# Default values (if no env for "PORT" gets passed)
ENV PORT 3000

# For documentation purposes
EXPOSE $PORT

CMD ["node", "index.js"]