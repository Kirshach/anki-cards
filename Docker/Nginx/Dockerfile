FROM nginx:1.25.3

COPY ./Docker/Nginx/nginx.conf /etc/nginx/conf.d/nginx.conf
RUN chmod +x /entrypoint.sh

COPY .env .env

# get value from .env and setup for variable
ENV BACKEND_HOST="$(grep BACKEND_HOST .env | cut -d '=' -f 2)"
ENV BACKEND_PORT="$(grep BACKEND_PORT .env | cut -d '=' -f 2)"

EXPOSE 80 443
ENTRYPOINT ["/entrypoint.sh"]
