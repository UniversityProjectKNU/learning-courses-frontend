import * as api from '@/api'
import { CatalogLessonList } from '@/components/lesson/list'
import { ListFallback } from '@/components/list-fallback'
import { Chip, Typography } from '@mui/material'
import { Suspense } from 'react'

export async function Content(params: { id: number }) {
  const id = Number(params.id)
  const [chapter, lessons] = await Promise.all([
    api.chapter.get.call({ params: { chapterId: id } }),
    api.chapter.getLessons.call({ params: { chapterId: id } }),
  ])

  return (
    <>
      <div className="flex gap-4">
        <Typography gutterBottom variant="h5" component="div">
          {chapter.title}
        </Typography>
        {chapter.isFinished && (
          <Chip label="Finished" variant="outlined" color="warning" />
        )}
      </div>
      <Typography variant="body1" color="text.secondary">
        {chapter.description}
      </Typography>

      <div className="mt-10">
        <Typography gutterBottom variant="h5" component="div">
          Lessons
        </Typography>
      </div>

      <CatalogLessonList list={lessons} />
    </>
  )
}

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <Suspense fallback={<ListFallback />}>
        <Content id={Number(params.id)} />
      </Suspense>
    </>
  )
}