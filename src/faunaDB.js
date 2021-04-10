import faunadb from 'faunadb';
const client = new faunadb.Client({
  secret: 'fnAEGcNGxiACBYS_1f94QqabbhhQY8dS49dhq28Q'
});
const q = faunadb.query;
export { client, q };