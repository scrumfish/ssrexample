import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { useHistory, useParams } from 'react-router'
import styled from 'styled-components'

export const BlogDisplayStyle = styled.div`
  background-color: rgba(255,255,255,0.8);

  pre {
    margin-bottom: 0rem;
    background-color: black;
    color: white;
  }

  p {
    background-color: rgba(0,0,0,0);
    font-size: 1.75em;
  }

  span {
    background-color: rgba(0,0,0,0);
    font-size: 1.75em;
  }

  h1 {
    font-size: 4em;
  }


  @media (min-width: 768px) {
    h1 {
      font-size: 2.75em;
    }

    p {
      font-size: 1.1em;
    }

    span {
      font-size: 1.1em;
    }
  }
`


const Blog = ({blogEntry}) => {
  const {id} = useParams()
  const history = useHistory()
  const [blog, setBlog] = useState(blogEntry)

  const getBlog = async () => {
    if (!id) {
      history.push('/')
    }
    const response = await fetch(`/api/blog/${id}`)
    if (response.ok) {
        const json = await response.json()
        setBlog(json)
    } else {
      history.push('/')
    }
  }

  if (typeof window !== 'undefined' && (!blogEntry || blogEntry.id != id)) {
    useEffect(() => {
      getBlog()
    },[])
  }

  return (
    <Container fluid>
      {!!blog &&
        <>
          <Row>
            <Col xs={0} sm={0} lg={1} />
            <Col xs={12} sm={12} lg={10}>
              <h1>{blog.title}</h1>
            </Col>
            <Col xs={0} sm={0} lg={1} />
          </Row>
          <Row className='blog-display'>
            <Col xs={0} sm={0} lg={1} />
            <Col xs={12} sm={12} lg={10}>
              <BlogDisplayStyle>
                <div dangerouslySetInnerHTML={{ __html: blog.article }} />
              </BlogDisplayStyle>
            </Col>
            <Col xs={0} sm={0} lg={1} />
          </Row>
        </>
      }
    </Container>
  )
}

export default Blog
