export const studentInfoData = `
query{
    user {
      id
      login
    }
  }
    `
export const projectData = `
query {
    transaction(where:{campus:{_eq:"gritlab"}, userId:{ _eq: 1206}, eventId:{_eq:20} }) {
      type
      amount
      attrs
      createdAt
      path
      objectId
    }
  }
`

