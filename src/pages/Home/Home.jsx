import { Helmet } from 'react-helmet-async'

import CreateTask from '../../components/Home/CreateTask'
import Container from '../../components/Shared/Container'
import Todo from '../../components/Home/TODO/Todo'
import InProgress from '../../components/Home/Process/InProgress'
import Done from '../../components/Home/Done/Done'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> Task-Man | Complete Your Task</title>
      </Helmet>

      <Container>
        <CreateTask></CreateTask>
    
      <section className='grid grid-cols-3 gap-8'>
        <div>
          <Todo></Todo>
        </div>
        <div>
          <InProgress></InProgress>
        </div>
        <div>
          <Done></Done>
        </div>

      </section>
      </Container>
    </div>
  )
}

export default Home
