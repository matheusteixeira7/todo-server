FROM node:14.17.0-slim

RUN apt update && apt install -y wget netcat git

RUN wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && \
    chmod +x /usr/bin/wait-for

USER node

WORKDIR /usr/app

CMD [ "/usr/app/start.sh" ]
