FROM node:17-alpine 

WORKDIR /app

RUN mkdir -p build

COPY build/ build/

EXPOSE 3000

RUN npm install -g serve

CMD ["serve", "-s","build"]