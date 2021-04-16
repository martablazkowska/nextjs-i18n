import React, { useEffect } from 'react';
import i18next from 'i18next';

import { getSortedLangsData, getLanguage } from '../../lib/lang';

import Layout from '../../components/Layout';

const Test = (props) => {
  return (
      <Layout>
        <h1 className="mt-5 mb-5 font-bold text-4xl">page.js</h1>
        <p>{i18next.t('helloWorld')}</p>
      </Layout>
  );
};

export default Test;

export async function getStaticPaths(params) {

  let staticPages = [];
  const languages = getSortedLangsData();

  console.log(params)


  // Call an external API endpoint to get posts
  const res = await fetch(`https://stage-cms.casinodome.com/en/arest/route/map`);
  const routes = await res.json();

  const pages = routes.nodes;


  for (let page in pages) {
    if(pages.hasOwnProperty(page) && pages[page].alias) {
      languages.map((locale) => {
        const split = pages[page].alias.split('/en/')[1].split('/');
        const item = {
          params: {
            lang: locale,
            page: split
          }
        };
        staticPages.push(item);
      })
    }
  }

  return { paths: staticPages, fallback: false }
}

export async function getStaticProps({ params }) {


  const language = getLanguage(params.lang);
  return {
    props: {
      language,
    },
  };
}
