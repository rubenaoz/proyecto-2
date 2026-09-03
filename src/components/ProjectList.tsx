import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Project } from '../types'

interface ProjectListProps {
  projects: Project[]
  onSelect: (project: Project) => void
  loading: boolean
  error: string | null
}

export function ProjectList({ projects, onSelect, loading, error }: ProjectListProps) {
  if (loading) return <Stack alignItems="center" py={4}><CircularProgress /></Stack>
  if (error) return <Alert severity="error">{error}</Alert>
  if (projects.length === 0) return <Typography color="text.secondary">No hay proyectos.</Typography>

  return (
    <>
      <Typography variant="subtitle1" gutterBottom>Proyectos ({projects.length})</Typography>
      <List>
        {projects.map((project) => (
          <ListItem key={project.id} divider secondaryAction={<Button onClick={() => onSelect(project)}>Abrir</Button>}>
            <ListItemButton onClick={() => onSelect(project)}>
              <ListItemText primary={project.name} secondary={project.description || `ID ${project.id}`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  )
}