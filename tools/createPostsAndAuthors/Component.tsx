import React, {useState} from 'react'

import {CATEGORIES} from '../../constants'

import {Container, StyledButton} from './styled'

export const CreatePostsAndAuthors = () => {
  const [isRequestInProcess, setIsRequestInProcess] = useState(false)

  const addData = async () => {
    const userMutations: {create: {_type: string; name: string}}[] = []
    const users = await fetch('https://jsonplaceholder.typicode.com/users').then((res) => {
      setIsRequestInProcess(true)
      return res.json()
    })

    users.forEach((user: {name: string}) => {
      userMutations.push({
        create: {
          _type: 'author',
          name: user.name,
        },
      })
    })

    await fetch('https://lsqew6sh.api.sanity.io/v2021-06-07/data/mutate/production', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer skbBkIqx05SRqvdAHBfpXaD2yBBGXFHK3PQycRDZsPuREffMqZf4Zu8T4zzovsRFUz67BgMkas9ka5DDcw3I7vk8xrglZOJI7kleheYcpRKE67IGRh0l4WVsqifnun9QIDvuyaVmNcEKRioRTozzEbn3jb2jKW4qh1BsPesaBwyv0B9B1Q2E`,
      },
      body: JSON.stringify({
        mutations: userMutations,
      }),
    })

    const authors = await fetch(
      'https://lsqew6sh.api.sanity.io/v2021-06-07/data/query/production?query=*[_type == "author"]'
    ).then((res) => res.json())

    const posts = await fetch('https://jsonplaceholder.typicode.com/posts').then((res) =>
      res.json()
    )

    const postMutations: {
      create: {
        _type: string
        title: string
        text: {
          _type: string
          _key: string
          style: string
          markDefs: never[]
          children: {_type: string; _key: string; text: string; marks: never[]}[]
        }[]
        category: string
        author: {_ref: any; _type: string}
      }
    }[] = []

    posts.forEach((post: {title: string; body: string; userId: number}) => {
      postMutations.push({
        create: {
          _type: 'post',
          title: post.title,
          text: [
            {
              _type: 'block',
              _key: '333d5a311a40',
              style: 'normal',
              markDefs: [],
              children: [
                {
                  _type: 'span',
                  _key: '0b8240103b30',
                  text: post.body,
                  marks: [],
                },
              ],
            },
          ],
          category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)].value,
          author: {
            _ref: authors.result[Math.floor(Math.random() * authors.result.length)]._id,
            _type: 'reference',
          },
        },
      })
    })

    await fetch('https://lsqew6sh.api.sanity.io/v2021-06-07/data/mutate/production', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer skbBkIqx05SRqvdAHBfpXaD2yBBGXFHK3PQycRDZsPuREffMqZf4Zu8T4zzovsRFUz67BgMkas9ka5DDcw3I7vk8xrglZOJI7kleheYcpRKE67IGRh0l4WVsqifnun9QIDvuyaVmNcEKRioRTozzEbn3jb2jKW4qh1BsPesaBwyv0B9B1Q2E`,
      },
      body: JSON.stringify({
        mutations: postMutations,
      }),
    }).then(() => {
      setIsRequestInProcess(false)
    })
  }

  const clearData = async () => {
    setIsRequestInProcess(true)
    try {
      const mutations: {delete: {id: string}}[] = []

      const authors = await fetch(
        'https://lsqew6sh.api.sanity.io/v2021-06-07/data/query/production?query=*[_type == "author"]'
      ).then((res) => res.json())
      const posts = await fetch(
        'https://lsqew6sh.api.sanity.io/v2021-06-07/data/query/production?query=*[_type == "post"]'
      ).then((res) => res.json())

      authors.result.forEach((author: {_id: string}) => {
        mutations.push({
          delete: {
            id: author._id,
          },
        })
      })

      posts.result.forEach((post: {_id: string}) => {
        mutations.push({
          delete: {
            id: post._id,
          },
        })
      })

      await fetch('https://lsqew6sh.api.sanity.io/v2021-06-07/data/mutate/production', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer skbBkIqx05SRqvdAHBfpXaD2yBBGXFHK3PQycRDZsPuREffMqZf4Zu8T4zzovsRFUz67BgMkas9ka5DDcw3I7vk8xrglZOJI7kleheYcpRKE67IGRh0l4WVsqifnun9QIDvuyaVmNcEKRioRTozzEbn3jb2jKW4qh1BsPesaBwyv0B9B1Q2E`,
        },
        body: JSON.stringify({
          mutations: mutations,
        }),
      })
    } catch (e) {
      console.error(e)
    } finally {
      setIsRequestInProcess(false)
    }
  }

  return (
    <Container>
      <StyledButton onClick={addData} disabled={isRequestInProcess}>
        Add data
      </StyledButton>
      <StyledButton onClick={clearData} disabled={isRequestInProcess}>
        Clear all data
      </StyledButton>
    </Container>
  )
}
