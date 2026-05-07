# ReShare — платформа безвозмездного обмена вещами

ReShare — это веб-приложение, позволяющее пользователям публиковать объявления о дарении, обмене или запросе вещей. Цель проекта — дать вещам вторую жизнь, сократить потребление и объединить людей в осознанном потреблении.

---

## Содержание

- [Архитектура](#архитектура)
- [Разделы приложения](#разделы-приложения)
- [Стек и библиотеки](#стек-и-библиотеки)
- [Запуск проекта](#запуск-проекта)
  - [Dev-режим](#dev-режим)
  - [Preview (production-сборка локально)](#preview-production-сборка-локально)
  - [Docker](#docker)
- [Генерация API-клиентов](#генерация-api-клиентов)

---

## Архитектура

Проект построен по методологии **Feature-Sliced Design (FSD)**:

```
src/
├── app/          # инициализация приложения: провайдеры, роутер, глобальные стили
├── pages/        # страницы — точки входа для маршрутов
├── widgets/      # крупные самостоятельные блоки интерфейса (шапка и т.д.)
├── features/     # пользовательские сценарии (логин, регистрация, кнопка назад)
├── entities/     # бизнес-сущности с API-слоем (listings, users, identity)
└── shared/       # переиспользуемый код: UI, хуки, утилиты, базовое API, типы
```

Каждый слой может импортировать только из слоёв **ниже** себя.

---

## Разделы приложения

| Маршрут | Описание | Доступ |
|---|---|---|
| `/landing` | Лендинг — знакомство с платформой | Все |
| `/login` | Вход в аккаунт | Только гости |
| `/reg` | Регистрация | Только гости |
| `/ads` | Лента объявлений | Авторизованные |
| `/ads/:id` | Детальная страница объявления | Авторизованные |
| `/new-publication` | Пошаговая форма создания объявления | Авторизованные |
| `/messages` | Личные сообщения | Авторизованные |
| `/profile` | Профиль пользователя | Авторизованные |
| `/profile/my-ads` | Мои активные объявления | Авторизованные |
| `/profile/my-applications` | Мои заявки на вещи | Авторизованные |
| `/profile/my-archive` | Архив завершённых объявлений | Авторизованные |
| `/profile/my-eco` | Эковклад пользователя | Авторизованные |
| `/leaderboard` | Общая эко-статистика сообщества | Авторизованные |

Маршруты делятся на публичные (доступны гостям) и защищённые (требуют авторизации). Редирект управляется через `loader`-функции `authProvider` / `guestProvider` в React Router.

---

## Стек и библиотеки

### Runtime

| Библиотека | Зачем |
|---|---|
| **React 19** | UI-библиотека, основа всего фронтенда |
| **React DOM** | Рендеринг React-дерева в браузер |
| **React Router 7** | Клиентский роутинг, защищённые маршруты через `loader`, ленивая загрузка страниц |
| **@reduxjs/toolkit** | Управление глобальным состоянием (Redux), встроенный RTK Query для работы с API |
| **react-redux** | Связь React-компонентов со store Redux |
| **react-toastify** | Всплывающие уведомления (успех, ошибка, загрузка) |
| **clsx** | Условная сборка CSS-классов без шаблонной строковой конкатенации |
| **swagger-typescript-api** | Генерация типизированных API-клиентов из Swagger/OpenAPI-схем бэкенда |

### Dev / Build

| Инструмент | Зачем |
|---|---|
| **Vite** | Сборщик и dev-сервер с HMR, быстрый старт и оптимизированный production-билд |
| **@vitejs/plugin-react-swc** | Компиляция JSX/TSX через SWC — быстрее Babel |
| **TypeScript** | Статическая типизация, исключение целого класса ошибок на этапе компиляции |
| **ESLint + typescript-eslint** | Линтинг кода: единый стиль, поиск типичных ошибок |
| **eslint-plugin-react-hooks** | Проверка правил хуков React |
| **eslint-plugin-react-refresh** | Гарантирует корректную работу HMR при изменении компонентов |
| **eslint-plugin-import-x + eslint-import-resolver-typescript** | Линтинг импортов: запрещает циклические зависимости, проверяет алиасы `@shared`, `@entities` и т.д. |
| **husky + lint-staged** | Pre-commit хук: запускает ESLint только на изменённых файлах перед каждым коммитом |
| **tsx** | Запуск TypeScript-скриптов без предварительной компиляции (используется для `gen:api`) |
| **dotenv** | Загрузка `.env`-файлов в скриптах Node.js (генерация API) |
| **vitest** | Unit-тестирование, совместим с экосистемой Vite |

---

## Запуск проекта

### Предварительно

Создай файл `.env.development` на основе переменных окружения:

```env
VITE_GATEWAY_URL=http://localhost:8080/api

# Порты микросервисов (для генерации API)
VITE_BASE_URL_PREFIX=http://localhost:
VITE_SWAGGER_SUFFIX=/swagger/v1/swagger.json
VITE_IDENTITY_SERVICE_PORT=5001
VITE_USERS_SERVICE_PORT=5002
VITE_LISTINGS_SERVICE_PORT=5003
VITE_TRANSACTIONS_SERVICE_PORT=5004
VITE_MESSAGING_SERVICE_PORT=5005
VITE_NOTIFICATIONS_SERVICE_PORT=5006
VITE_CHARITY_SERVICE_PORT=5007
VITE_DISPUTES_SERVICE_PORT=5008
VITE_FILES_SERVICE_PORT=5009
VITE_ANALYTICS_SERVICE_PORT=5010
```

Установи зависимости:

```bash
npm install
```

---

### Dev-режим

Запускает dev-сервер Vite с горячей перезагрузкой (HMR).

```bash
npm run dev
```

Приложение откроется по адресу [http://localhost:5173](http://localhost:5173).

---

### Preview (production-сборка локально)

Собирает оптимизированный бандл и поднимает локальный preview-сервер для проверки продакшн-сборки.

```bash
npm run build
npm run preview
```

Приложение откроется по адресу [http://localhost:4173](http://localhost:4173).

---

### Docker

**`Dockerfile`** (создай в корне проекта):

```dockerfile
# Этап 1: сборка
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Этап 2: раздача статики через nginx
FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**`nginx.conf`** (создай в корне проекта):

```nginx
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    # SPA: все маршруты проксируются на index.html
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**Сборка и запуск:**

```bash
docker build -t reshare-frontend .
docker run -p 3000:80 reshare-frontend
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000).

**Через docker-compose** (если бэкенд тоже в контейнерах):

```yaml
services:
  frontend:
    build: .
    ports:
      - "3000:80"
    environment:
      - VITE_GATEWAY_URL=http://gateway:8080/api
```

```bash
docker compose up --build
```

---

## Генерация API-клиентов

Типизированные клиенты генерируются из Swagger-схем запущенных микросервисов. Убедись, что сервисы доступны по портам из `.env.development`, и выполни:

```bash
npm run gen:api
```

Файлы будут перезаписаны в `src/shared/api/generated/`.

> Коммитить сгенерированные файлы в репозиторий — **рекомендуется**, чтобы CI/CD не зависел от доступности бэкенда на момент сборки.

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
