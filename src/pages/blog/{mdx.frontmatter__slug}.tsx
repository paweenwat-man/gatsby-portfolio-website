import * as React from 'react'
import { graphql } from 'gatsby'
import type { HeadProps, PageProps } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import type { ImageDataLike, IGatsbyImageData } from 'gatsby-plugin-image'
import Layout from '../../components/layout'
import Seo from '../../components/seo'

type BlogPostData = {
  mdx: {
    frontmatter: {
      title: string,
      date: string,
      hero_image: IGatsbyImageData,
      hero_image_alt: string,
      hero_image_credit_link: string,
      hero_image_credit_text: string,
    }
  }
}

const BlogPost = ({ data, children }: PageProps<BlogPostData>) => {

  const image = getImage(data.mdx.frontmatter.hero_image) as IGatsbyImageData;

  return (
    <Layout pageTitle={data.mdx.frontmatter.title as string}>
      <p>Posted: {data.mdx.frontmatter.date}</p>
      <GatsbyImage
        image={image}
        alt={data.mdx.frontmatter.hero_image_alt as string}
      />
      <p>
        Photo Credit:{" "}
        <a href={data.mdx.frontmatter.hero_image_credit_link}>
          {data.mdx.frontmatter.hero_image_credit_text}
        </a>
      </p>
      {children}
    </Layout>
  )
}

export const query = graphql`
  query($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        hero_image_alt
        hero_image_credit_link
        hero_image_credit_text
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`

export const Head = ({ data }: HeadProps<BlogPostData>) => <Seo title={data.mdx.frontmatter.title as string} />

export default BlogPost