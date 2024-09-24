import { useContext, useEffect, useState } from 'react'
import { Assistant } from './components/assistant/assistant'
import { HomePage } from './pages/HomPage'
import { DefaultTemplate } from './pages/defalutTemplate'
import { AdmPage } from './pages/admUserPage'
import { EditTaskModal } from './components/editTaskModal'
import { ModalContext } from './providers/ModalContext'


function App() {

  const selectedTask = "";
  const onClose = () => {

    setTaskModalIsOpen(false)
    console.log(taskModalIsOpen);

  };
  const onSave = () => {
    console.log("onSave");

  };

  const { taskModalIsOpen } = useContext(ModalContext);
  const { setTaskModalIsOpen } = useContext(ModalContext);


  return (
    <>
      <DefaultTemplate>
        {/* <HomePage /> */}
        <AdmPage />
        {taskModalIsOpen ? <EditTaskModal task={selectedTask} onClose={onClose} onSave={onSave} /> : null}
      </DefaultTemplate>
    </>
  )
}

export default App
