import { Helmet } from 'react-helmet-async'


import Container from '../../components/Shared/Container'
import TaskBoard from './TaskBoard/TaskBoard'


const Home = () => {
  return (
    <div className='dark:bg-slate-900'>
      <Helmet>
        <title> Task-Man | Complete Your Task</title>
      </Helmet>

      <Container>
        
    
      <section className=''>
       
        <TaskBoard></TaskBoard>

      </section>
      </Container>
    </div>
  )
}

export default Home
