<h1 align="center">Movie App with Apollo, graphQL, React</h1>

- YTS movie api를 graphQL 서버 생성
- `gql`을 통해 graphQL 쿼리문을 작성하고 클라이언트에서 qeury, mutation 이용

## Tech
- `React`
- `React-router-dom`
- `Apollo`
- `GraphQL`
- `@apollo/react-hooks`
- `styled-compoents`

## API
- [YTS movie](https://yts.am/api/v2/)

## Set Up
```
$ npx create-react-app 프로젝트명

$ yarn add styled-components react-router-dom
$ yarn add apollo-boost @apollo/react-hooks graphql
```


## Screenshot
|||
|---|---|
![Home](https://user-images.githubusercontent.com/45463495/108665462-558e8300-7518-11eb-9ecc-6b1036b4f90d.png)|![Detail](https://user-images.githubusercontent.com/45463495/108665463-57584680-7518-11eb-81f0-eed279351076.png)

## Source
- graphQL 서버와 연결
  ```
  const client = new ApolloClient({
    // graphQL server
    uri: 'http://localhost:4000/',
    resolvers: {
      Movie: {
        isLiked: () => false,
      },
      Mutation: {
        toggleLikeMovie: (_, { id, isLiked }, { cache }) => {
          cache.writeData({
            id: `Movie:${id}`,
            data: {
              isLiked: !isLiked,
            },
          });
        },
      },
    },
  });
  ```
  - gql 작성
  ```
  // Home qeury
  const GET_MOVIES = gql`
    {
      movies {
        id
        medium_cover_image
        isLiked @client # server에 없는 쿼리를 생성했을 경우에 @client 사용
      }
    }
  `;

  // Detail qeury
  const GET_MOVIE = gql`
    # apollo를 위한 변수의 type 검사
    query getMovie($id: Int!) {
      movie(id: $id) {
        id
        title
        medium_cover_image
        language
        rating
        description_intro
        isLiked @client
      }

      suggestions(id: $id) {
        id
        medium_cover_image
      }
    }
  `;

  // mutation
  const LIKE_MOVIE = gql`
  mutation toggleLikeMovie($id: Int!, $isLiked: Boolean!) {
      toggleLikeMovie(id: $id, isLiked: $isLiked) @client
    }
  `;
  ```