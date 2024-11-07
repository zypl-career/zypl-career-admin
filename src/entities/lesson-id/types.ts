export type TLessonIdData = {
  id: string
  item: number
  resource?: string
  name: string
  status: string
  type: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export type TLessonIdTableProps = {
  data: TLessonIdData[]
  onDelete: (id: TLessonIdData['id']) => void
  onEdit: (item: TLessonIdData) => void
  onPreview: (item: TLessonIdData) => void
}
