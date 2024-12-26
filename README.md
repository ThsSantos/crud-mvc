```markdown
# 📚 Sistema de Gerenciamento de Escola

## 🏫 Visão Geral

O **Sistema de Gerenciamento de Escola** é um projeto educacional desenvolvido para demonstrar como criar aplicações web utilizando **Node.js**, **Handlebars**, **MySQL** e a arquitetura **MVC** (Model-View-Controller). Ele foi projetado para ajudar alunos a compreenderem conceitos fundamentais de desenvolvimento backend e frontend, integrando ferramentas modernas e boas práticas de programação.

O sistema permite realizar operações básicas de CRUD (Criar, Ler, Atualizar e Excluir) para gerenciar **cursos**, **turmas** e **alunos**, simulando o funcionamento de um sistema de administração escolar. 

Este projeto foi aplicado no componente **Interface Web II**, com a orientação do **Professor Marcelo Macrino**, para preparar os alunos para os desafios do mercado de trabalho.

---

## 🚀 Tecnologias Utilizadas

- **Node.js**: Plataforma de execução JavaScript no servidor.  
- **Handlebars**: Template engine para criar visualizações dinâmicas.  
- **Express**: Framework para criação de servidores web.  
- **Sequelize**: ORM para interação com o banco de dados.  
- **MySQL**: Banco de dados relacional.  
- **Bootstrap**: Framework CSS para estilização responsiva.  

### 📦 Dependências

```json
"dependencies": {
  "express": "^4.21.1",
  "express-handlebars": "^8.0.1",
  "mysql2": "^3.11.4",
  "sequelize": "^6.37.5"
},
"devDependencies": {
  "nodemon": "^3.1.7"
}
```

---

## 🛠️ Estrutura do Projeto

O projeto segue a arquitetura **MVC** (Model-View-Controller):

- **Model**: Gerencia a lógica de dados e comunicação com o banco de dados.  
- **View**: Gerencia a interface do usuário utilizando Handlebars.  
- **Controller**: Intermedia a interação entre Model e View.  

---

## 🖥️ Funcionalidades

- **Gerenciamento de Cursos**:  
  - Criar, listar, editar e excluir cursos.

- **Gerenciamento de Turmas**:  
  - Criar, listar, editar e excluir turmas.

- **Gerenciamento de Alunos**:  
  - Criar, listar, editar e excluir alunos.

---

## 🏗️ Como Rodar o Projeto

1. Clone este repositório:
   ```bash
   git clone https://github.com/ThsSantos/crud-mvc
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor:
   ```bash
   npm start
   ```
  

---

## 🎨 Layout

O projeto utiliza **Bootstrap** para garantir uma interface simples e responsiva. 

---

## 🤝 Colaboradores

Este projeto foi desenvolvido com o auxilio **Professor Marcelo Macrino** durante o componente **Interface Web II**.

---

