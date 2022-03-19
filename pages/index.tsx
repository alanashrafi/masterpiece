import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Hero from '../components/Hero'
import client from '../lib/client'
import Post from '../components/Post'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)
export function urlFor(source) {
  return builder.image(source)
}

const Home: NextPage = ({ posts }) => {
  return (
    <>
      <Head>
        <title>MasterPiece</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <div className="mx-auto mt-5 flex h-screen w-11/12 max-w-7xl flex-col items-start">
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
              color={post.category}
            />
          )
        })}
      </div>
    </>
  )
}

export default Home

export async function getStaticProps() {
  const posts = await client.fetch(
    '*[_type == "post"]{title, body, mainImage, slug,"name": author->name, description, "category":categories[0]->title}'
  )
  return {
    props: { posts },
  }
}