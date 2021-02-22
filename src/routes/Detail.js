import React from 'react';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import Suggestion from '../components/Suggestion';

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

export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: parseInt(id) },
  });
  return (
    <Container>
      <Column>
        <Title>
          {loading
            ? 'Loading...'
            : `${data.movie.title} ${data.movie.isLiked ? '❤️' : '💔'}`}
        </Title>
        <Subtitle>
          {data?.movie?.language} · {data?.movie?.rating}
        </Subtitle>
        <Description>{data?.movie?.description_intro}</Description>
      </Column>
      <Poster bg={data?.movie?.medium_cover_image}></Poster>
      {/* <Suggestions>
        {data?.suggestions?.map((s) => (
          <Suggestion key={s.id} id={s.id} bg={s.medium_cover_image} />
        ))}
      </Suggestions> */}
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 20px;
`;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-size: cover;
  background-position: center center;
`;

const Suggestions = styled.div`
  width: 25%;
`;
