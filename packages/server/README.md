# Домашнее задание ШРИ по теме "Node.js"

## Описание API

- `GET /api/settings` — получение сохраненных настроек
- `POST /api/settings` - cохранение настроек
- `GET /api/builds` - получение списка сборок
- `POST /api/builds/:commitHash` - добавление сборки в очередь
- `GET /api/builds/:buildId` - получение информации о конкретной сборке
- `GET /api/builds/:buildId/logs` - получение логов билда (сплошной текст)

## Запуск

1. Node.js v12.16.1
1. Установить переменную окружения `SHRI_API_KEY`. Токен можно получить здесь [https://hw.shri.yandex/](https://hw.shri.yandex/)
1. Установить переменную окружения `GITHUB_TOKEN`. Токен можно получить здесь [https://github.com/settings/tokens](https://github.com/settings/tokens). Можно не устанавлить, но у GitHub API ограничение в 60 запросов в час для не авторизованных пользователей.
1. Установить зависимости `npm i`
1. Запустить приложение `npm start`

## Комментарии

Немного отклонился от изначальной задачи, после того как в техническом чате было одобрено использование GitHub API. В итоге репозитории никуда не клонирую в этом приложении и всю информацию собираю через GitHub API.

В GitHub API нет чего-то похожего на `git branch --contains SHA` поэтому добавил параметр ветки в тело запроса `POST /api/builds/:commitHash` `{"branchName":"master"}`, т.к. на интефейсе по кнопке Run build будет выпадать модальное окно с выбором ветки и коммита и оттуда уже можно будет отправлять правильную ветку. На случай, если проверка нашего API будет с помощью автотестов добавил `|| settings.mainBranch`, чтобы хоть что-то отправлялось и не возвращало 400 :)

## Дополнительное задание

Кэш билд логов вроде работает. Собрал из 2 популярных бибилиотек из npm. В файле `config.js` есть настройки для него, также `maxAge` можно добавлять и при добавлении элемента.

## Задание со звездочкой

Использовал для решения `setInterval`. При старте приложения или смене настроек билд автоматически не запускается, а только запоминается хэш последнего коммита. Так сделал потому что из базы мы не можем получить информацию по коммитам (перебор всех билдов слишком тяжелое решение) и при старте приложения не понятно какой коммит мы сбилдили последним. В тех чате предлагали при сохранении настроек билдить коммит на который ссылает ветка, но тогда будут появляться лишние билды при каждом рестарте приложения или при изменении на ветку в который верхний коммит уже был сбилжен.