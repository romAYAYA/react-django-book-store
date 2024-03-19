export interface IBook {
  id: number
  title: string
  description: string
  book_file: string
}

export interface ISerializedBookResponse {
  data: IBook
}

export interface ISerializedBooksResponse {
  serialized_books: IBook[]
  total_count: number
}