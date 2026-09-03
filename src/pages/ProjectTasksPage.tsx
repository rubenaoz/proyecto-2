import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { useNavigate, useParams } from 'react-router-dom'
import { TaskForm } from '../components/TaskForm'
import { TaskList } from '../components/TaskList'
import { useProjects } from '../hooks/useProjects'
import { useTaskForm } from '../hooks/useTaskForm'
import { useTasks } from '../hooks/useTasks'

export function ProjectTasksPage() {
  const navigate = useNavigate()
  const { projectId } = useParams()
  const projectNumber = Number(projectId)
  const { projects } = useProjects()
  const { tasks, loading, error, refetch } = useTasks()
  const project = projects.find((item) => item.id === projectNumber)
  const taskForm = useTaskForm({
    projectId: project?.id ?? null,
    projectName: project?.name ?? '',
    onSuccess: refetch,
  })
  const projectTasks = tasks.filter((task) => task.projectId === projectNumber)

  return (
    <Box maxWidth={640} mx="auto" mt={6}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/dashboard')} sx={{ mb: 2 }}>
        Volver a proyectos
      </Button>

      {!project ? (
        <Typography color="text.secondary">Cargando proyecto...</Typography>
      ) : (
        <>
          <Typography variant="h4" gutterBottom>{project.name}</Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            {project.description || 'Tareas del proyecto'}
          </Typography>
          <Paper sx={{ p: 3, mb: 3 }}>
            <TaskForm {...taskForm} />
          </Paper>
          <Paper sx={{ p: 3 }}>
            <TaskList tasks={projectTasks} loading={loading} error={error} />
          </Paper>
        </>
      )}
    </Box>
  )
}