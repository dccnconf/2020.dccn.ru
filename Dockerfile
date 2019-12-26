FROM alpine:3.11

WORKDIR /home/2020.dccn.ru
RUN apk add --no-cache curl
RUN curl -O https://downloads.rclone.org/rclone-current-linux-amd64.zip && unzip rclone-current-linux-amd64.zip && cd rclone-*-linux-amd64 && cp rclone /usr/bin && chown root:root /usr/bin/rclone && chmod 744 /usr/bin/rclone
# INSTALL YARN AND GULP
RUN apk update && apk add yarn
RUN apk update && apk add -u yarn
RUN apk add npm
RUN npm install --global gulp-cli

# COPY FILES:
COPY src src
COPY *.js ./
COPY *.json ./
COPY *.lock ./
COPY rclone.conf ./
COPY dist ./

# INSTALL NODE MODULES:
RUN yarn install

# DEFAULT COMMAND:
# TODO: here serve command won't see actual changes in our code, 
#       need to setup a volume for that (not quite sure)
# TODO: browserSync is running on localhost, maybe use something else
#CMD gulp build && gulp serve
CMD sh
