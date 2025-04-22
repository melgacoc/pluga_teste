Teste Pluga Frontend
==========

## Tecnologias
![Typescript Badge](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Shadcn](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

Configuração do Projeto
-----------------------

1.  **Clone o Repositório:*

    ```bash
    git clone https://github.com/usuario/pluga_teste.git
    cd pluga_teste
    ```

2.  **Instale as Dependências:**

    ```bash
    npm install
    ```

3.  **Execute o Projeto:**

    ```bash
    npm run dev
    ```

    Isso iniciará o servidor de desenvolvimento. Abra seu navegador e acesse a porta exposta.

## Objetivos

Reenderizar as ferramentas obtidas por meio da chamada de uma URL.

## Responsividade

O projeto foi pensado para funcionar em vários tamanhos de tela utilizando grid e tailwind para isso. 
![image](https://github.com/user-attachments/assets/2f90f025-d111-4366-8af8-b533d6b37882)
![image](https://github.com/user-attachments/assets/94021177-0cbd-4a5d-a005-d62dd9578661)
![image](https://github.com/user-attachments/assets/a9b6efa4-6c25-417f-8264-2e15f20fa7e6)

## Favoritos

Possibilidade de marcar ferramentas como favoritas

![image](https://github.com/user-attachments/assets/0edee8a8-b6b5-419b-a20e-12a8e4f79d9b)


## Filtro

É possível filtrar as ferramentas pelo nome e pelas favoritas

Filtro de ferramentas favoritas
![image](https://github.com/user-attachments/assets/12235eb7-4be1-4a42-9f2a-d9a69bb7166a)

Filtro sobre filtro de ferramentas favoritas e nome
![image](https://github.com/user-attachments/assets/2e0cfb81-6792-4880-9287-8ebaef144331)

## Ferramentas recentes

Utilizando um componente de carrosel é possível ver as últimas ferramentas acessadas
![image](https://github.com/user-attachments/assets/b702ca67-903c-472b-8293-5242dd17df9d)


##  Context API

Por se tratar de uma aplicação pequena o uso do context api se aplica muito bem. Ele faz a requisição, trata os filtros, gere o estado das requisições e lida com as ferramentas recentes e favoritas salvando no local storage com uma duração limitada.

