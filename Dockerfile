# Building the React project
FROM node:16-alpine
WORKDIR /app
COPY package.json .
RUN npm install --force
COPY . .

ARG REACT_APP_API_BASE_URL
# ARG REACT_APP_HELP_URL
# ARG REACT_APP_TERMS_URL
# ARG REACT_APP_PRIVACY_URL
# ARG REACT_APP_AUTH0_SIGNUP_URL
# ARG REACT_APP_AUTH0_CLIENT_ID
# ARG REACT_APP_AUTH0_DOMAIN

# ENV REACT_APP_SUPPORT_EMAIL ${REACT_APP_SUPPORT_EMAIL}
ENV REACT_APP_API_BASE_URL ${REACT_APP_API_BASE_URL}
# ENV REACT_APP_HELP_URL ${REACT_APP_HELP_URL}
# ENV REACT_APP_TERMS_URL ${REACT_APP_TERMS_URL}
# ENV REACT_APP_PRIVACY_URL ${REACT_APP_PRIVACY_URL}
# ENV REACT_APP_AUTH0_SIGNUP_URL ${REACT_APP_AUTH0_SIGNUP_URL}
# ENV REACT_APP_AUTH0_CLIENT_ID ${REACT_APP_AUTH0_CLIENT_ID}
# ENV REACT_APP_AUTH0_DOMAIN ${REACT_APP_AUTH0_DOMAIN}

EXPOSE 3000
CMD [ "npm", "start" ]
