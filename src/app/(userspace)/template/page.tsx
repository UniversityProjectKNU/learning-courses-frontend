import { template } from '@/api'
import { TemplateCourseList } from '@/components/course/list'
import ListFallback from '@/components/fallback/list'
import { Add } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import { Suspense } from 'react'

export default function CoursesCatalog() {
  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        Courses templates
      </Typography>
      <Suspense fallback={<ListFallback />}>
        <Context />
        <Button
          sx={{ marginTop: '2.5rem' }}
          variant="outlined"
          startIcon={<Add />}
          href="/template/course/create"
        >
          New template
        </Button>
      </Suspense>
    </>
  )
}

async function Context() {
  const courses = await template.course.getAll.call()
  return <TemplateCourseList list={courses} />
}
