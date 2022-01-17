import { useSession, getSession } from 'next-auth/client'
import Layout from '../components/layout'
import axios from 'axios'
import Posts from '../components/post'
import { useEffect, useState } from 'react'

export default function Page ({data: nice}) {
  // As this page uses Server Side Rendering, the `session` will be already
  // populated on render without needing to go through a loading stage.
  // This is possible because of the shared context configured in `_app.js` that
  // is used by `useSession()`.
  const [ session, loading ] = useSession()

  const { data } = nice || {}
  const user = data && data[0] || {}
  const { title } = user


  return (
    <Layout>
      <h1>Server Side Rendering</h1>
      <p>
        This page uses the universal <strong>getSession()</strong> method in <strong>getServerSideProps()</strong>.
      </p>
      <p>
        Using <strong>getSession()</strong> in <strong>getServerSideProps()</strong> is the recommended approach if you need to
        support Server Side Rendering with authentication.
      </p>
      <p>
        The advantage of Server Side Rendering is this page does not require client side JavaScript.
      </p>
      <p>
        The disadvantage of Server Side Rendering is that this page is slower to render.
      </p>

      {/* <input type="text" onChange={handleChange} /> */}

      <Posts posts={data} />
      {
        user ? (
          <div>
            <p>
              <span>{`title: ${title}`}</span>
            </p>
          </div>
        ) : null
      }
    </Layout>
  )
}

// Export the `session` prop to use sessions with Server Side Rendering
export async function getServerSideProps(context) {
  console.log('========================= ~ getServerSideProps ~ context', context)
  const url = 'https://cnodejs.org/api/v1/topics'
  const res = await axios.get(url)
  const { data } = res;
  console.log('=============sdgs============ ~ getServerSideProps ~ res', res)
  return {
    props: {
      // session: await getSession(context)
      data
    }
  }
}
