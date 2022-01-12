import EventItem from '@/components/EventItem';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import { gql } from '@apollo/client';
import client from '../apollo-client';
import Link from 'next/link';

export default function Home({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {events.length > 0 && (
        <Link href='/events'>
          <a className='btn-secondary'>View All Events</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query SHOW_EVENTS {
        events(pagination: { limit: 3 }, sort: ["date:ASC"]) {
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
  });
  // const res = await fetch(`${API_URL}/api/events?populate=*`);
  // const events = await res.json();
  console.log(data.events.data);

  return {
    props: { events: data.events.data },
    revalidate: 1,
  };
}
