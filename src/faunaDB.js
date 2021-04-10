import faunadb from "faunadb"
let client = new faunadb.Client({ secret: process.env.REACT_APP__SECRET });
let q = faunadb.query;
console.log(process.env.REACT_APP__SECRET)
export {client,q}

