import Layout from '../../components/layout'
import axios from 'axios'
import styles from './detail.module.css'

export default function Page ({data}) {
  const {
    author, content, isFetching,replies, title,
    create_at, visit_count, reply_count
  } = data || {}


  return (
    <Layout>
      <h1 className={styles["detail-title"]}>details page</h1>
      <div className='markdown-body'>
        {/* dangerouslySetInnerHTML 是 React 用于代替在浏览器 DOM 中使用 innerHTML */}
        <div dangerouslySetInnerHTML={{__html: content}} />
      </div>
    </Layout>
  )
}

// This gets called on every request
export async function getServerSideProps(context) {
  // 动态路由
  const { params } = context
  const { pid } = params || {}
  console.log('========================= ~ getServerSideProps ~ context', context)

  const url = `https://cnodejs.org/api/v1/topic/${pid}`
  const res = await axios.get(url)
  console.log('=============sdgs============ ~ getServerSideProps ~ res', res)

  if (!res) {
    return {
      notFound: true,
    }
  }
  

  // Pass data to the page via props
  return {
    props: {
      // session: await getSession(context)
      data: res?.data?.data
    }
  }
}
