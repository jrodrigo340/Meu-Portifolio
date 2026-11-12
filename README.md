# Portfólio de Desenvolvedor

Portfólio pessoal, bilíngue (português e inglês), feito apenas com **HTML, CSS e JavaScript puros**, sem frameworks, bibliotecas ou ferramentas de build.

O visual segue a ideia de um mapa estelar: ao rolar a página, o fundo escurece aos poucos e vira um céu estrelado, e Python e Java aparecem como duas constelações ligadas por uma estrela compartilhada.

## Páginas

| Português | English | Conteúdo |
|---|---|---|
| `index.html` | `en/index.html` | Apresentação, tecnologias e projetos em destaque |
| `projetos.html` | `en/projects.html` | Experiência profissional e projetos, com links dos repositórios |
| `contato.html` | `en/contact.html` | Formulário validado e links de contato |
| `creditos.html` | `en/credits.html` | Repositórios para estudar as técnicas usadas no site |

## Recursos

- **Tema claro e escuro:** respeita a preferência do sistema na primeira visita, guarda a escolha em `localStorage` (a mesma para PT e EN) e carrega sem "piscar".
- **Céu que escurece ao rolar:** o JavaScript mede a rolagem e o CSS faz o resto.
- **Animações:** elementos aparecem ao rolar (`IntersectionObserver`) e os cartões de projeto brilham e mostram mais detalhes ao passar o mouse ou receber foco.
- **Transição entre páginas:** View Transitions API quando disponível, com alternativa simples em outros navegadores.
- **Bilíngue:** uma pasta por idioma, `lang` correto e `hreflang` ligando as páginas equivalentes.
- **Acessibilidade:** HTML semântico, foco visível, navegação por teclado, link para pular ao conteúdo e respeito a `prefers-reduced-motion`.
- **Responsivo:** pensado primeiro para o celular.
- **Formulário:** validação no navegador, mensagens de erro e sucesso nos dois idiomas, sem `innerHTML`.

## Estrutura

```
.
├── index.html  projetos.html  contato.html  creditos.html
├── en/
│   └── index.html  projects.html  contact.html  credits.html
├── css/style.css
├── js/
│   ├── theme.js    # aplica o tema antes da página aparecer
│   └── main.js     # tema, menu, céu, animações e formulário
├── img/            # foto e imagens
└── favicon.svg
```

## Como rodar localmente

Não há nada para instalar. Use um servidor local simples:

```bash
python3 -m http.server 8000
```

Depois abra `http://localhost:8000`.

## Como personalizar

1. Troque os textos entre colchetes (`[SEU NOME]`, `[CARGO-ALVO]`, `[YOUR NAME]`...) nos arquivos HTML dos dois idiomas.
2. Substitua `img/foto.svg` pela sua foto (por exemplo, `img/foto.webp`) e atualize o `src` e o `alt` nos dois `index.html`.
3. Atualize os links de repositório, LinkedIn, GitHub e e-mail.
4. Troque `https://SEU-USUARIO.github.io/portfolio/` nas linhas `hreflang` de todas as páginas.
5. No topo de `js/main.js`, preencha `CONTACT_EMAIL` e, se quiser envio direto, `FORM_ENDPOINT`.

### Envio do formulário

O site é estático e não tem back-end. Por padrão, o formulário abre o aplicativo de e-mail do visitante (`mailto:`). Para envio direto, crie um formulário em um serviço como o [Formspree](https://formspree.io) e cole o endereço em `FORM_ENDPOINT`.

## Como publicar (GitHub Pages)

1. Envie a pasta para um repositório no GitHub.
2. Em **Settings → Pages**, escolha a branch `main` e a pasta raiz.
3. Aguarde alguns minutos e acesse o endereço indicado pelo GitHub.

## Créditos

O código deste site foi escrito para este projeto. As páginas de créditos indicam repositórios do GitHub para estudar as técnicas usadas aqui, como MDN, A11Y Project e View Transitions. Confira a licença de cada um antes de reutilizar código.

## Autor

**[SEU NOME]**, GitHub: [github.com/jrodrigo340](https://github.com/jrodrigo340)
