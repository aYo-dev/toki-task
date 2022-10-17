FROM node:18
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
# install the dependencies
RUN yarn install
# Copy app files
COPY . .
# build the project
RUN yarn build

# Start the app
CMD [ "yarn", "start" ] 