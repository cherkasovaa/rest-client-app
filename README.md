# Rest Client App

![Static Badge](https://img.shields.io/badge/status-in_progress-blue)

REST Client App is a lightweight tool for interacting with RESTful APIs, allowing users to create and send HTTP requests, manage headers and bodies, and review their request history.

## Technology Stack

1. **Framework:** [Next.js](https://nextjs.org/)
2. **Language:** [TypeScript](https://www.typescriptlang.org/)
3. **UI Library:** [Material UI](https://mui.com/material-ui/)
4. **Backend-as-a-Service:** [Firebase](https://firebase.google.com/docs/database)
5. **Testing:** [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
6. **Code Quality:** [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
7. **Git Hooks:** [Husky](https://github.com/typicode/husky#readme) + [lint-staged](https://github.com/lint-staged/lint-staged) + [commitlint](https://commitlint.js.org/)

## Project Architecture
``` text
├── app/                  # Next.js App Router (routing)
│   ├── layout.tsx        # Imports from src/app/providers
│   ├── page.tsx          # Imports from src/pages/home
│   ├── folder-name/
│   │   └── [id]/
│   │       └── page.tsx  # Imports from src/pages/folder-name
├── pages/                # Stub Next.js pages folder
│   ├── README.md         # Description of why this folder exists
├── src/                  # FSD structure
│   ├── app/              # FSD app layer 
│   ├── entities/  
│   ├── features/  
│   ├── pages/            # FSD pages layer
│   ├── shared/
│   ├── widgets/
```

## Getting Started

### Cloning the repository

To start working on the project, clone the repository to your local machine.

Repository: https://github.com/cherkasovaa/rest-client-app

```bash
git clone https://github.com/cherkasovaa/rest-client-app.git
```

After cloning, navigate to the project directory:

```bash
cd rest-client-app
```

### Installing dependencies

To start working on the project, install all dependencies:

```bash
npm install
```

### Development mode

During development, use the development mode. To start the dev server, run:

```bash
npm run dev
```

The local server will open at `http://localhost:3000`

### Building the project

To build the project, run: `npm run build`

### Previewing the built project

To preview the built project, use the built-in `Next.js` server. Start it with: `npm run start`

### Testing

Run tests with the command: `npm run test`

### Linting and formatting

- Check code with ESLint: `npm run lint`
- Auto-fix ESLint issues: `npm run lint:fix`
- Format code with Prettier: `npm run format`

### Working with Husky

Husky is used to automate code and commit message checks.

#### Setting up Husky

After cloning the repository and installing dependencies, run: `npm run prepare`

> [!WARNING]
> If hooks do not work
> Make sure the files in .husky/ have execution permissions

`chmod +x .husky/pre-commit`<br>
`chmod +x .husky/commit-msg`

#### Commit message conventions

The project uses Conventional Commits to standardize commit messages. The message format is:

```markdown
<type>: <description>

[body]
```

Example: `feat: add login page`

Allowed types:

- `feat`: a new feature
- `fix`: a bug fix
- `docs`: documentation changes
- `style`: code formatting changes
- `refactor`: code refactoring
- `test`: adding or fixing tests
- `chore`: updates to build tasks, configs, etc

## Team

**Developers:**

- [Kseniia](https://github.com/akseee/)
- [Tatyana](https://github.com/dem-tv/)
- [Alina](https://github.com/cherkasovaa/)

**Mentor:** [Aleh Kuis](https://github.com/pestler)
