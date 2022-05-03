FROM node:18-alpine as builder

ARG REACT_APP_BACKEND=""
ENV REACT_APP_BACKEND $REACT_APP_BACKEND

WORKDIR /root/

COPY /frontend/package.json /root/
COPY /frontend/tsconfig.json /root/
COPY /frontend/yarn.lock /root/
RUN yarn install

COPY /frontend/src/ /root/src/
COPY /frontend/public/ /root/public/

RUN yarn build

FROM node:18-alpine

WORKDIR /root/
COPY --from=builder ./root/build/ /root/build/
COPY /backend/package.json /root/package.json
RUN yarn install

COPY /backend/ /root/

EXPOSE 8088

ENTRYPOINT ["npm", "start"]