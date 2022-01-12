import EventItem from '@/components/EventItem';
import Layout from '@/components/Layout';
import { gql } from '@apollo/client';
import client from 'apollo-client';

export default function EventsPage({ events }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query SHOW_ALL_EVENTS {
        events(sort: ["date:ASC"]) {
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

  return {
    props: { events: data.events.data },
    revalidate: 1,
  };
}
