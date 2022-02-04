#build stage
#pull node image
FROM node:12.18.3 AS build-stage 
#working directory
WORKDIR /app
#add all files from local to docker
ADD . .
#install by node all dependancies
RUN npm install
#build by node  output dir -> docker/dist
RUN npm run build:prod
# ------ node install & build vuejs project


#production stage
#pull image nginx
FROM nginx as production
#copy from build output dir -> docker nginx dir
COPY --from=build-stage /app/dist  /usr/share/nginx/html
#copy from this project etc/nginx/conf -> docker nginx dir
COPY docker/etc/nginx/nginx.conf /etc/nginx/
#copy from this project etc/nginx/conf -> docker nginx dir
COPY docker/etc/nginx/conf.d     /etc/nginx/conf.d/
# Define mountable directories.
VOLUME ["/etc/nginx/sites-enabled", "/etc/nginx/certs", "/etc/nginx/conf.d", "/var/log/nginx", "/var/www/html"]

# Define working directory.
WORKDIR /etc/nginx

# Open HTTP port for nginx
EXPOSE 80
EXPOSE 18180
EXPOSE 443
#run nginx -g : global directice  daemon off : foreground
#-g global디렉티스설정	지정한 global디렉티브의 설정으로 nginx를 기동 (부하실험등...)
CMD ["nginx", "-g", "daemon off;"]


# docker command
# docker build -t ejr_frontend .
# docker push ejr_frontend
# docker pull ejr_frontend
# windows wsl
# docker run --name ejr_frontend -it -d -p 80:80 -p 443:443 -v /mnt/c/logs:/var/log/nginx --memory="1g"  ejr_frontend
#   linux
# docker run --name ejr_frontend -it -d -p 80:80 -p 443:443 -v /var/log/nginx:/var/log/nginx --memory="1g"  ejr_frontend
