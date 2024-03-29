//import type { NextPage } from 'next'
import Head from 'next/head'
import Hero from '../components/Hero'
import Post from '../components/Post'
import imageUrlBuilder from '@sanity/image-url'
import sanityClient from '/client'

const builder = imageUrlBuilder(sanityClient)
export function urlFor(source) {
  return builder.image(source)
}

const Home = ({ posts }) => {
  return (
    <>
      <Head>
        <title>MasterPiece</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <div className="mx-auto mt-5 flex w-11/12 max-w-7xl flex-col items-start">
        {posts.map((post) => {
          return (
            <Post
              title={post.title}
              category={post.category}
              image={
                post.mainImage ? urlFor(post.mainImage).url() : '/post.svg'
              }
              slug={post.slug.current}
              author={post.name}
              description={post.description}
            />
          )
        })}
      </div>
    </>
  )
}

export default Home

export async function getStaticProps() {
  const posts = await sanityClient.fetch(
    '*[_type == "post"]{title, body, mainImage, slug,"name": author->name, description, "category":categories[0]->title}'
  )
  return {
    props: { posts },
  }
}
