# Sistema de controle de estoque

## Front-end
Para rodar a aplicação, deve-se abrir a parta stock-control-web e rodar o comando:

```
ng serve
```

Para agilizar o desenvolvimento, foi-se gerado o projeto com Angular CLI.
O projeto está dividido entre os seguintes diretórios:
- *content*
  
  Contém os assets da aplicação (fontes, estilos, imagens)

- app
  - *entities*
    
    Contém os arquivos de cada entidade separadas por pasta. Na pasta, estão as páginas de consulta, criação, edição, além do serviço para fazer requisições pro servidor.
  - *home*
    
    Arquivos da home
  - *layout*
    
    Arquivos de componentes do layout que estão presentes em todas as páginas.
  - *shared*
    
    Componentes e módulos que são utilizados na maioria das páginas.
    
    - **entity-service:** Decidi criar este serviço genérico como base para todas os serviços de todos os tipos de entidades que existem, onde pode-se apenas extender para ter acesso aos métodos de request pro servidor (que tendem a ser iguais independente da entidade)
    - **delete-dialog:** Componente genérico para um dialog de confirmação para deletar uma entidade
    - **input-validation:** Componente geral para inputs que possuem mensagens de erro de validação
### Servidor e Banco
Para o banco foi utilizado PostgreSQL por questão de intimidade. O servidor foi desenvolvido utilizando Java com Spring Boot, Hibernate e JPA, já que são tecnologias as quais eu estou habituado e que considero que facilitam bastante o desenvolvimento. Utilizei MapStruct para gerar o mapeamento do DTO com a entidade de forma automática.
Para iniciar o servidor, deve-se executar o seguinte comando na pasta stock-control-api:
```
mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```



- *content*

  Contém os assets da aplicação (fontes, estilos, imagens)

- src/main/java/com/brunduartt/stockcontrolapi
  - **config**

    Contém os arquivos de configuração. No caso, só possui um atualmente para permitir requisições sem o CORS interferir.
  - **domain**

    Arquivos usados na representação das entidades.
    - *criteria*: Arquivos usados na pesquisa de uma entidade por criteria.
    - *dto*: Arquivos que representam o DTO da entidade.
    - *mapper*: Arquivos usados para passar uma entidade para sua representação em DTO.  
  - **repository**

    Arquivos que representam um repositório de uma entidade, onde são feitas as chamadas pro banco de dados.
  - **resource**
    
    Arquivos de mapeamento das requisições.
  - **service**
    
    Arquivos dos serviços.



Decidi criar classes e interfaces genéricas contendo os métodos que serão utilizados por todo tipo de entidade, como salvar, deletar, obter uma entidade pelo seu id ou obter várias entidades de uma vez. Para implementá-los para uma entidade, basta extender a classe/interface.
- **EntityService.java:** Classe genérica com métodos básicos para salvar, deletar ou consultar.
- **EntityRepository.java:** Interface genérica base de um repositório, com métodos do JPA.
- **EntityMapper.java:** Interface genérica de um mapper, com métodos para transformar uma entidade em DTO e vice-versa.