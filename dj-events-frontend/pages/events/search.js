import EventItem from '@/components/EventItem';
import Layout from '@/components/Layout';
import { gql } from '@apollo/client';
import client from 'apollo-client';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SearchPage({ events }) {
  const router = useRouter();
  return (
    <Layout title='Search results'>
      <Link href='/events'>Go back</Link>
      <h1>Search results for {router.query.term}</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const { data } = await client.query({
    query: gql`
      query SHOW_ALL_EVENTS($term: String!) {
        events(
          filters: {
            or: [
              { description: { contains: $term } }
              { name: { contains: $term } }
              { performers: { contains: $term } }
              { venue: { contains: $term } }
            ]
          }
        ) {
          data {
            id
            attributes {
              name
              slug
              date
              time
              image {
                data {
                  attributes {
                    formats
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      term,
    },
  });

  return {
    props: { events: data.events.data },
  };
}
