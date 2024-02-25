export interface IBook {
  id: number
  title: string
  description: string
}

export interface ISerializedBooksResponse {
  serialized_books: IBook[]
  total_count: number
}