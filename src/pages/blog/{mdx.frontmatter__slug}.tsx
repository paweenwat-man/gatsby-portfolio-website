import * as React from 'react'
import type { HeadProps, PageProps } from 'gatsby'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import Seo from '../../components/seo'

type BlogPostData = {
  mdx: {
    frontmatter: {
      title: string,
      date: string,
    }
  }
}

const BlogPost = ({ data, children }: PageProps<BlogPostData>) => {
  return (
    <Layout pageTitle={data.mdx.frontmatter.title as string}>
      <p>{data.mdx.frontmatter.date}</p>
      {children}
    </Layout>
  )
}

export const query = graphql`
  query ($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
      }
    }
  }
`

export const Head = ({ data }: HeadProps<BlogPostData>) => <Seo title={data.mdx.frontmatter.title as string} />

export default BlogPost