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
`;

const Index = (props) => {
  const {
    page: { homePageHero },
  } = props;

  let srcMap = {};

  homePageHero.heroImage.srcSet.split(",").forEach((src) => {
    let srcSplit = src.split(" ");
    if (srcSplit.length === 3) {
      srcMap[srcSplit[2]] = srcSplit[1];
    } else {
      srcMap[srcSplit[1]] = srcSplit[0];
    }
  });

  return (
    <Wrapper>
      <p>{homePageHero.title}</p>
      <p>{homePageHero.subtitle}</p>
      <img src={srcMap[`768w`]} alt="" />
    </Wrapper>
  );
};

export async function getStaticProps() {
  try {
    const { data, errors } = await client.query({
      query: gql`
        query MyQuery {
          page(id: "cG9zdDo2") {
            homePageHero {
              title
              subtitle
              heroImage {
                altText
                srcSet
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
