import * as React from 'react'
import { graphql } from 'gatsby'
import type { PageProps } from 'gatsby'
import Layout from '../components/layout'
import Seo from '../components/seo'

type BlogProps = {
  data: {
    allFile: {
      nodes: {
        name: string
      }[]
    }
  }
} & PageProps

const BlogPage = ({ data }: BlogProps) => {
  return (
    <Layout pageTitle="My Blog Posts">
      <ul>
      {
        data.allFile.nodes.map(node => (
          <li key={node.name}>
            {node.name}
          </li>
        ))
      }
      </ul>
    </Layout>
  )
}

export const query = graphql`
  query {
    allFile {
      nodes {
        name
      }
    }
  }
`

export const Head = () => <Seo title="My Blog Posts" />

export default BlogPage