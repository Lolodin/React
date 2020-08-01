This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
#Readme
Тестовое задание https://github.com/fugr-ru/frontend-javascript-test

В проекты использовались следующий библиотеки:
* lodash - для сортировки массива
##Run

`$ git clone https://github.com/Lolodin/React`

`$ cd React`

`$ npm run`

Откройте браузер по адресу http://localhost:3000/ 

##Run docker

`$ git clone https://github.com/Lolodin/React`

`$ cd React`

`$ docker build -t react-test .`

`$ docker run \
    -it \
    --rm \
    -v ${PWD}:/React \
    -v /React/node_modules \
    -p 3001:3000 \
    -e CHOKIDAR_USEPOLLING=true \
    react-test`

Откройте браузер по адресу http://localhost:3001/ 
