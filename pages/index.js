import { gql } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import { client } from "../data/apollo";

const Wrapper = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  p {
    margin: 1rem 0;
    font-size: 2rem;
    font-weight: bold;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
  img {
    max-height: 500px;
    width: auto;
  }
`;

const Index = (props) => {
  const {
    page: { homepagehero },
  } = props;

  return (
    <Wrapper>
      <p>{homepagehero.title}</p>
      <p>{homepagehero.subtitle}</p>
      <img src={homepagehero.image.sourceUrl} alt="" />
    </Wrapper>
  );
};

export async function getStaticProps() {
  try {
    const { data, errors } = await client.query({
      query: gql`
        query MyQuery {
          page(id: "cG9zdDo4") {
            homepagehero {
              title
              subtitle
              image {
                sourceUrl
              }
            }
          }
        }
      `,
    });
    return {
      props: {
        page: data.page,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
    };
  }
}

export default Index;
