# Домашнее задание ШРИ по теме "Node.js + React + Тестирование"

Node.js v12.16.1

## Запуск приложения

1. Добавить в корень репозитория файл `.env`.
1. Добавить в `.env` переменную `SHRI_API_KEY=...`. Токен можно получить здесь [https://hw.shri.yandex/](https://hw.shri.yandex/).
1. Добавить в `.env` переменную `GITHUB_TOKEN=...`. Токен можно получить здесь [https://github.com/settings/tokens](https://github.com/settings/tokens). Можно не устанавлить, но у GitHub API ограничение в 60 запросов в час для не авторизованных пользователей.
1. Установить зависимости `npm i`
1. Запустить приложение `npm start`
1. Перейти по адресу <http://localhost:3000/>

## Запуск тестов

1. Добавить в корень репозитория файл `.env.test`.
1. Добавить в `.env.test` переменную `SHRI_API_KEY=...`. Чтобы не затереть конфигурацию, рекомендую получить токен с помощью другого аккаунта. Потому что в e2e тестах очищается хранилище.
1. Добавить в `.env.test` переменную `GITHUB_TOKEN=...`.
1. Установить зависимости `npm i`
1. Запустить юнит тесты `npm run test`
1. Установить `Selenium` для `Hermione` <https://github.com/gemini-testing/hermione#prerequisites>
1. Запустить `selenium-standalone start`
1. Запустить `npm run start:e2e`
1. Запустить e2e тесты `npm run test:e2e`
