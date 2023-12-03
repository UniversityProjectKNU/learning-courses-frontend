import * as api from '@/api'
import { DeleteButton } from '@/components/button/delete'
import { TemplateChapterList } from '@/components/chapter/list'
import { PageFallback } from '@/components/fallback/page'
import { Add, Edit, Eject } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import { redirect } from 'next/navigation'
import React from 'react'
import { Suspense } from 'react'
import { ApplyButton } from './apply-button'

export default async function CoursePage({
  params,
}: { params: { id: string } }) {
  return (
    <>
      <Suspense fallback={<PageFallback />}>
        <Content id={Number(params.id)} />
      </Suspense>
    </>
  )
}

async function remove({ id }: { id: number }) {
  'use server'
  await api.template.course.delete_.call({ params: { courseTemplateId: id } })
  redirect('/template')
}

async function applyTemplate(templateId: number) {
  'use server'
  const { id } = await api.template.course.createCourseFromTemplate.call({
    params: { courseTemplateId: templateId },
  })
  redirect(`/course/${id}`)
}

export async function Content(params: { id: number }) {
  const id = Number(params.id)
  const [course, chapters] = await Promise.all([
    api.template.course.get.call({ params: { courseTemplateId: id } }),
    api.template.course.getChaptersInCourseTemplate.call({
      params: { courseTemplateId: id },
    }),
  ])

  return (
    <>
      <div className="flex gap-4 justify-between">
        <Typography gutterBottom variant="h5" component="div">
          {course.title}
        </Typography>
        <div className="flex gap-4">
          <Button
            variant="outlined"
            startIcon={<Edit />}
            href={`/template/course/${id}/edit`}
            className="h-fit"
          >
            Edit
          </Button>
          <DeleteButton object={course} remove={remove} />
        </div>
      </div>
      <Typography variant="body1" color="text.secondary">
        {course.description}
      </Typography>

      <ApplyButton id={id} apply={applyTemplate} />

      <div className="mt-10">
        <Typography gutterBottom variant="h5" component="div">
          Chapters
        </Typography>
      </div>

      <TemplateChapterList list={chapters} />

      <Button
        sx={{ marginTop: '2.5rem' }}
        variant="outlined"
        startIcon={<Add />}
        href={`/template/chapter/${course.id}/create`}
      >
        New chapter
      </Button>
    </>
  )
}
