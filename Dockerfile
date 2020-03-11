FROM node:12

ARG username=default

RUN groupadd -g 999 $username && useradd -r -u 999 -g $username $username

USER $username

WORKDIR /opt/app

EXPOSE 80

CMD [ "sh" ]
