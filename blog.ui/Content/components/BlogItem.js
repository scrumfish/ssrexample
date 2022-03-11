import React from 'react'
import {Container, Row, Col, Button} from 'reactstrap'
import {Link, useHistory} from 'react-router-dom'
import styled from 'styled-components'

const BlogItemStyle = styled.div`
  background-color: rgba(0,0,0,0.1);
  margin-bottom: 5px;

  .landing-item-button {
    padding-top: 8px;
  }
`

const BlogItem = ({blog}) => {
  const history = useHistory()

  const onClick = () => {
    history.push(`/blog/${blog.id}`)
  }

  return (
    <Row>
      <Col sm={0} xs={0} lg={2} />
      <Col sm={12} xs={12} lg={8}>
        <BlogItemStyle>
          <Row>
            <Col sm={12} xs={12} lg={10}>
              <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
              <p>{blog.fragment}...</p>
            </Col>
            <Col sm={12} xs={12} lg={2} className='landing-item-button'>
              <Button onClick={onClick} color='primary'>See More...</Button>
            </Col>
          </Row>
        </BlogItemStyle>
      </Col>
      <Col sm={0} xs={0} lg={2} />
    </Row>
  )
}

export default BlogItem
