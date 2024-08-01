export interface Post {
    id: number;
    post: string;
    createdBy: number
}


const posts: Post[] = [
    {
        "id": 1,
        "post": "Have a nice day",
        "createdBy": 1
    },
    {
        "id": 2,
        "post": "Rainy Day",
        "createdBy": 2
    },
    {
        "id": 3,
        "post": "To a good day",
        "createdBy": 3
    },
]

export default posts