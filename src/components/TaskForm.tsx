import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import type { TaskPriority } from '../types'

interface TaskFormProps {
  projectName: string
  title: string
  setTitle: (value: string) => void
  description: string
  setDescription: (value: string) => void
  priority: TaskPriority
  setPriority: (value: TaskPriority) => void
  assigneeId: string
  setAssigneeId: (value: string) => void
  dueDate: string
  setDueDate: (value: string) => void
  submitting: boolean
  error: string | null
  valid: boolean
  handleSubmit: (e: React.FormEvent) => void
}

export function TaskForm({
  projectName,
  title,
  setTitle,
  description,
  setDescription,
  priority,
  setPriority,
  assigneeId,
  setAssigneeId,
  dueDate,
  setDueDate,
  submitting,
  error,
  valid,
  handleSubmit,
}: TaskFormProps) {
  return (
    <Stack spacing={2} component="form" onSubmit={handleSubmit}>
      <Typography variant="h6">Nueva tarea en {projectName}</Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        fullWidth
        helperText="Mínimo 3 caracteres"
      />
      <TextField
        label="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        multiline
        rows={2}
      />
      <TextField
        select
        label="Prioridad"
        value={priority}
        onChange={(e) => setPriority(e.target.value as TaskPriority)}
        fullWidth
      >
        <MenuItem value="LOW">Baja</MenuItem>
        <MenuItem value="MED">Media</MenuItem>
        <MenuItem value="HIGH">Alta</MenuItem>
      </TextField>
      <TextField
        label="ID del asignado"
        type="number"
        value={assigneeId}
        onChange={(e) => setAssigneeId(e.target.value)}
        fullWidth
        inputProps={{ min: 1 }}
      />
      <TextField
        label="Fecha límite"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
      <Button type="submit" variant="contained" disabled={!valid || submitting}>
        {submitting ? 'Creando…' : 'Crear tarea'}
      </Button>
    </Stack>
  )
}