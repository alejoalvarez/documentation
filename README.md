# AI Engineer & AI Architect — Documentación Técnica

[![Deploy to GitHub Pages](https://github.com/tu-usuario/ai-roadmap-docs/actions/workflows/deploy.yml/badge.svg)](https://github.com/tu-usuario/ai-roadmap-docs/actions/workflows/deploy.yml)

Documentación técnica completa para las rutas de **AI Engineer** y **AI Software Architect**. Construida con [Docusaurus](https://docusaurus.io/) y desplegada automáticamente en GitHub Pages.

🌐 **Live site:** https://tu-usuario.github.io/ai-roadmap-docs/

---

## 🚀 Setup Rápido (Local)

### Prerequisitos

- Node.js 18+
- npm 9+

### Instalación

```bash
# 1. Clona el repositorio
git clone https://github.com/tu-usuario/ai-roadmap-docs.git
cd ai-roadmap-docs

# 2. Instala dependencias
npm install

# 3. Levanta el servidor de desarrollo
npm start
# → Abre http://localhost:3000
```

### Build de producción

```bash
npm run build
npm run serve  # Preview local del build
```

---

## 📁 Estructura del Proyecto

```
ai-roadmap-docs/
├── docs/
│   ├── ai-engineer/        # 20 temas de AI Engineering
│   ├── ai-architect/       # 20 temas de AI Architecture
│   └── referencias/        # Tools, stack y fuentes
├── src/
│   ├── css/custom.css      # Estilos globales
│   └── pages/index.js      # Homepage personalizada
├── static/img/             # Imágenes y logos
├── .github/workflows/      # CI/CD para GitHub Pages
├── docusaurus.config.js    # Configuración principal
└── sidebars.js             # Estructura de navegación
```

---

## 🌐 Deploy en GitHub Pages

### Configuración inicial (una sola vez)

1. **Crea el repositorio en GitHub** con nombre `ai-roadmap-docs`

2. **Actualiza `docusaurus.config.js`:**
   ```js
   url: 'https://TU-USUARIO.github.io',
   baseUrl: '/ai-roadmap-docs/',
   organizationName: 'TU-USUARIO',
   projectName: 'ai-roadmap-docs',
   ```

3. **Activa GitHub Pages:**
   - Ve a tu repo → Settings → Pages
   - Source: **GitHub Actions**

4. **Haz push a main:**
   ```bash
   git add .
   git commit -m "docs: initial setup"
   git push origin main
   ```

5. El workflow en `.github/workflows/deploy.yml` se ejecuta automáticamente y despliega tu sitio en `https://TU-USUARIO.github.io/ai-roadmap-docs/`

### Deploy manual

```bash
GIT_USER=tu-usuario npm run deploy
```

---

## ✍️ Cómo Agregar Contenido

### Nueva página

1. Crea un archivo `.md` en la carpeta correspondiente:
   ```bash
   touch docs/ai-engineer/nuevo-tema.md
   ```

2. Agrega el frontmatter:
   ```md
   ---
   id: nuevo-tema
   title: Título del Tema
   sidebar_label: 🔥 Nuevo Tema
   tags: [etiqueta1, etiqueta2]
   ---
   ```

3. Regístralo en `sidebars.js`:
   ```js
   'ai-engineer/nuevo-tema',
   ```

### Componentes disponibles en MDX

```mdx
:::tip Consejo
Texto del tip
:::

:::warning Advertencia
Texto de la advertencia
:::

:::info Información
Texto informativo
:::

:::danger Peligro
Texto de peligro
:::
```

---

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama: `git checkout -b docs/nuevo-tema`
3. Escribe la documentación en Markdown/MDX
4. Haz PR con una descripción clara del contenido agregado

---

## 📄 Licencia

MIT — Úsalo, compártelo, mejóralo.
