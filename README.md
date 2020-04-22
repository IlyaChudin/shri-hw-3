# Домашнее задание ШРИ по теме "Node.js + React + Тестирование + Инфраструктура"

1. Node.js v12.16.1
1. Установить зависимости `npm i`

## Запуск приложения

1. Добавить в корень репозитория файл `.env`.
1. Добавить в `.env` переменную `SHRI_API_KEY=...`. Токен можно получить здесь [https://hw.shri.yandex/](https://hw.shri.yandex/).
1. Добавить в `.env` переменную `GITHUB_TOKEN=...`. Токен можно получить здесь [https://github.com/settings/tokens](https://github.com/settings/tokens). Можно не устанавлить, но у GitHub API ограничение в 60 запросов в час для не авторизованных пользователей.
1. Запустить приложение `npm start`
1. Перейти по адресу <http://localhost:3000/>

## Запуск тестов

1. Добавить в корень репозитория файл `.env.test`.
1. Добавить в `.env.test` переменную `SHRI_API_KEY=...`. Чтобы не затереть конфигурацию, рекомендую получить токен с помощью другого аккаунта. Потому что в e2e тестах очищается хранилище.
1. Добавить в `.env.test` переменную `GITHUB_TOKEN=...`.
1. Запустить юнит тесты `npm run test`
1. Установить `Selenium` для `Hermione` <https://github.com/gemini-testing/hermione#prerequisites>
1. Запустить `selenium-standalone start`
1. Запустить `npm run start:e2e`
1. Запустить e2e тесты `npm run test:e2e`

## Запуск билд-сервера и билд-агента

1. Добавить в корень репозитория файл `server-conf.json`.

    ```json
    {
      "port": 3001,
      "apiBaseUrl": "https://hw.shri.yandex/api/",
      "apiToken": "...",
      "updateInterval": 15000
    }
    ```

1. Добавить в корень репозитория файл `agent-conf.json`.

    ```json
    {
      "port": 3002,
      "serverHost": "127.0.0.1",
      "serverPort": 3001,
      "updateInterval": 30000
    }
    ```

1. Запустить билд-сервер

    `npm run start:build-server -- --config=./server-conf.json`

1. Запустить билд-агент

    `npm run start:build-agent -- --config=./agent-conf.json`

Любые настройки конфиг файлов можно переопределить, передав соответствующий параметр. Например агентов удобно запускать так:

`npm run start:build-agent -- --config=./agent-conf.json --port=3004`

Либо вообще не указывать конфиг файл и передать все настройки через параметры:

`npm run start:build-agent -- --port=3004 --serverHost="127.0.0.1" --serverPort=3001 --updateInterval=30000`

В приложениях присутствуют стандартные настройки:

1. Для сервера

    ```json
    {
      port: 3001,
      apiBaseUrl: "https://hw.shri.yandex/api/",
      updateInterval: 30000
    }
    ```

1. Для агента

    ```json
    {
      serverHost: "127.0.0.1",
      serverPort: 3001,
      updateInterval: 30000
    }
    ```

Если ими воспользоваться, то можно запускать приложения так:

`npm run start:build-agent -- --port=3004`

`npm run start:build-server -- --apiToken="..."`

## Сборка и запуск docker образов для билд-сервера и билд-агента

1. Собрать образы `npm run build:docker-images`
1. Запуcтить билд-сервер

    `docker run --name build-server --network host shri-ci-build-server --port=3001 --apiBaseUrl="https://hw.shri.yandex/api/" --updateInterval=30000 --apiToken="..."`.

    Со стандартными настройками:

    `docker run --name build-server --network host shri-ci-build-server --apiToken="..."`

1. Запуcтить билд-агента

    `docker run --name build-agent-3002 --network host shri-ci-build-agent --port=3002 --serverHost="127.0.0.1" --serverPort=3001 --updateInterval=30000`.

    Со стандартными настройками:

    `docker run --name build-agent-3002 --network host shri-ci-build-agent --port=3002`
