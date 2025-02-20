import { Helmet } from 'react-helmet-async'

import CreateTask from './CreateTask'
import Container from '../../components/Shared/Container'
import TaskBoard from './TaskBoard/TaskBoard'


const Home = () => {
  return (
    <div>
      <Helmet>
        <title> Task-Man | Complete Your Task</title>
      </Helmet>

      <Container>
        <CreateTask></CreateTask>
    
      <section className=''>
       
        <TaskBoard></TaskBoard>

      </section>
      </Container>
    </div>
  )
}

export default Home
