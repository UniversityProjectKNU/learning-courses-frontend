import * as api from '@/api'
import { CatalogChapterList } from '@/components/chapter/list'
import { ListFallback } from '@/components/list-fallback'
import { Chip, Typography } from '@mui/material'
import { Suspense } from 'react'

export async function Content(params: { id: number }) {
  const id = Number(params.id)
  const [course, chapters] = await Promise.all([
    api.course.get.call({ params: { courseId: id } }),
    api.course.getAllChaptersInCourse.call({ params: { courseId: id } }),
  ])

  return (
    <>
      <div className="flex gap-4">
        <Typography gutterBottom variant="h5" component="div">
          {course.title}
        </Typography>
        {!course.isFinished && (
          <Chip label="Ongoing" variant="outlined" color="success" />
        )}
      </div>
      <Typography variant="body1" color="text.secondary">
        {course.description}
      </Typography>

      <div className="mt-10">
        <Typography gutterBottom variant="h5" component="div">
          Chapters
        </Typography>
      </div>

      <CatalogChapterList list={chapters} />
    </>
  )
}

export default async function CoursePage({
  params,
}: { params: { id: string } }) {
  return (
    <>
      <Suspense fallback={<ListFallback />}>
        <Content id={Number(params.id)} />
      </Suspense>
    </>
  )
}
